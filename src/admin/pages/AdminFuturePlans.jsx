import { useState } from 'react';
import { Target, Factory, Rocket, Lightbulb } from 'lucide-react';
import FutureVisionTab from './tabs/FutureVisionTab';
import MachinesTab from './tabs/MachinesTab';
import GoalsTab from './tabs/GoalsTab';
import InnovationTab from './tabs/InnovationTab';

export default function AdminFuturePlans() {
  const [activeTab, setActiveTab] = useState('machines');

  const tabs = [
    { id: 'machines', label: 'Future Planning (Machines)', icon: Factory },
    { id: 'goals', label: 'Expansion Goals', icon: Rocket },
    { id: 'innovation', label: 'Innovation Section', icon: Lightbulb },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header & Tabs */}
      <div className="bg-gray-900 rounded-xl shadow-sm border border-white/[0.08] overflow-hidden">
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-2xl font-bold text-white">Future Plans Management</h2>
          <p className="text-gray-500 mt-1">Manage the company's future vision, upcoming machinery, goals, and R&D.</p>
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
        {activeTab === 'machines' && <MachinesTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'innovation' && <InnovationTab />}
      </div>

    </div>
  );
}

