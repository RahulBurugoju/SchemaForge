import React from "react";
import { Database, Calendar } from "lucide-react";
import ProjectActions from "./ProjectActions";

function ProjectCard({ project }) {
  if (!project) return null;

  const name = project.projectName || project.name || "Untitled Model";
  const databaseType = project.databaseType || "PostgreSQL";
  const description =
    project.description || "No description provided for this schema model.";

  const formattedUpdatedAt = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="bg-[#141416] border border-[#2C2C2E] rounded-xl p-4 hover:border-[#3A3A3C] transition-colors flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        {/* Top bar: Engine tag badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono text-[#A1A1A6] bg-[#1C1C1F] border border-[#2C2C2E]">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
          <span className="text-[11px] text-[#6E6E73] font-mono">
            {formattedUpdatedAt}
          </span>
        </div>

        {/* Project Name & Description */}
        <div>
          <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight truncate">
            {name}
          </h3>
          <p className="text-[#A1A1A6] text-xs mt-1 line-clamp-2 font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="pt-3 border-t border-[#2C2C2E]">
        <ProjectActions project={project} />
      </div>
    </div>
  );
}

export default ProjectCard;
