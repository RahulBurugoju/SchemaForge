import React from "react";
import Toolbar from "../components/workspace/Toolbar";
import ExplorerPanel from "../components/workspace/ExplorerPanel";
import CanvasPanel from "../components/workspace/canvas/CanvasPanel";
import InspectorPanel from "../components/workspace/InspectorPanel";
import StatusBar from "../components/workspace/StatusBar";
import { ReactFlowProvider } from "@xyflow/react";
import useCanvas from "../hooks/useCanvas";
import { useDispatch } from "react-redux";

function WorkspaceLayout({
  canvasState,
  handleSave,
  saveStatus,
  autoSaveEnable,
  setAutoSaveEnable,
}) {
  return (
    <div className="h-screen w-screen bg-black text-zinc-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Top IDE Toolbar */}
      <header className="shrink-0 z-30">
        <Toolbar
          addTable={canvasState.addTable}
          onSave={handleSave}
          autoSaveEnable={autoSaveEnable}
          setAutoSaveEnable={setAutoSaveEnable}
        />
      </header>

      {/* Main Split Layout: Explorer (Left) | Canvas (Center) | Inspector (Right) */}
      <main className="flex-1 flex overflow-hidden relative">
        <ExplorerPanel />
        <ReactFlowProvider>
          <CanvasPanel canvasState={canvasState} />
        </ReactFlowProvider>
        <InspectorPanel canvasState={canvasState} />
      </main>

      {/* Bottom Status Bar */}
      <footer className="shrink-0 z-30">
        <StatusBar saveStatus={saveStatus} />
      </footer>
    </div>
  );
}

export default WorkspaceLayout;
