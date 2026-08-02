import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProjectById } from "../features/project/project.Thunk"
import { Loader2, AlertCircle } from "lucide-react"

function WorkspacePage() {
  const { projectId } = useParams()
  const dispatch = useDispatch()
  const { currentProject, loading, error } = useSelector((state) => state.project)

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId))
    }
  }, [projectId, dispatch])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="flex flex-col items-center gap-3 p-8 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl shadow-2xl">
          <Loader2 className="w-8 h-8 text-white animate-spin stroke-[1.8]" />
          <p className="text-xs font-mono text-zinc-400 tracking-wide">Loading workspace model...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative font-sans">
        <div className="max-w-md w-full p-8 bg-zinc-900/40 backdrop-blur-md border border-rose-500/20 rounded-2xl text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-6 h-6 stroke-[1.8]" />
          </div>
          <h3 className="text-lg font-semibold text-white tracking-tight">Project Not Found</h3>
          <p className="text-xs text-rose-400 font-mono bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
            {typeof error === "string" ? error : error?.message || "Failed to load project"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-6 sm:p-8 font-sans">
      {currentProject ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {currentProject.projectName || currentProject.name}
              </h1>
              <p className="text-sm text-zinc-400 mt-1">{currentProject.description}</p>
            </div>
            <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400 uppercase">
              {currentProject.databaseType || "mysql"}
            </span>
          </div>
          {projectId && <span className="text-xs text-zinc-500 font-mono">ID: {projectId}</span>}
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-white">Workspace</h1>
          {projectId && <p className="text-xs text-zinc-500 font-mono mt-1">Project ID: {projectId}</p>}
        </div>
      )}
    </div>
  )
}

export default WorkspacePage