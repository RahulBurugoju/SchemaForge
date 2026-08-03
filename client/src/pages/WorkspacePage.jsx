import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById } from "../features/project/project.Thunk";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

function WorkspacePage() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProject, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  // Task 7 - Loading State
  if (loading && !currentProject) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="flex flex-col items-center gap-3 p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-2xl">
          <Loader2 className="w-8 h-8 text-white animate-spin stroke-[1.8]" />
          <p className="text-sm font-medium text-zinc-300 tracking-tight">Loading Project...</p>
        </div>
      </div>
    );
  }

  // Task 8 - Error State
  if (error && !currentProject) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="max-w-md w-full p-8 bg-zinc-900/40 backdrop-blur-md border border-rose-500/20 rounded-2xl text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Project not found.</h3>
          <p className="text-xs text-rose-400 font-mono bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
            {typeof error === "string" ? error : error?.message || "Failed to load project"}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full py-2.5 px-4 bg-white text-black hover:bg-zinc-200 font-medium rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <WorkspaceLayout />;
}

export default WorkspacePage;