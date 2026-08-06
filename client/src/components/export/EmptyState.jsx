import React from 'react';
import { Layers, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ projectId }) => {
  const navigate = useNavigate();

  const handleOpenWorkspace = () => {
    if (projectId) {
      navigate(`/workspace/${projectId}`);
    } else {
      navigate('/workspace');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 my-6 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-center">
      <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 mb-4">
        <Layers className="w-8 h-8 text-indigo-400" />
      </div>
      <h3 className="text-base font-bold text-slate-100">Nothing to Export</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">
        Your canvas currently has no tables or collections. Add tables in the visual editor to generate export scripts.
      </p>
      <button
        type="button"
        onClick={handleOpenWorkspace}
        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/25 active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        <span>Open Editor Workspace</span>
      </button>
    </div>
  );
};

export default EmptyState;
