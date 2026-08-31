import React from "react";
import { Search, X } from "lucide-react";

const ENGINES = ["All", "PostgreSQL", "MySQL", "MongoDB", "SQLite", "SQLServer"];

function DashboardSearchBar({
  searchQuery = "",
  setSearchQuery,
  selectedEngine = "All",
  setSelectedEngine,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6E6E73]">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          placeholder="Filter schemas by name, description, or database engine..."
          className="w-full pl-9 pr-9 py-2 bg-[#141416] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#3A3A3C] text-xs transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery && setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6E6E73] hover:text-[#F5F5F7] cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Engine Filter Pills */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {ENGINES.map((engine) => {
          const isSelected =
            selectedEngine.toLowerCase() === engine.toLowerCase();
          return (
            <button
              key={engine}
              type="button"
              onClick={() => setSelectedEngine && setSelectedEngine(engine)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                isSelected
                  ? "bg-[#F5F5F7] text-[#0B0B0D] shadow-sm font-semibold"
                  : "bg-[#141416] text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-[#2C2C2E]"
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
