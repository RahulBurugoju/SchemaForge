import React from "react";
import { useNavigate } from "react-router-dom";
import { Database, ArrowLeft, Home, Sparkles, Layers } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans relative flex flex-col items-center justify-center p-4 selection:bg-indigo-600 selection:text-white overflow-hidden">
      {/* Background overhead radial ambient light */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/15 blur-[160px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[250px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none -z-0" />

      {/* Central 404 Bento Glass Container */}
      <div className="max-w-lg w-full bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl shadow-indigo-950/40 relative z-10">
        {/* Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900 text-indigo-400 border border-zinc-800">
          <Database className="w-3.5 h-3.5 text-indigo-400" />
          <span>Error 404 — Entity Missing</span>
        </div>

        {/* 404 Large Gradient Text */}
        <div className="space-y-1">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 select-none">
            404
          </h1>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Schema Entity Not Found
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-normal leading-relaxed max-w-sm mx-auto pt-1">
            The page or model canvas route you are looking for has been dropped, renamed, or does not exist in SchemaForge.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2]" />
            <span>Go to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 text-indigo-400" />
            <span>Return Home</span>
          </button>
        </div>

        {/* Footer Brand Tag */}
        <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-500">
          <Layers className="w-3.5 h-3.5 text-indigo-400" />
          <span>SchemaForge Visual Engine</span>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;