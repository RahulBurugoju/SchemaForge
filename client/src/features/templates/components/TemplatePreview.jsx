import React from 'react';
import { Database, Table, Key, Link2, Sparkles, FolderPlus } from 'lucide-react';

const TemplatePreview = ({ template, onUseTemplate, onClose }) => {
  if (!template) return null;

  const { name, description, databaseType, canvasData } = template;
  const nodes = canvasData?.nodes || [];
  const edges = canvasData?.edges || [];

  const totalColumns = nodes.reduce(
    (acc, node) => acc + (node.data?.columns?.length || 0),
    0
  );

  return (
    <div className="text-zinc-100 font-sans space-y-6">
      {/* Header & Meta Badges */}
      <div className="space-y-3 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase bg-zinc-900 text-indigo-400 border border-zinc-800">
            <Database className="w-3.5 h-3.5" />
            {databaseType} Engine
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            {nodes.length} Entities • {edges.length} Relations
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>{name}</span>
          </h2>
          <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Tables / Collections</span>
          <span className="text-lg font-bold text-white mt-0.5">{nodes.length}</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Total Fields</span>
          <span className="text-lg font-bold text-white mt-0.5">{totalColumns}</span>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3 flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Relationships</span>
          <span className="text-lg font-bold text-indigo-400 mt-0.5">{edges.length}</span>
        </div>
      </div>

      {/* Entity Preview Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
          <Table className="w-3.5 h-3.5 text-zinc-400" />
          <span>Prebuilt Schema Entities</span>
        </h3>

        {nodes.length === 0 ? (
          <div className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-xl text-center text-xs text-zinc-500 font-mono">
            Empty canvas. Ready to start building tables from scratch.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3 space-y-2 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center justify-between border-b border-zinc-800/60 pb-1.5">
                  <span className="font-semibold text-xs text-white font-mono flex items-center gap-1.5">
                    <Table className="w-3 h-3 text-indigo-400" />
                    {node.data?.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {node.data?.columns?.length || 0} cols
                  </span>
                </div>

                <div className="space-y-1">
                  {node.data?.columns?.map((col) => (
                    <div
                      key={col.id || col.name}
                      className="flex items-center justify-between text-[11px] font-mono text-zinc-300 py-0.5"
                    >
                      <span className="flex items-center gap-1">
                        {col.isPk && <Key className="w-3 h-3 text-purple-400 shrink-0" />}
                        {col.isFk && <Link2 className="w-3 h-3 text-sky-400 shrink-0" />}
                        <span className={col.isPk ? "font-bold text-white" : ""}>
                          {col.name}
                        </span>
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-end gap-3">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-all cursor-pointer"
          >
            Close Preview
          </button>
        )}
        {onUseTemplate && (
          <button
            type="button"
            onClick={() => onUseTemplate(template)}
            className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl text-xs flex items-center gap-2 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 stroke-[2.2]" />
            <span>Create Project from Template</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
