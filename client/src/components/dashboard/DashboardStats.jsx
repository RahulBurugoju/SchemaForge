import React from "react";
import { Database, FolderKanban, Clock3, Search } from "lucide-react";

function DashboardStats({ projects = [] }) {
  const totalProjects = projects.length;

  const databaseTypes = new Set(
    projects.map((project) => project.databaseType)
  ).size;

  const lastUpdated =
    projects.length > 0
      ? new Date(
          Math.max(...projects.map((project) => new Date(project.updatedAt)))
        ).toLocaleDateString()
      : "N/A";

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      unit: "schemas",
      icon: <FolderKanban className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      title: "Database Types",
      value: databaseTypes,
      unit: "engines",
      icon: <Database className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      title: "Last Activity",
      value: lastUpdated,
      unit: "synced",
      icon: <Clock3 className="w-5 h-5 stroke-[1.8]" />,
    },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">
                  {stat.title}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-semibold text-white tracking-tight">
                  {stat.value}
                </p>
                <span className="text-xs text-zinc-500 font-mono">{stat.unit}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-800/60">
              <span className="text-xs text-zinc-400">Schema Forge State</span>
              <div className="p-2.5 rounded-xl bg-zinc-800/60 text-zinc-300 border border-zinc-700/50 group-hover:border-zinc-600 group-hover:text-white transition-all duration-200">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Precision Search & Filter Bar */}
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
    </div>
  );
}

export default DashboardStats;

