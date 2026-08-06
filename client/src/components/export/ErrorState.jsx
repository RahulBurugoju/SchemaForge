import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-6 bg-rose-950/20 border border-rose-800/40 rounded-2xl text-center">
      <div className="p-3 bg-rose-900/30 border border-rose-800/50 rounded-2xl text-rose-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-rose-200">Export Generation Failed</h3>
      <p className="text-xs text-rose-300/80 max-w-md mt-1 mb-6 font-mono whitespace-pre-wrap">
        {error || "An unexpected error occurred while generating the database script."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/25 active:scale-[0.98]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Generation</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
