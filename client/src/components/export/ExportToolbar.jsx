import React from 'react';

const ExportToolbar = ({ onCopy, onDownload, copied = false, disabled = false }) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onCopy}
        disabled={disabled}
        className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 border cursor-pointer ${
          copied
            ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300'
            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 active:scale-[0.98]'
        }`}
      >
        {copied ? '✓ Copied to Clipboard!' : '📋 Copy to Clipboard'}
      </button>

      <button
        type="button"
        onClick={onDownload}
        disabled={disabled}
        className="py-2.5 px-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm flex items-center gap-2"
      >
        📥 Download Script
      </button>
    </div>
  );
};

export default ExportToolbar;
