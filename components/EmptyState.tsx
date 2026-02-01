import React from 'react';
import { Flame, Activity, Target } from 'lucide-react';

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const SAMPLE_PROMPTS = [
  "Who's leading the attack on the power play?",
  "Best defensive players on the penalty kill",
  "Top scoring threats at even strength",
  "Who is creating the most scoring chances?",
  "Show me the most physical players this season"
];

const EmptyState: React.FC<EmptyStateProps> = ({ onPromptClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="w-16 h-16 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center text-slate-700">
          <Flame size={28} />
        </div>
        <div className="w-16 h-16 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center text-slate-700">
          <Activity size={28} />
        </div>
        <div className="w-16 h-16 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center text-slate-700">
          <Target size={28} />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">What do you want to know?</h2>
      <div className="flex flex-wrap gap-2 mt-5 justify-center">
        {SAMPLE_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onPromptClick(p)}
            className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-800 transition-all"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
