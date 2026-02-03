import React from 'react';
import { Search, Zap, ArrowRight, Menu } from 'lucide-react';

interface SearchHeaderProps {
  query: string;
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMenuClick: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  query,
  isLoading,
  onQueryChange,
  onSearch,
  onKeyDown,
  onMenuClick
}) => {
  return (
    <header className="sticky top-0 z-10 p-6 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onMenuClick}
          className="lg:hidden absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="relative group lg:ml-0 ml-12">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            {isLoading ? (
              <Zap className="text-indigo-500 animate-spin" size={20} />
            ) : (
              <Search className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            )}
          </div>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-800 rounded-3xl py-5 pl-14 pr-6 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all shadow-2xl"
            placeholder="Ask PuckPulseAI"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isLoading}
          />
          <button
            onClick={onSearch}
            disabled={isLoading || !query.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 px-5 py-2.5 rounded-2xl text-sm font-bold text-white transition-all shadow-lg flex items-center gap-2"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
