import React from 'react'
import Toolbar from '../components/workspace/Toolbar'
import ExplorerPanel from '../components/workspace/ExplorerPanel'
import CanvasPanel from '../components/workspace/CanvasPanel'
import InspectorPanel from '../components/workspace/InspectorPanel'
import StatusBar from '../components/workspace/StatusBar'

function WorkspaceLayout() {
  return (
    <div className="h-screen w-screen bg-black text-zinc-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Top IDE Toolbar */}
      <header className="shrink-0 z-30">
        <Toolbar />
      </header>

      {/* Main Split Layout: Explorer (Left) | Canvas (Center) | Inspector (Right) */}
      <main className="flex-1 flex overflow-hidden relative">
        <ExplorerPanel />
        <CanvasPanel />
        <InspectorPanel />
      </main>

      {/* Bottom Status Bar */}
      <footer className="shrink-0 z-30">
        <StatusBar />
      </footer>
    </div>
  )
}

export default WorkspaceLayout