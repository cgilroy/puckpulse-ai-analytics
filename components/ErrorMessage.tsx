import React from 'react';
import { TrendingDown } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl text-red-400 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
      <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
        <TrendingDown size={20} />
      </div>
      <p className="font-medium text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
