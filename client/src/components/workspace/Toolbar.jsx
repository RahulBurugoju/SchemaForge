import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Save,
  Download,
  Database,
  Layers,
  Check,
  Loader2,
  LayoutGrid,
} from "lucide-react";
import Modal from "../modal/Modal.jsx";
import TemplateSelector from "../../features/templates/components/TemplateSelector.jsx";
import cloneTemplate from "../../features/templates/utils/cloneTemplate.js";
import generateIds from "../../features/templates/utils/generateIds.js";

function Toolbar({
  addTable,
  setNodes,
  setEdges,
  onSave,
  autoSaveEnable,
  setAutoSaveEnable,
  onExport,
}) {
  const navigate = useNavigate();
  const { currentProject } = useSelector((state) => state.project);
  const projectName =
    currentProject?.projectName ||
    currentProject?.name ||
    "Untitled Schema";
  const databaseType = currentProject?.databaseType || "PostgreSQL";

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  const handleSaveClick = useCallback(async () => {
    if (!onSave || isSaving) return;
    setIsSaving(true);
    setSavedSuccess(false);
    try {
      const res = await onSave();
      if (res?.success !== false) {
        setSavedSuccess(true);
        setTimeout(() => {
          setSavedSuccess(false);
        }, 2500);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  }, [onSave, isSaving]);

  const handleExportClick = useCallback(() => {
    if (onExport) {
      onExport();
      return;
    }
    if (currentProject?._id) {
      navigate(`/export/${currentProject._id}`, {
        state: { project: currentProject },
      });
    } else {
      navigate("/export");
    }
  }, [onExport, currentProject, navigate]);

  const handleSelectTemplateInWorkspace = useCallback(
    (template) => {
      if (!template) return;
      const cloned = cloneTemplate(template);
      const processed = generateIds(cloned);
      if (processed?.canvasData) {
        setNodes?.(processed.canvasData.nodes || []);
        setEdges?.(processed.canvasData.edges || []);
      }
      setIsTemplateModalOpen(false);
    },
    [setNodes, setEdges]
  );

  return (
    <header className="bg-[#141416] border-b border-[#2C2C2E] px-4 py-2 flex items-center justify-between gap-4 font-sans text-xs select-none">
      {/* Left: Back & Project Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-transparent transition-colors cursor-pointer"
          title="Return to Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Projects</span>
        </button>

        <div className="h-4 w-px bg-[#2C2C2E]" />

        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate("/")}
            className="w-5 h-5 rounded bg-[#1C1C1F] border border-[#2C2C2E] flex items-center justify-center text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
            title="Go to Home"
          >
            <Layers className="w-3 h-3" />
          </div>
          <span className="font-medium text-[#F5F5F7] tracking-tight max-w-[200px] truncate">
            {projectName}
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#0B0B0D] text-[#A1A1A6] border border-[#2C2C2E]">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
        </div>
      </div>

      {/* Right: Workspace Action Controls */}
      <div className="flex items-center gap-2">
        {/* Templates Button */}
        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="bg-[#1C1C1F] hover:bg-[#242428] text-[#A1A1A6] hover:text-[#F5F5F7] border border-[#2C2C2E] rounded-lg px-2.5 py-1.5 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Choose Starter Schema Template"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>

        <div className="h-4 w-px bg-[#2C2C2E]" />

        {/* Add Table */}
        <button
          onClick={addTable}
          type="button"
          className="bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Table</span>
        </button>

        <div className="h-4 w-px bg-[#2C2C2E]" />

        {/* Auto-Save Toggle */}
        <button
          type="button"
          onClick={() =>
            setAutoSaveEnable && setAutoSaveEnable((prev) => !prev)
          }
          className={`px-2 py-1.5 font-mono text-[11px] rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
            autoSaveEnable
              ? "bg-[#1C1C1F] border-[#2C2C2E] text-emerald-400"
              : "bg-[#141416] border-transparent text-[#6E6E73] hover:text-[#A1A1A6]"
          }`}
          title={
            autoSaveEnable
              ? "Auto-Save is active"
              : "Auto-Save is disabled"
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              autoSaveEnable ? "bg-emerald-400" : "bg-[#6E6E73]"
            }`}
          />
          <span>Auto-Save</span>
        </button>

        {/* Export */}
        <button
          type="button"
          onClick={handleExportClick}
          className="bg-[#1C1C1F] hover:bg-[#242428] text-[#A1A1A6] hover:text-[#F5F5F7] border border-[#2C2C2E] rounded-lg px-2.5 py-1.5 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        {/* Save */}
        <button
          type="button"
          onClick={handleSaveClick}
          disabled={isSaving}
          className={`font-medium rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer ${
            savedSuccess
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Saved</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>
      </div>

      {/* Workspace Template Selector Modal */}
      {isTemplateModalOpen && (
        <Modal
          handelCLick={() => setIsTemplateModalOpen(false)}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#2C2C2E] pb-3">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                  Load Starter Schema Template
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsTemplateModalOpen(false);
                  navigate("/templates");
                }}
                className="px-2.5 py-1 bg-[#1C1C1F] hover:bg-[#242428] text-[#A1A1A6] text-xs font-medium rounded-lg border border-[#2C2C2E] transition-colors cursor-pointer"
              >
                Gallery
              </button>
            </div>

            <p className="text-xs text-[#A1A1A6]">
              Select a starter template to populate your active canvas with prebuilt tables and relations.
            </p>

            <TemplateSelector
              onSelectTemplate={handleSelectTemplateInWorkspace}
            />
          </div>
        </Modal>
      )}
    </header>
  );
}

export default memo(Toolbar);
