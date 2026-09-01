import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Database, CheckCircle2, Loader2, AlertCircle, Clock } from "lucide-react";

function StatusBar({ saveStatus, onRetry, canvasState }) {
  const { currentProject } = useSelector((state) => state.project);

  const projectName =
    currentProject?.projectName ||
    currentProject?.name ||
    "Untitled Schema";
  const databaseType = currentProject?.databaseType || "PostgreSQL";
  const tableCount =
    canvasState?.nodes?.length ??
    (currentProject?.canvasData?.nodes?.length || 0);

  const statusBadge = useMemo(() => {
    switch (saveStatus) {
      case "saving":
        return (
          <div className="flex items-center gap-1.5 text-indigo-400 font-sans font-medium">
            <Loader2 className="w-3 h-3 animate-spin shrink-0" />
            <span>Saving...</span>
          </div>
        );
      case "unsaved":
        return (
          <div className="flex items-center gap-1.5 text-amber-400 font-sans font-medium">
            <Clock className="w-3 h-3 shrink-0" />
            <span>Unsaved</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-rose-400 font-sans font-medium">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>Save error</span>
            </div>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-1.5 py-0.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[10px] rounded font-sans font-medium transition-colors cursor-pointer"
              >
                Retry
              </button>
            )}
          </div>
        );
      case "saved":
      default:
        return (
          <div className="flex items-center gap-1.5 text-emerald-400 font-sans font-medium">
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>Saved</span>
          </div>
        );
    }
  }, [saveStatus, onRetry]);

  return (
    <div className="bg-[#141416] border-t border-[#2C2C2E] px-4 py-1 flex items-center justify-between font-mono text-[11px] text-[#A1A1A6] select-none">
      {/* Left Metadata: Project, Database & Save Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[#6E6E73]">Model:</span>
          <span className="text-[#F5F5F7] font-sans font-medium truncate max-w-[160px]">
            {projectName}
          </span>
        </div>

        <div className="h-3 w-px bg-[#2C2C2E]" />

        <div className="flex items-center gap-1.5">
          <span className="text-[#6E6E73]">Engine:</span>
          <div className="flex items-center gap-1 text-[#F5F5F7] capitalize font-sans font-medium">
            <Database className="w-3 h-3 text-indigo-400 shrink-0" />
            <span>{databaseType}</span>
          </div>
        </div>

        <div className="h-3 w-px bg-[#2C2C2E]" />

        <div className="flex items-center gap-1.5">
          <span className="text-[#6E6E73]">Status:</span>
          {statusBadge}
        </div>
      </div>

      {/* Right Stats: Tables */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-[#6E6E73]">Tables:</span>
          <span className="text-[#F5F5F7] font-medium">{tableCount}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(StatusBar);
