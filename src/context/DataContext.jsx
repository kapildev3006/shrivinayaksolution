import { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/galleryData';
import { INITIAL_SITE_CONTENT } from '../data/siteContentData';

const DataContext = createContext();
const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [beforeAfterList, setBeforeAfterList] = useState([]);

  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [team, setTeam] = useState([]);
  const [siteContent, setSiteContent] = useState(INITIAL_SITE_CONTENT);
  const [futureVision, setFutureVision] = useState({});
  const [machines, setMachines] = useState([]);
  const [goals, setGoals] = useState([]);
  const [innovation, setInnovation] = useState({});
  const [testimonials, setTestimonials] = useState([]);
  const [features, setFeatures] = useState([]);
  const [workflow, setWorkflow] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('shri_admin_auth') === 'true';
  });

  // Fetch initial data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          servicesRes, galleryRes, contentRes, messagesRes, teamRes, visionRes, 
          machinesRes, goalsRes, innovationRes, testimonialsRes, featuresRes, 
          workflowRes, machineryRes, videosRes, industriesRes, categoriesRes
        ] = await Promise.all([
          fetch(`${API_URL}/services`),
          fetch(`${API_URL}/gallery`),
          fetch(`${API_URL}/site-content`),
          fetch(`${API_URL}/messages`),
          fetch(`${API_URL}/team`),
          fetch(`${API_URL}/future-vision`),
          fetch(`${API_URL}/machines`),
          fetch(`${API_URL}/goals`),
          fetch(`${API_URL}/innovation`),
          fetch(`${API_URL}/testimonials`),
          fetch(`${API_URL}/features`),
          fetch(`${API_URL}/workflow`),
          fetch(`${API_URL}/machinery`),
          fetch(`${API_URL}/videos`),
          fetch(`${API_URL}/industries`),
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/before-after`)
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData.map(s => ({ ...s, id: s._id })));
        }
        
        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          setProjects(galleryData.map(p => ({ ...p, id: p._id })));
        }

        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData) {
            setSiteContent(contentData);
          }
        }

        if (messagesRes.ok) {
          const messagesData = await messagesRes.json();
          setMessages(messagesData.map(m => ({ ...m, id: m._id })));
        }

        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeam(teamData.map(t => ({ ...t, id: t._id })));
        }

        if (visionRes.ok) {
          setFutureVision(await visionRes.json());
        }

        if (machinesRes.ok) {
          const machinesData = await machinesRes.json();
          setMachines(machinesData.map(m => ({ ...m, id: m._id })));
        }

        if (goalsRes.ok) {
          const goalsData = await goalsRes.json();
          setGoals(goalsData.map(g => ({ ...g, id: g._id })));
        }

        if (innovationRes.ok) {
          setInnovation(await innovationRes.json());
        }

        if (testimonialsRes.ok) {
          const testData = await testimonialsRes.json();
          setTestimonials(testData.map(t => ({ ...t, id: t._id })));
        }

        if (featuresRes.ok) {
          const featData = await featuresRes.json();
          setFeatures(featData.map(f => ({ ...f, id: f._id })));
        }

        if (workflowRes.ok) {
          const wfData = await workflowRes.json();
          setWorkflow(wfData.map(w => ({ ...w, id: w._id })));
        }

        if (machineryRes.ok) {
          const machData = await machineryRes.json();
          setMachinery(machData.map(m => ({ ...m, id: m._id })));
        }

        if (videosRes.ok) {
          const videosData = await videosRes.json();
          setVideos(videosData.map(v => ({ ...v, id: v._id })));
        }

        if (industriesRes.ok) {
          const indData = await industriesRes.json();
          setIndustries(indData.map(i => ({ ...i, id: i._id })));
        }

        if (categoriesRes.ok) {
          const catData = await categoriesRes.json();
          setCategories(catData);
        }
        
        if (beforeAfterRes) {
          const baData = await beforeAfterRes.json();
          setBeforeAfterList(baData.map(b => ({ ...b, id: b._id })));
        }
      } catch (err) {
        console.error("Error fetching data from MongoDB:", err);
        setError("Failed to connect to database. Please check if the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync auth to localStorage
  useEffect(() => {
    localStorage.setItem('shri_admin_auth', isAuthenticated);
  }, [isAuthenticated]);

  // Auth Methods
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Gallery Methods
  const addProject = async (project) => {
    try {
      const isFormData = project instanceof FormData;
      const res = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? project : JSON.stringify(project)
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects((prev) => [...prev, { ...newProject, id: newProject._id }]);
      }
    } catch (err) { console.error(err); }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      const isFormData = updatedProject instanceof FormData;
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedProject : JSON.stringify(updatedProject)
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...newProject, id: newProject._id } : p)));
      }
    } catch (err) { console.error(err); }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) { console.error(err); }
  };
  
  const addCategory = async (category) => {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: category })
      });
      if (res.ok) {
        setCategories([...categories, category]);
      }
    } catch (err) { console.error(err); }
  };
  
  const deleteCategory = async (category) => {
    try {
      const res = await fetch(`${API_URL}/categories/${category}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter(c => c !== category));
      }
    } catch (err) { console.error(err); }
  };

  // Services Methods
  const addService = async (service) => {
    try {
      const isFormData = service instanceof FormData;
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? service : JSON.stringify(service)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices((prev) => [...prev, { ...newService, id: newService._id }]);
      }
    } catch (err) { console.error(err); }
  };

  const updateService = async (id, updatedService) => {
    try {
      const isFormData = updatedService instanceof FormData;
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedService : JSON.stringify(updatedService)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? { ...newService, id: newService._id } : s)));
      }
    } catch (err) { console.error(err); }
  };

  const deleteService = async (id) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) { console.error(err); }
  };
  
  // Site Content Methods
  const updateSiteContent = async (section, newContent) => {
    const updatedState = {
      ...siteContent,
      [section]: {
        ...siteContent[section],
        ...newContent
      }
    };
    
    // Optimistic update
    setSiteContent(updatedState);

    try {
      await fetch(`${API_URL}/site-content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedState)
      });
    } catch (err) { console.error(err); }
  };

  // Messages Methods (Admin Inbox)
  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // Machines Methods (Future Planning)
  const addMachine = async (machine) => {
    try {
      const isFormData = machine instanceof FormData;
      const res = await fetch(`${API_URL}/machines`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? machine : JSON.stringify(machine)
      });
      if (res.ok) {
        const newItem = await res.json();
        setMachines((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateMachine = async (id, updated) => {
    try {
      const isFormData = updated instanceof FormData;
      const res = await fetch(`${API_URL}/machines/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updated : JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setMachines((prev) => prev.map((m) => (m.id === id ? { ...newItem, id: newItem._id } : m)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteMachine = async (id) => {
    try {
      const res = await fetch(`${API_URL}/machines/${id}`, { method: 'DELETE' });
      if (res.ok) setMachines((prev) => prev.filter((m) => m.id !== id));
    } catch (err) { console.error(err); }
  };

  // Team Methods
  const addTeamMember = async (member) => {
    const isFormData = member instanceof FormData;
    const res = await fetch(`${API_URL}/team`, {
      method: 'POST',
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? member : JSON.stringify(member)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Server error ${res.status}`);
    }
    setTeam((prev) => [...prev, { ...data, id: data._id }]);
    return data;
  };

  const updateTeamMember = async (id, updatedMember) => {
    const isFormData = updatedMember instanceof FormData;
    const res = await fetch(`${API_URL}/team/${id}`, {
      method: 'PUT',
      headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
      body: isFormData ? updatedMember : JSON.stringify(updatedMember)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Server error ${res.status}`);
    }
    setTeam((prev) => prev.map((t) => (t.id === id ? { ...data, id: data._id } : t)));
    return data;
  };

  const deleteTeamMember = async (id) => {
    try {
      const res = await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTeam((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // Testimonials Methods
  const addTestimonial = async (item) => {
    try {
      const isFormData = item instanceof FormData;
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? item : JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setTestimonials((prev) => [ { ...newItem, id: newItem._id }, ...prev]);
      }
    } catch (err) { console.error(err); }
  };
  const updateTestimonial = async (id, updated) => {
    try {
      const isFormData = updated instanceof FormData;
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updated : JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...newItem, id: newItem._id } : t)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteTestimonial = async (id) => {
    try {
      const res = await fetch(`${API_URL}/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) { console.error(err); }
  };

  // Features Methods
  const addFeature = async (item) => {
    try {
      const res = await fetch(`${API_URL}/features`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setFeatures((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateFeature = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/features/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setFeatures((prev) => prev.map((f) => (f.id === id ? { ...newItem, id: newItem._id } : f)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteFeature = async (id) => {
    try {
      const res = await fetch(`${API_URL}/features/${id}`, { method: 'DELETE' });
      if (res.ok) setFeatures((prev) => prev.filter((f) => f.id !== id));
    } catch (err) { console.error(err); }
  };

  // Workflow Methods
  const addWorkflow = async (item) => {
    try {
      const res = await fetch(`${API_URL}/workflow`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setWorkflow((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateWorkflow = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/workflow/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setWorkflow((prev) => prev.map((w) => (w.id === id ? { ...newItem, id: newItem._id } : w)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteWorkflow = async (id) => {
    try {
      const res = await fetch(`${API_URL}/workflow/${id}`, { method: 'DELETE' });
      if (res.ok) setWorkflow((prev) => prev.filter((w) => w.id !== id));
    } catch (err) { console.error(err); }
  };

  // Machinery Methods
  const addMachinery = async (item) => {
    try {
      const isFormData = item instanceof FormData;
      const res = await fetch(`${API_URL}/machinery`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? item : JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setMachinery((prev) => [ { ...newItem, id: newItem._id }, ...prev]);
      }
    } catch (err) { console.error(err); }
  };
  const updateMachinery = async (id, updated) => {
    try {
      const isFormData = updated instanceof FormData;
      const res = await fetch(`${API_URL}/machinery/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updated : JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setMachinery((prev) => prev.map((m) => (m.id === id ? { ...newItem, id: newItem._id } : m)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteMachinery = async (id) => {
    try {
      const res = await fetch(`${API_URL}/machinery/${id}`, { method: 'DELETE' });
      if (res.ok) setMachinery((prev) => prev.filter((m) => m.id !== id));
    } catch (err) { console.error(err); }
  };

  // Video Methods
  const addVideo = async (item) => {
    try {
      const isFormData = item instanceof FormData;
      const res = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? item : JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setVideos((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateVideo = async (id, updated) => {
    try {
      const isFormData = updated instanceof FormData;
      const res = await fetch(`${API_URL}/videos/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updated : JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setVideos((prev) => prev.map((v) => (v.id === id ? { ...newItem, id: newItem._id } : v)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteVideo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/videos/${id}`, { method: 'DELETE' });
      if (res.ok) setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) { console.error(err); }
  };

  // Industry Methods
  const addIndustry = async (item) => {
    try {
      const res = await fetch(`${API_URL}/industries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setIndustries((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateIndustry = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/industries/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setIndustries((prev) => prev.map((i) => (i.id === id ? { ...newItem, id: newItem._id } : i)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteIndustry = async (id) => {
    try {
      const res = await fetch(`${API_URL}/industries/${id}`, { method: 'DELETE' });
      if (res.ok) setIndustries((prev) => prev.filter((i) => i.id !== id));
    } catch (err) { console.error(err); }
  };

  // Before/After Methods
  const addBeforeAfter = async (item) => {
    try {
      const res = await fetch(`${API_URL}/before-after`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setBeforeAfterList((prev) => [...prev, { ...newItem, id: newItem._id }]);
      }
    } catch (err) { console.error(err); }
  };
  const updateBeforeAfter = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/before-after/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated)
      });
      if (res.ok) {
        const newItem = await res.json();
        setBeforeAfterList((prev) => prev.map((i) => (i.id === id ? { ...newItem, id: newItem._id } : i)));
      }
    } catch (err) { console.error(err); }
  };
  const deleteBeforeAfter = async (id) => {
    try {
      const res = await fetch(`${API_URL}/before-after/${id}`, { method: 'DELETE' });
      if (res.ok) setBeforeAfterList((prev) => prev.filter((i) => i.id !== id));
    } catch (err) { console.error(err); }
  };

  const value = {
    categories,
    projects,
    services,
    siteContent,
    messages,
    team,
    futureVision,
    machines,
    goals,
    innovation,
    testimonials,
    features,
    workflow,
    machinery,
    videos,
    industries,
    beforeAfterList,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    addProject,
    updateProject,
    deleteProject,
    addCategory,
    deleteCategory,
    addService,
    updateService,
    deleteService,
    updateSiteContent,
    deleteMessage,
    addMachine,
    updateMachine,
    deleteMachine,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addFeature,
    updateFeature,
    deleteFeature,
    addWorkflow,
    updateWorkflow,
    deleteWorkflow,
    addMachinery,
    updateMachinery,
    deleteMachinery,
    addVideo,
    updateVideo,
    deleteVideo,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    addBeforeAfter,
    updateBeforeAfter,
    deleteBeforeAfter
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
