import React from 'react';
import { Database, Layout, Sparkles, Eye, FolderPlus } from 'lucide-react';

const TemplateCard = ({ template, isSelected = false, onSelect, onUse }) => {
  if (!template) return null;

  const { name, description, databaseType, id, canvasData } = template;
  const tableCount = canvasData?.nodes?.length || 0;
  const edgeCount = canvasData?.edges?.length || 0;

  return (
    <div
      onClick={() => onSelect && onSelect(template)}
      className={`group bg-zinc-900/40 backdrop-blur-md border rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-4 ${
        isSelected
          ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-950/40'
          : 'border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 hover:-translate-y-0.5 shadow-md hover:shadow-xl'
      }`}
    >
      <div className="space-y-3">
        {/* Engine badge & status */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-mono uppercase">
            <Database className="w-3 h-3 text-indigo-400" />
            {databaseType}
          </span>
          {id === 'blank' ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 font-medium font-mono">
              Blank
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-indigo-400 font-medium">
              <Sparkles className="w-3 h-3" />
              Starter
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
            <Layout className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{name}</span>
          </h3>
          <p className="text-zinc-400 text-xs mt-1.5 font-normal leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs">
        <span className="text-zinc-500 font-mono text-[11px]">
          {tableCount} {tableCount === 1 ? 'Table' : 'Tables'} • {edgeCount} {edgeCount === 1 ? 'Rel' : 'Rels'}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(template);
            }}
            className="px-2.5 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
            title="Preview Schema"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onUse) {
                onUse(template);
              } else if (onSelect) {
                onSelect(template);
              }
            }}
            className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 font-semibold rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <FolderPlus className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Use</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
