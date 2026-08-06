import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center">
      <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
      <h3 className="text-sm font-semibold text-slate-200">Generating Schema DDL...</h3>
      <p className="text-xs text-slate-500 mt-1">Applying database syntax rules and formatting definitions.</p>
    </div>
  );
};

export default LoadingState;
