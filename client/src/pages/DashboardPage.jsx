import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/project/project.Thunk";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
function DashboardPage() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);
  const {projects,loading,error} = useSelector(state=>state.project)
  {console.log(user)
    console.log(projects)
  }

  useEffect(()=>{
    dispatch(fetchProjects())
  },[dispatch])
  
  const handleCreate = () => {
    console.log("Create project");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="flex flex-col items-center gap-3 p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-2xl">
          <Loader2 className="w-8 h-8 text-white animate-spin stroke-[1.8]" />
          <p className="text-xs font-mono text-zinc-400 tracking-wide">Loading workspace models...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-md w-full p-8 bg-zinc-900/40 backdrop-blur-md border border-rose-500/20 rounded-2xl text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Failed to Load Projects</h3>
          <p className="text-xs text-rose-400 font-mono bg-rose-500/5 p-3 rounded-lg border border-rose-500/10 leading-relaxed">
            {typeof error === "string" ? error : error?.message || "An error occurred while fetching projects."}
          </p>
          <button
            onClick={() => dispatch(fetchProjects())}
            className="w-full py-2.5 px-4 bg-white text-black hover:bg-zinc-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative font-sans">
      {/* Subtle top overhead radial light source */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none -z-0" />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <DashboardHeader user={user} onCreate={handleCreate} />
        <DashboardStats projects={projects} 
        />
        <ProjectGrid projects={projects}/>
      </main>
    </div>
  );
}

export default DashboardPage;
