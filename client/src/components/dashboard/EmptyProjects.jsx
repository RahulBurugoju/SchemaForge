import React from "react";
import { FolderKanban, Plus } from "lucide-react";

function EmptyProjects({ onCreate }) {
  return (
    <div className="border border-[#2C2C2E] border-dashed rounded-xl p-12 text-center my-6 flex flex-col items-center justify-center bg-[#141416]/40">
      <div className="w-10 h-10 rounded-lg bg-[#141416] border border-[#2C2C2E] flex items-center justify-center text-[#A1A1A6] mb-3">
        <FolderKanban className="w-5 h-5 stroke-[1.8]" />
      </div>

      <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
        No schemas yet
      </h3>
      <p className="text-xs text-[#A1A1A6] mt-1 max-w-sm leading-relaxed">
        Create your first project to start visually modeling tables, keys, and DDL exports.
      </p>

      {onCreate && (
        <button
          onClick={onCreate}
          className="mt-4 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-3.5 py-1.5 text-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Create Project</span>
        </button>
      )}
    </div>
  );
}

export default EmptyProjects;