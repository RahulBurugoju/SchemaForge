import React from 'react';

const ExportFooter = ({ selectedDb, selectedFormat, lineCount = 0, characterCount = 0 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5 flex flex-col">
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Engine</span>
        <span className="font-semibold text-indigo-400 capitalize mt-0.5">{selectedDb}</span>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5 flex flex-col">
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Format</span>
        <span className="font-semibold text-slate-200 uppercase mt-0.5">{selectedFormat}</span>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5 flex flex-col">
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Lines</span>
        <span className="font-semibold text-slate-200 mt-0.5">{lineCount.toLocaleString()}</span>
      </div>

      <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-2.5 flex flex-col">
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Characters</span>
        <span className="font-semibold text-slate-200 mt-0.5">{characterCount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ExportFooter;
