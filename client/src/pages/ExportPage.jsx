import React, { useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useExport from "../hooks/useExport.js";
import ExportHeader from "../components/export/ExportHeader.jsx";
import ExportPreview from "../components/export/ExportPreview.jsx";
import restoreCanvas from "../utils/canvas/restoreCanvas.js";
import { fetchProjectById } from "../features/project/project.Thunk.js";

function ExportPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { projects, currentProject } = useSelector(
    (state) => state.project || {}
  );

  // Fetch project by ID if navigated directly to /export/:projectId
  useEffect(() => {
    if (projectId && (!currentProject || currentProject._id !== projectId)) {
      dispatch(fetchProjectById(projectId));
    }
  }, [projectId, currentProject, dispatch]);

  // Determine active project & canvas data
  const targetProject = useMemo(() => {
    if (location.state?.project) return location.state.project;
    if (projectId) {
      if (currentProject?._id === projectId) return currentProject;
      return (
        (projects || []).find((p) => p._id === projectId) || currentProject
      );
    }
    return currentProject;
  }, [location.state, projectId, currentProject, projects]);

  const activeCanvasData = useMemo(() => {
    if (location.state?.canvasData) return location.state.canvasData;
    if (targetProject) return restoreCanvas(targetProject);
    return { nodes: [], edges: [] };
  }, [location.state, targetProject]);

  const activeProjectName =
    targetProject?.projectName ||
    targetProject?.name ||
    "SchemaForge_Project";
  const initialDb = targetProject?.databaseType?.toLowerCase() || "mysql";

  const {
    selectedDb,
    setSelectedDb,
    selectedFormat,
    setSelectedFormat,
    generatedCode,
    isEmpty,
    error,
    retry,
    copied,
    lineCount,
    characterCount,
    copy,
    download,
  } = useExport(activeCanvasData, initialDb);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] p-6 md:p-10 flex flex-col items-center font-sans">
      <div className="w-full max-w-4xl space-y-6">
        <ExportHeader projectName={targetProject ? activeProjectName : null} />

        <div className="bg-[#141416] border border-[#2C2C2E] rounded-xl p-6 shadow-xl">
          <ExportPreview
            selectedDb={selectedDb}
            onDbChange={setSelectedDb}
            selectedFormat={selectedFormat}
            onFormatChange={setSelectedFormat}
            code={generatedCode}
            isEmpty={isEmpty}
            error={error}
            onRetry={retry}
            copied={copied}
            onCopy={copy}
            onDownload={() => download(activeProjectName)}
            lineCount={lineCount}
            characterCount={characterCount}
            projectId={targetProject?._id}
          />
        </div>
      </div>
    </div>
  );
}

export default ExportPage;