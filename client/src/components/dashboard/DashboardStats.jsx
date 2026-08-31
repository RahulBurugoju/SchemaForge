import React from "react";
import { Database, FolderKanban, Clock3 } from "lucide-react";

function DashboardStats({ projects = [] }) {
  const totalProjects = projects.length;

  const databaseTypes = new Set(
    projects.map((project) => project.databaseType)
  ).size;

  const lastUpdated =
    projects.length > 0
      ? new Date(
          Math.max(...projects.map((project) => new Date(project.updatedAt)))
        ).toLocaleDateString(undefined, { month: "short", day: "numeric" })
      : "—";

  return (
    <div className="bg-[#141416] border border-[#2C2C2E] rounded-xl p-4 mb-6">
      <div className="grid grid-cols-3 divide-x divide-[#2C2C2E]">
        <div className="px-4 first:pl-2 space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase tracking-wider block">
            Projects
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold text-[#F5F5F7]">
              {totalProjects}
            </span>
            <span className="text-[11px] text-[#6E6E73] font-mono">schemas</span>
          </div>
        </div>

        <div className="px-4 space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase tracking-wider block">
            Engines
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold text-[#F5F5F7]">
              {databaseTypes}
            </span>
            <span className="text-[11px] text-[#6E6E73] font-mono">targets</span>
          </div>
        </div>

        <div className="px-4 last:pr-2 space-y-1">
          <span className="text-[11px] font-mono text-[#6E6E73] uppercase tracking-wider block">
            Last Activity
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-semibold text-[#F5F5F7]">
              {lastUpdated}
            </span>
            <span className="text-[11px] text-[#6E6E73] font-mono">updated</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
