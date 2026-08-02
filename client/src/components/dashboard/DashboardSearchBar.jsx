import React from "react";
import { Search } from "lucide-react";

function DashboardSearchBar() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-1.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
          <Search className="w-4 h-4 stroke-[2]" />
        </div>
        <input
          type="text"
          placeholder="Filter schemas by name, description, or engine..."
          className="w-full pl-9 pr-4 py-2 bg-black/60 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all duration-150 text-sm"
        />
      </div>

      {/* Engine Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto px-1 py-0.5">
        {["All", "PostgreSQL", "MySQL", "MongoDB", "SQLite"].map((engine, idx) => (
          <button
            key={engine}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
              idx === 0
                ? "bg-white text-black shadow-sm font-semibold"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/60"
            }`}
          >
            {engine}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardSearchBar;
