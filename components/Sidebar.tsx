import React from 'react';
import { Activity, LayoutDashboard, Brain, ChevronsLeftRightEllipsis, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllModels, getModelInfo, type LLMModelKey } from '../config/llmConfig';

interface SidebarProps {
  selectedModel: LLMModelKey;
  onModelChange: (model: LLMModelKey) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedModel, onModelChange, isOpen, onToggle, onClose }) => {
  return (
    <>
      {/* Mobile overlay sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-50
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 flex flex-col gap-8 h-full overflow-y-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Activity className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white italic">PuckPulse<span className="text-indigo-400">AI</span></h1>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
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
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className={`
        hidden lg:flex bg-slate-900 border-r border-slate-800 shrink-0
        transition-all duration-200 ease-in-out
        ${isOpen ? 'w-72' : 'w-16'}
      `}>
        <div className="flex flex-col h-full w-full relative">
          <div className={`
            flex flex-col gap-6 h-full overflow-y-auto
            transition-all duration-200 ease-in-out
            ${isOpen ? 'px-4 py-4' : 'px-2 py-4'}
          `}>
            {/* Header with toggle button */}
            <div className={`flex items-center gap-3 ${isOpen ? 'justify-between' : 'justify-center'} shrink-0`}>
              <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                  <Activity className="text-white" size={24} />
                </div>
                {isOpen && (
                  <h1 className="text-xl font-bold tracking-tight text-white italic whitespace-nowrap">
                    PuckPulse<span className="text-indigo-400">AI</span>
                  </h1>
                )}
              </div>
              {isOpen && (
                <button
                  onClick={onToggle}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors shrink-0"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
            </div>

            {isOpen ? (
              <>
                <nav className="flex flex-col gap-1">
                  <button className="flex items-center gap-3 px-3 py-2.5 text-slate-100 bg-slate-800 rounded-xl transition-all hover:bg-slate-700">
                    <LayoutDashboard size={18} className="text-indigo-400 shrink-0" />
                    <span className="font-medium">Insights</span>
                  </button>
                </nav>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-800/30 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain size={14} className="text-indigo-400 shrink-0" />
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
                      <ChevronsLeftRightEllipsis size={14} className="text-indigo-400 shrink-0" />
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
              </>
            ) : (
              <>
                {/* Collapsed state - icon only */}
                <nav className="flex flex-col gap-1">
                  <button
                    className="flex items-center justify-center p-2.5 text-slate-100 bg-slate-800 rounded-xl transition-all hover:bg-slate-700"
                    title="Insights"
                  >
                    <LayoutDashboard size={20} className="text-indigo-400" />
                  </button>
                </nav>

                <div className="mt-auto space-y-2">
                  <button
                    onClick={onToggle}
                    className="w-full p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center"
                    aria-label="Expand sidebar"
                    title="Expand sidebar"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
