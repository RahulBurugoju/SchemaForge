import React, { useState } from "react";
import { deleteProject } from "../../features/project/project.Thunk";
import { useDispatch } from "react-redux";
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

function DeleteProjectDialog({ project, onCloseDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const projectName =
    project?.projectName || project?.name || "Untitled Model";

  const handleDelete = async () => {
    if (!project?._id) return;
    setIsDeleting(true);
    setErrorMsg("");

    try {
      const resultAction = await dispatch(deleteProject(project._id));
      if (deleteProject.fulfilled.match(resultAction)) {
        if (onCloseDelete) {
          onCloseDelete();
        }
      } else if (deleteProject.rejected.match(resultAction)) {
        setErrorMsg(resultAction.payload || "Failed to delete project");
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="text-[#F5F5F7] font-sans space-y-5">
      {/* Icon & Title */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-[#F5F5F7] tracking-tight">
            Delete Project
          </h2>
          <p className="text-[#A1A1A6] text-xs leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="text-[#F5F5F7] font-medium">"{projectName}"</span>?
            This will permanently remove the schema canvas and all entities.
          </p>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-3 bg-[#0B0B0D] border border-[#2C2C2E] rounded-lg space-y-1 font-mono text-xs text-[#A1A1A6]">
        <div className="flex justify-between">
          <span className="text-[#6E6E73]">Project ID:</span>
          <span className="text-[#F5F5F7]">{project?._id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#6E6E73]">Target Engine:</span>
          <span className="text-indigo-400 uppercase">
            {project?.databaseType || "relational"}
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-[#2C2C2E]">
        <button
          type="button"
          onClick={onCloseDelete}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-transparent transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={handleDelete}
          className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
          <span>{isDeleting ? "Deleting..." : "Delete Project"}</span>
        </button>
      </div>
    </div>
  );
}

export default DeleteProjectDialog;