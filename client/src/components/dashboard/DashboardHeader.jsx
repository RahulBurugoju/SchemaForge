import React from "react";
import { Sparkles, FolderPlus, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authThunk";

function DashboardHeader({ user, onCreate }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-800/80 mb-8">
      <div>
        {/* <div className="flex items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>SchemaForge Pro Engine</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Workspace</span>
          </div>
        </div> */}
        
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-2">
          Welcome back, {user?.userName || "Architect"}
        </h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal max-w-2xl leading-relaxed">
          Design visual ER diagrams, configure relational primary/foreign keys, and generate production-ready database DDL scripts.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onCreate}
          className="bg-white text-black hover:bg-zinc-200 font-medium rounded-xl px-4 py-2.5 shadow-sm active:scale-[0.98] transition-all text-sm flex items-center gap-2 cursor-pointer group"
        >
          <FolderPlus className="w-4 h-4 stroke-[2.2] group-hover:scale-105 transition-transform" />
          <span>New Project</span>
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700/80 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;


