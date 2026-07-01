import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export default function MachinesTab() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    launchDate: '',
    status: 'Upcoming',
    isHidden: false,
    isFeatured: false,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const res = await axios.get(`${API_URL}/machines`);
      setMachines(res.data);
    } catch (error) {
      toast.error('Failed to load machines');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', description: '', launchDate: '', status: 'Upcoming', isHidden: false, isFeatured: false, order: machines.length
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const openEditModal = (machine) => {
    setFormData({
      name: machine.name,
      description: machine.description || '',
      launchDate: machine.launchDate ? machine.launchDate.split('T')[0] : '',
      status: machine.status || 'Upcoming',
      isHidden: machine.isHidden || false,
      isFeatured: machine.isFeatured || false,
      order: machine.order || 0,
    });
    setImagePreview(machine.image);
    setEditingId(machine._id);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return toast.error('Name is required');

    setSaving(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (imageFile) data.append('image', imageFile);

      if (editingId) {
        await axios.put(`${API_URL}/machines/${editingId}`, data);
        toast.success('Machine updated');
      } else {
        await axios.post(`${API_URL}/machines`, data);
        toast.success('Machine added');
      }
      fetchMachines();
      resetForm();
    } catch (error) {
      toast.error('Failed to save machine');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this machine?')) return;
    try {
      await axios.delete(`${API_URL}/machines/${id}`);
      toast.success('Machine deleted');
      fetchMachines();
    } catch (error) {
      toast.error('Failed to delete machine');
    }
  };

  const moveOrder = async (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === machines.length - 1)
    ) return;

    const newMachines = [...machines];
    const temp = newMachines[index];
    newMachines[index] = newMachines[index + direction];
    newMachines[index + direction] = temp;

    // Update frontend immediately
    setMachines(newMachines);

    // Update backend order
    try {
      await Promise.all([
        axios.put(`${API_URL}/machines/${newMachines[index]._id}`, { order: index }),
        axios.put(`${API_URL}/machines/${newMachines[index + direction]._id}`, { order: index + direction })
      ]);
      toast.success('Order updated');
    } catch (error) {
      toast.error('Failed to update order');
      fetchMachines(); // revert
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading machines...</div>;

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.08]">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06] flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Upcoming Machines ({machines.length})</h3>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-950 dark:bg-gray-900 text-white dark:text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Add Machine
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-950 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4 w-20">Order</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Machine Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Visibility</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {machines.map((machine, index) => (
              <tr key={machine._id} className="hover:bg-gray-950 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-400">
                    <button onClick={() => moveOrder(index, -1)} disabled={index === 0} className="hover:text-green-500 disabled:opacity-30">
                      <ArrowUp size={16} />
                    </button>
                    <span className="text-xs font-bold text-gray-300">{index + 1}</span>
                    <button onClick={() => moveOrder(index, 1)} disabled={index === machines.length - 1} className="hover:text-green-500 disabled:opacity-30">
                      <ArrowDown size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-900/60 border border-white/[0.08] overflow-hidden flex items-center justify-center">
                    {machine.image ? (
                      <img src={machine.image} alt={machine.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400 dark:text-gray-400" size={20} />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-white">{machine.name}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-xs">{machine.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    machine.status === 'Installed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {machine.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {machine.isHidden ? (
                    <span className="text-red-500 text-xs font-medium bg-red-500/10 px-2 py-1 rounded">Hidden</span>
                  ) : (
                    <span className="text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded">Visible</span>
                  )}
                  {machine.isFeatured && (
                    <span className="ml-2 text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded">Featured</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => openEditModal(machine)} className="p-2 text-gray-400 dark:text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(machine._id)} className="p-2 text-gray-400 dark:text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {machines.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">No machines found. Click 'Add Machine' to start.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/[0.06] flex justify-between items-center sticky top-0 bg-gray-900 z-10">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Edit Machine' : 'Add New Machine'}</h3>
              <button onClick={resetForm} className="text-gray-400 dark:text-gray-400 hover:text-gray-400 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div className="flex gap-6 items-center">
                <div className="w-32 h-32 rounded-xl border-2 border-dashed border-white/10 flex-shrink-0 flex items-center justify-center bg-gray-950 overflow-hidden relative group">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-400 dark:text-gray-400" size={32} />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white dark:text-white text-xs font-medium">Upload</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Machine Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g. 5-Axis CNC Milling Center" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none" placeholder="Details about capabilities..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="Upcoming">Upcoming (Arriving Soon)</option>
                    <option value="Installed">Installed & Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Expected Launch Date</label>
                  <input type="date" value={formData.launchDate} onChange={e => setFormData({...formData, launchDate: e.target.value})} className="w-full px-4 py-2 bg-gray-950 border border-white/[0.08] rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isHidden} onChange={e => setFormData({...formData, isHidden: e.target.checked})} className="w-4 h-4 text-green-400 rounded border-white/10 focus:ring-green-500" />
                  <span className="text-sm text-gray-300">Hide from public view</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 text-green-400 rounded border-white/10 focus:ring-green-500" />
                  <span className="text-sm text-gray-300">Mark as Featured</span>
                </label>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/[0.06] gap-3">
                <button type="button" onClick={resetForm} className="px-5 py-2.5 text-gray-400 hover:bg-gray-900/60 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-gray-950 dark:bg-gray-900 text-white dark:text-white rounded-lg hover:bg-white/10 disabled:opacity-70 transition-colors font-medium">
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {saving ? 'Saving...' : 'Save Machine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
