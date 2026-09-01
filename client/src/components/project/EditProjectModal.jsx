import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "../../features/project/project.Thunk";
import { Pencil, Database, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || project.name || "",
        description: project.description || "",
        databaseType: project.databaseType || "mysql",
      });
    }
  }, [project]);

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
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
    <div className="text-[#F5F5F7] font-sans space-y-5">
      {/* Header */}
      <div className="space-y-1 pr-6">
        <h2 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">
          Edit Project
        </h2>
        <p className="text-[#A1A1A6] text-xs leading-relaxed">
          Update project metadata or target database system.
        </p>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name Field */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1.5"
          >
            Project Name <span className="text-indigo-400">*</span>
          </label>
          <input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            type="text"
            placeholder="e.g. E-Commerce Core Schema"
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-[#0B0B0D] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#3A3A3C] transition-colors text-xs"
          />
        </div>

        {/* Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1.5"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            rows={2}
            placeholder="Short summary of entities and database models..."
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-[#0B0B0D] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#3A3A3C] transition-colors text-xs resize-none"
          />
        </div>

        {/* Database System Dropdown */}
        <div>
          <label
            htmlFor="databaseType"
            className="block text-[11px] font-mono font-medium text-[#A1A1A6] uppercase tracking-wider mb-1.5"
          >
            Target Database System
          </label>
          <div className="relative">
            <select
              id="databaseType"
              name="databaseType"
              value={formData.databaseType}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-[#0B0B0D] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] focus:outline-none focus:border-[#3A3A3C] transition-colors text-xs cursor-pointer appearance-none"
            >
              <option value="mysql" className="bg-[#141416] text-[#F5F5F7]">
                MySQL Relational DB
              </option>
              <option value="postgresql" className="bg-[#141416] text-[#F5F5F7]">
                PostgreSQL Enterprise
              </option>
              <option value="mongodb" className="bg-[#141416] text-[#F5F5F7]">
                MongoDB Document Store
              </option>
              <option value="sqlite" className="bg-[#141416] text-[#F5F5F7]">
                SQLite Embedded
              </option>
              <option value="sqlserver" className="bg-[#141416] text-[#F5F5F7]">
                SQL Server
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#6E6E73]">
              <Database className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-[#2C2C2E]">
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-transparent transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1.5 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg text-xs flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
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
