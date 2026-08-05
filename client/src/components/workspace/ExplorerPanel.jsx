import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { FolderKanban, Search, Table, Database, Plus } from "lucide-react";

function ExplorerPanel() {
  const { currentProject } = useSelector((state) => state.project);
  const [searchQuery, setSearchQuery] = useState("");

  const projectName = currentProject?.projectName || currentProject?.name || "Inventory System";
  const databaseType = currentProject?.databaseType || "PostgreSQL";

  return (
    <aside className="bg-zinc-950/90 border-r border-zinc-800/80 w-64 flex flex-col h-full font-sans text-xs select-none">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderKanban className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-white tracking-tight uppercase text-xs">
            Explorer
          </span>
        </div>
      </div>

      {/* Project & Database Metadata */}
      <div className="p-3.5 space-y-2.5 bg-zinc-900/30">
        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
            Project
          </span>
          <p className="font-medium text-white tracking-tight text-xs truncate">
            {projectName}
          </p>
        </div>

        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
            Database
          </span>
          <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
            <Database className="w-3.5 h-3.5 shrink-0" />
            <span className="capitalize">{databaseType}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-zinc-800/80" />

      {/* Tables Section Header */}
      <div className="p-3.5 flex items-center justify-between">
        <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">
          Tables
        </span>
      </div>

      {/* Search Input for Tables */}
      <div className="px-3.5 pb-3">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tables..."
            className="w-full bg-black/60 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 text-xs"
          />
        </div>
      </div>

      {/* Tables Content Area */}
      <div className="flex-1 px-3.5 overflow-y-auto space-y-4">
        {/* Empty State */}
        <div className="py-6 px-3 border border-dashed border-zinc-800/80 rounded-xl text-center space-y-3 bg-zinc-900/20">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center text-zinc-500">
            <Table className="w-4 h-4" />
          </div>
          <p className="text-zinc-400 text-xs font-mono">(No tables yet)</p>
          
          <button
            type="button"
            className="w-full py-2 px-3 bg-white text-black hover:bg-zinc-200 font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Table</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default memo(ExplorerPanel);

