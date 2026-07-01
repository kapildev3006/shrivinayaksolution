import { useState } from 'react';
import AdminAbout from './AdminAbout';
import AdminTeam from './AdminTeam';
import AdminFuturePlans from './AdminFuturePlans';
import { FileText, Users, Lightbulb } from 'lucide-react';

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', label: 'Company About Content', icon: FileText },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'future', label: 'Future Planning', icon: Lightbulb },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header & Tabs */}
      <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.08] overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">About Page</h2>
            <p className="text-gray-500 mt-1">Manage your company info and team members</p>
          </div>
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-white dark:text-white bg-gray-950 dark:bg-gray-900 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors border border-white/[0.08]"
          >
            View Live Page →
          </a>
        </div>
        
        <div className="flex border-b border-white/[0.08] overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'border-green-500 text-green-400 bg-green-500/10/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-950'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="bg-transparent">
        {activeTab === 'company' && <AdminAbout />}
        {activeTab === 'team' && <AdminTeam />}
        {activeTab === 'future' && <AdminFuturePlans />}
      </div>
      
    </div>
  );
}

