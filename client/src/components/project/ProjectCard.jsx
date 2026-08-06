import React from 'react'
import { Database, Calendar, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ProjectActions from './ProjectActions';

function ProjectCard({ project }) {
  const navigate = useNavigate()
  if (!project) return null
;
  const name = project.projectName || project.name || 'Untitled Model'
  const databaseType = project.databaseType || 'PostgreSQL'
  const description = project.description || 'No description provided for this schema model.'
  
  const formattedCreatedAt = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  const formattedUpdatedAt = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently'

  const handelOpen = () => {
    if (project._id) {
      navigate(`/workspace/${project._id}`)
    } else {
      navigate('/workspace')
    }
  }
  return (
    <div className="group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        {/* Top bar: Engine tag badge & active indicator */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>

        {/* Project Name & Description */}
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
            {name}
          </h3>
          <p className="text-zinc-400 text-xs mt-1 line-clamp-2 font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Date metadata & Action Buttons */}
      <div className="pt-4 border-t border-zinc-800/60 space-y-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
          <Calendar className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <span>
            {formattedCreatedAt ? `Created ${formattedCreatedAt}` : `Updated ${formattedUpdatedAt}`}
          </span>
        </div>

        {/* Action Buttons Bar (Open, Edit, Delete) */}
        {/* <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handelOpen}
              className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 font-medium rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Open</span>
            </button>
            
            <button
              type="button"
              onClick={handelEdit}
              className="px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handelDelete}
            className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div> */}


        <ProjectActions project={project}/>
      </div>
    </div>
  )
}

export default ProjectCard
