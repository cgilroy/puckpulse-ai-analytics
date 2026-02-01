import React from 'react';
import { BarChart3, MessageSquare } from 'lucide-react';
import { AnalyticsResult } from '../types';
import ChartRenderer from './ChartRenderer';

interface ResultCardProps {
  result: AnalyticsResult;
  onFollowUpClick: (query: string) => void;
}

const SITUATION_LABELS: Record<string, string> = {
  'all': 'Overall',
  '5on5': 'Even Strength',
  '5on4': 'Power Play',
  '4on5': 'Penalty Kill',
  'other': 'Special'
};

const ResultCard: React.FC<ResultCardProps> = ({ result, onFollowUpClick }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <BarChart3 size={16} className="text-indigo-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span>Report Generated</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full" />
              <span>{new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full shadow-inner">
          <div className={`w-1.5 h-1.5 rounded-full ${result.query.situation === 'all' ? 'bg-slate-400' : 'bg-indigo-500 shadow-[0_0_4px_rgba(99,102,241,0.5)]'}`} />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            Context: {SITUATION_LABELS[result.query.situation] || 'Special'}
          </span>
        </div>
      </div>

      <ChartRenderer result={result} />

      <div className="mt-5 p-4 bg-slate-900/30 rounded-2xl border border-slate-800/50 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
          <MessageSquare size={14} />
          <span>Scouting Lead</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(result.query.suggestedFollowUp) && result.query.suggestedFollowUp.map((followUp, fIdx) => (
            <button
              key={`${result.timestamp}-follow-${fIdx}`}
              onClick={() => onFollowUpClick(String(followUp))}
              className="px-3 py-1.5 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all text-left"
            >
              "{String(followUp)}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
