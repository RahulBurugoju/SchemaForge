import React from "react";
import { Sparkles, FolderPlus, LogOut, Layout, Home } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authThunk";

function DashboardHeader({ user, onCreate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-zinc-800/80 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight flex items-center gap-2">
          Welcome back, {user?.userName || "Architect"}
        </h1>
        <p className="text-zinc-400 text-sm mt-1.5 font-normal max-w-2xl leading-relaxed">
          Design visual ER diagrams, configure relational primary/foreign keys, and generate production-ready database DDL scripts.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 flex-wrap">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl px-3 py-2.5 font-medium transition-all text-sm flex items-center gap-2 cursor-pointer"
          title="Return to Home Landing Page"
        >
          <Home className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">Home</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/templates")}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl px-4 py-2.5 font-medium transition-all text-sm flex items-center gap-2 cursor-pointer"
        >
          <Layout className="w-4 h-4 text-indigo-400" />
          <span>Templates</span>
        </button>

        <button
          type="button"
          onClick={onCreate}
          className="bg-white text-black hover:bg-zinc-200 font-medium rounded-xl px-4 py-2.5 shadow-sm active:scale-[0.98] transition-all text-sm flex items-center gap-2 cursor-pointer group"
        >
          <FolderPlus className="w-4 h-4 stroke-[2.2] group-hover:scale-105 transition-transform" />
          <span>New Project</span>
        </button>

        <button
          type="button"
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
