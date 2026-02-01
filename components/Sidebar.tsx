import React from 'react';
import { Activity, LayoutDashboard, Brain, ChevronsLeftRightEllipsis, ExternalLink } from 'lucide-react';
import { getAllModels, getModelInfo, type LLMModelKey } from '../config/llmConfig';

interface SidebarProps {
  selectedModel: LLMModelKey;
  onModelChange: (model: LLMModelKey) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedModel, onModelChange }) => {
  return (
    <aside className="w-full lg:w-72 bg-slate-900 border-b lg:border-r border-slate-800 p-6 flex flex-col gap-8 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Activity className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white italic">PuckPulse<span className="text-indigo-400">AI</span></h1>
      </div>

      <nav className="flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100 bg-slate-800 rounded-xl transition-all">
          <LayoutDashboard size={18} className="text-indigo-400" />
          <span className="font-medium">Insights</span>
        </button>
      </nav>

      <div className="space-y-3">
        <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={14} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">AI Model</span>
          </div>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value as LLMModelKey)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
          >
            {getAllModels().map((model) => (
              <option key={model.key} value={model.key}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500 mt-2">
            {getModelInfo(selectedModel).description}
          </p>
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="p-4 bg-indigo-950/20 rounded-2xl border border-indigo-500/20">
          <div className="flex items-center gap-2 mb-3">
            <ChevronsLeftRightEllipsis size={14} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Data Sync</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Last updated</span>
              <span className="text-indigo-200">January 31, 2026</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Data Source</span>
              <a href="https://moneypuck.com/data.htm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-indigo-200 hover:text-indigo-300 transition-colors">MoneyPuck <ExternalLink size={14} className="text-indigo-400"/></a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
