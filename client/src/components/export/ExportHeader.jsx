import React from 'react';
import { ArrowLeft, Layers, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExportHeader = ({ projectName }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer"
            title="Home / Landing Page"
          >
            <Home className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
        {projectName && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1 rounded-full">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Project: {projectName}
          </span>
        )}
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
          Schema Export Center
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Export your visual database models into multi-database DDL scripts, Mongoose schemas, or JSON definitions.
        </p>
      </div>
    </div>
  );
};

export default ExportHeader;
