import React from 'react'
import { useSelector } from 'react-redux'
import EmptyProjects from './EmptyProjects'
import ProjectCard from '../project/ProjectCard'

function ProjectGrid({projects}) {
  // const { projects = [] } = useSelector((state) => state.project || {})

  if (!projects || projects.length === 0) {
    return <EmptyProjects />
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Grid Section Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <span>All Projects</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono">
            {projects.length}
          </span>
        </h2>
      </div>

      {/* Bento Grid Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            key={project._id  || index}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectGrid
