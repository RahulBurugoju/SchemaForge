import React from 'react';
import EmptyProjects from './EmptyProjects';
import ProjectCard from '../project/ProjectCard';
import { Search, RefreshCw } from 'lucide-react';

function ProjectGrid({ projects = [], totalProjectCount = 0, onCreate, onClearFilters, searchQuery = "", selectedEngine = "All" }) {
  if (totalProjectCount === 0) {
    return <EmptyProjects onCreate={onCreate} />;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-zinc-900/20 backdrop-blur-md border border-zinc-800/80 rounded-3xl p-12 text-center my-8 flex flex-col items-center justify-center space-y-3">
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400">
          <Search className="w-6 h-6 stroke-[1.8]" />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-tight">No Matching Projects Found</h3>
        <p className="text-zinc-400 text-xs max-w-sm font-normal leading-relaxed">
          No database models matched {searchQuery ? `"${searchQuery}"` : "the selected criteria"} under {selectedEngine === "All" ? "all engines" : selectedEngine}.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Grid Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <span>Projects</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono">
            {projects.length} {projects.length === totalProjectCount ? "" : `/ ${totalProjectCount}`}
          </span>
        </h2>
      </div>

      {/* Bento Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            key={project._id || index}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectGrid;
