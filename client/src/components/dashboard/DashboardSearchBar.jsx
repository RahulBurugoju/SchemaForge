import React from "react";
import { Search, X } from "lucide-react";

const ENGINES = ["All", "PostgreSQL", "MySQL", "MongoDB", "SQLite", "SQLServer"];

function DashboardSearchBar({ searchQuery = "", setSearchQuery, selectedEngine = "All", setSelectedEngine }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl mb-6 backdrop-blur-md shadow-lg">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          <Search className="w-4 h-4 stroke-[2]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Filter schemas by name, description, or engine..."
          className="w-full pl-9 pr-9 py-2 bg-black/60 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 text-xs transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery && setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Engine Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto px-1 py-0.5">
        {ENGINES.map((engine) => {
          const isSelected = selectedEngine.toLowerCase() === engine.toLowerCase();
          return (
            <button
              key={engine}
              type="button"
              onClick={() => setSelectedEngine && setSelectedEngine(engine)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/60"
              }`}
            >
              {engine}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardSearchBar;
