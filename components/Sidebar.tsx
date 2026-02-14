
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col hidden md:flex sticky top-0">
      <div className="p-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">N</div>
        <span className="text-xl font-bold tracking-tight text-white">NexTrade<span className="text-blue-500">Pro</span></span>
      </div>

      <nav className="flex-1 px-4 mt-4">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all mb-1 ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-500 border-l-4 border-blue-600' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50">
          <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">Davi Silva</p>
            <p className="text-xs text-slate-500 truncate">Arrojado</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
