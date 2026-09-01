import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../features/project/project.Thunk";
import { useNavigate } from "react-router-dom";
import { FolderPlus, Database, CheckCircle2, AlertCircle } from "lucide-react";
import TemplateSelector from "../../features/templates/components/TemplateSelector";
import createProjectFromTemplate from "../../features/templates/utils/createProjectFromTemplate";
import blankTemplate from "../../features/templates/data/blankTemplate";

function CreateProjectModal({ onClose, initialTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState(
    initialTemplate || blankTemplate
  );
  const [formData, setFormData] = useState({
    projectName: initialTemplate?.name
      ? `${initialTemplate.name} Project`
      : "",
    description: initialTemplate?.description || "",
    databaseType: initialTemplate?.databaseType || "mysql",
    isArchived: false,
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    if (template?.databaseType) {
      setFormData((prev) => ({ ...prev, databaseType: template.databaseType }));
    }
  };

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
    setFormData({
      projectName: "",
      description: "",
      databaseType: "mysql",
      isArchived: false,
    });
    setSelectedTemplate(blankTemplate);
    setError("");
    setSuccessMsg("");
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = createProjectFromTemplate(
        selectedTemplate,
        formData.projectName,
        {
          description: formData.description,
          databaseType: formData.databaseType,
        }
      );

      const resultAction = await dispatch(createProject(payload));

      if (createProject.fulfilled.match(resultAction)) {
        setSuccessMsg("New project created successfully");
        const createdProject =
          resultAction.payload?.data || resultAction.payload;
        const projectId = createdProject?._id;

        setFormData({
          projectName: "",
          description: "",
          databaseType: "mysql",
          isArchived: false,
        });
        setError("");

        if (projectId) {
          navigate(`/workspace/${projectId}`);
        } else {
          navigate("/workspace");
        }
      } else if (createProject.rejected.match(resultAction)) {
        setError(resultAction.payload || "Failed to create project");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-[#F5F5F7] font-sans space-y-5 max-h-[80vh] overflow-y-auto pr-1 w-full">
      {/* Header */}
      <div className="space-y-1 pr-6">
        <h2 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">
          New Project
        </h2>
        <p className="text-[#A1A1A6] text-xs leading-relaxed">
          Select a starter schema or start with an empty canvas to model database entities.
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
        {/* Template Selector Section */}
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleTemplateSelect}
        />

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
            placeholder="Short summary of entities, keys, and foreign key relations..."
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-[#0B0B0D] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#3A3A3C] transition-colors text-xs resize-none"
          />
        </div>

        {/* Database Engine Dropdown */}
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

        {/* Checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            id="isArchived"
            checked={formData.isArchived}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isArchived: e.target.checked }))
            }
            type="checkbox"
            className="w-3.5 h-3.5 rounded bg-[#0B0B0D] border-[#2C2C2E] text-indigo-600 focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="isArchived"
            className="text-xs text-[#A1A1A6] cursor-pointer select-none"
          >
            Mark project as archived
          </label>
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
            <FolderPlus className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>{isSubmitting ? "Creating..." : "Create Project"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProjectModal;
