import React, { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  Link2,
  Save,
  Download,
  Database,
  Layers,
  Check,
  Loader2,
  Sparkles,
  LayoutGrid
} from 'lucide-react'
import Modal from '../modal/Modal.jsx';
import TemplateSelector from '../../features/templates/components/TemplateSelector.jsx';
import cloneTemplate from '../../features/templates/utils/cloneTemplate.js';
import generateIds from '../../features/templates/utils/generateIds.js';

function Toolbar({ addTable, setNodes, setEdges, onSave, autoSaveEnable, setAutoSaveEnable, onExport }) {
  const navigate = useNavigate()
  const { currentProject } = useSelector((state) => state.project)
  const projectName = currentProject?.projectName || currentProject?.name || "Inventory System"
  const databaseType = currentProject?.databaseType || "PostgreSQL"

  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

  const handleSaveClick = useCallback(async () => {
    if (!onSave || isSaving) return
    setIsSaving(true)
    setSavedSuccess(false)
    try {
      const res = await onSave()
      if (res?.success !== false) {
        setSavedSuccess(true)
        setTimeout(() => {
          setSavedSuccess(false)
        }, 3000)
      }
    } catch (err) {
      console.error("Save error:", err)
    } finally {
      setIsSaving(false)
    }
  }, [onSave, isSaving])

  const handleExportClick = useCallback(() => {
    if (onExport) {
      onExport();
      return;
    }
    if (currentProject?._id) {
      navigate(`/export/${currentProject._id}`, { state: { project: currentProject } });
    } else {
      navigate("/export");
    }
  }, [onExport, currentProject, navigate]);

  const handleSelectTemplateInWorkspace = useCallback((template) => {
    if (!template) return;
    const cloned = cloneTemplate(template);
    const processed = generateIds(cloned);
    if (processed?.canvasData) {
      setNodes?.(processed.canvasData.nodes || []);
      setEdges?.(processed.canvasData.edges || []);
    }
    setIsTemplateModalOpen(false);
  }, [setNodes, setEdges]);

  return (
    <header className="bg-zinc-950 border-b border-zinc-800/80 px-4 py-2 flex items-center justify-between gap-4 font-sans text-xs select-none">
      {/* Left: Back to Dashboard & Project Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 transition-all cursor-pointer"
          title="Return to Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Dashboard</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-zinc-900 text-indigo-400 border border-zinc-800">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-white tracking-tight max-w-[200px] truncate">
            {projectName}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
        </div>
      </div>

      {/* Right: IDE Action Toolbar Controls */}
      <div className="flex items-center gap-2">
        {/* Templates Selector Button */}
        <button
          type="button"
          onClick={() => setIsTemplateModalOpen(true)}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          title="Choose Starter Schema Template"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Templates</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Table & Relation Buttons */}
        <button
          onClick={addTable}
          type="button"
          className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Table</span>
        </button>

        <button
          type="button"
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Relation</span>
        </button>

        <div className="h-4 w-px bg-zinc-800" />

        {/* Export, Auto-Save Toggle & Save */}
        <button
          type="button"
          onClick={() => setAutoSaveEnable && setAutoSaveEnable((prev) => !prev)}
          className={`px-2.5 py-1.5 font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
            autoSaveEnable
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
          }`}
          title={autoSaveEnable ? "Click to disable Auto-Save" : "Click to enable Auto-Save"}
        >
          <span className={`w-2 h-2 rounded-full ${autoSaveEnable ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"}`} />
          <span>Auto-Save</span>
        </button>

        <button
          type="button"
          onClick={handleExportClick}
          className="bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        <button
          type="button"
          onClick={handleSaveClick}
          disabled={isSaving}
          className={`font-medium rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer ${
            savedSuccess
              ? "bg-emerald-600 hover:bg-emerald-500 text-white"
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
              <span>Saved!</span>
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
        <Modal handelCLick={() => setIsTemplateModalOpen(false)} maxWidth="max-w-4xl">
          <div className="space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white tracking-tight">Load Starter Schema Template</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsTemplateModalOpen(false);
                  navigate('/templates');
                }}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Open Gallery
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Select a starter template to populate your active canvas with prebuilt tables, data types, and relationships.
            </p>

            <TemplateSelector onSelectTemplate={handleSelectTemplateInWorkspace} />
          </div>
        </Modal>
      )}
    </header>
  )
}

export default memo(Toolbar)
