import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProject } from "../../features/project/project.Thunk";
import { Sparkles, Pencil, Database, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function EditProjectModal({ project, onCloseEdit, onClose }) {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    databaseType: "mysql",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || project.name || "",
        description: project.description || "",
        databaseType: project.databaseType || "mysql",
      });
    }
  }, [project]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newError = "";
    if (!formData.projectName?.trim()) {
      newError = "Project name is required";
    }
    setError(newError);
    return !newError;
  };

  const handleCancel = () => {
    if (project) {
      setFormData({
        projectName: project.projectName || project.name || "",
        description: project.description || "",
        databaseType: project.databaseType || "mysql",
      });
    }
    setError("");
    setSuccessMsg("");
    const closeFn = onCloseEdit || onClose;
    if (closeFn) {
      closeFn();
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(
        updateProject({ projectId: project?._id, projectData: formData })
      );

      if (updateProject.fulfilled.match(resultAction)) {
        setSuccessMsg("Project updated successfully");
        setError("");
        const closeFn = onCloseEdit || onClose;
        if (closeFn) {
          closeFn();
        }
      } else if (updateProject.rejected.match(resultAction)) {
        setError(resultAction.payload || "Failed to update project");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-zinc-100 font-sans space-y-6">
      {/* Header */}
      <div className="space-y-1 pr-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Update Model Details</span>
        </div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          Edit Project
        </h2>
        <p className="text-zinc-400 text-xs leading-relaxed">
          Modify the project name, description, or target database engine.
        </p>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handelSubmit} className="space-y-4">
        {/* Project Name Field */}
        <div>
          <label htmlFor="projectName" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Project Name <span className="text-indigo-400">*</span>
          </label>
          <input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            type="text"
            placeholder="e.g. E-Commerce Core Schema"
            onChange={handelChange}
            className="w-full px-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all text-sm"
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            rows={2}
            placeholder="Short summary of entities and database models..."
            onChange={handelChange}
            className="w-full px-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all text-sm resize-none"
          />
        </div>

        {/* Database System Dropdown */}
        <div>
          <label htmlFor="databaseType" className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
            Target Database System
          </label>
          <div className="relative">
            <select
              id="databaseType"
              name="databaseType"
              value={formData.databaseType}
              onChange={handelChange}
              className="w-full px-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-zinc-600 transition-all text-sm cursor-pointer appearance-none"
            >
              <option value="mysql" className="bg-zinc-900 text-white">MySQL Relational DB</option>
              <option value="postgresql" className="bg-zinc-900 text-white">PostgreSQL Enterprise</option>
              <option value="mongodb" className="bg-zinc-900 text-white">MongoDB Document Store</option>
              <option value="sqlite" className="bg-zinc-900 text-white">SQLite Embedded</option>
              <option value="sqlserver" className="bg-zinc-900 text-white">SQL Server</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl text-xs flex items-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Pencil className="w-3.5 h-3.5 stroke-[2.2]" />
            )}
            <span>{isSubmitting ? "Updating..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectModal;
