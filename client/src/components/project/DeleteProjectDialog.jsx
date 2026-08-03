import React, { useState } from 'react'
import { deleteProject } from '../../features/project/project.Thunk'
import { useDispatch } from 'react-redux'
import { AlertTriangle, Trash2, Loader2 } from 'lucide-react'

function DeleteProjectDialog({ project, onCloseDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const dispatch = useDispatch()

  const projectName = project?.projectName || project?.name || "Untitled Model"

  const handelDelete = async () => {
    if (!project?._id) return
    setIsDeleting(true)
    setErrorMsg("")

    try {
      const resultAction = await dispatch(deleteProject(project._id))
      if (deleteProject.fulfilled.match(resultAction)) {
        if (onCloseDelete) {
          onCloseDelete()
        }
      } else if (deleteProject.rejected.match(resultAction)) {
        setErrorMsg(resultAction.payload || "Failed to delete project")
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="text-zinc-100 font-sans space-y-6">
      {/* Icon & Title */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
          <AlertTriangle className="w-6 h-6 stroke-[2]" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Delete Project
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Are you sure you want to delete <span className="text-white font-medium">"{projectName}"</span>? This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-3.5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1.5 font-mono text-xs text-zinc-400">
        <div className="flex justify-between">
          <span>Project ID:</span>
          <span className="text-zinc-200">{project?._id}</span>
        </div>
        <div className="flex justify-between">
          <span>Target Engine:</span>
          <span className="text-indigo-400 uppercase">{project?.databaseType || "relational"}</span>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-medium">
          {errorMsg}
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800/80">
        <button
          type="button"
          onClick={onCloseDelete}
          className="px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-all cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={isDeleting}
          onClick={handelDelete}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 stroke-[2]" />
          )}
          <span>{isDeleting ? "Deleting..." : "Confirm Delete"}</span>
        </button>
      </div>
    </div>
  )
}

export default DeleteProjectDialog