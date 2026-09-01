import React from "react";
import { FolderPlus, Layout, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardHeader({ user, onCreate }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#2C2C2E] mb-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-[#F5F5F7] tracking-tight">
          Projects
        </h1>
        <p className="text-[#A1A1A6] text-xs mt-1 font-normal leading-relaxed">
          Manage your relational entity models, export DDL definitions, and configure schemas.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => navigate("/templates")}
          className="bg-[#141416] hover:bg-[#1C1C1F] text-[#A1A1A6] hover:text-[#F5F5F7] border border-[#2C2C2E] rounded-lg px-3 py-2 font-medium transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Layout className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-3.5 py-2 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
        >
          <FolderPlus className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>New Project</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
