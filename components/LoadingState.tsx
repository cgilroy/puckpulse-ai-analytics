import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800" />
        <div className="h-4 w-40 bg-slate-800 rounded" />
      </div>
      <div className="h-[420px] bg-slate-900 rounded-3xl border border-slate-800" />
    </div>
  );
};

export default LoadingState;
