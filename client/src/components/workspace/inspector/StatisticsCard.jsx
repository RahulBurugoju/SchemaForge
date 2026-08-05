import React, { memo, useMemo } from "react";
import { Columns3, Key, Link, Sparkles, BarChart3 } from "lucide-react";

function StatisticsCard({ columns = [] }) {
  const stats = useMemo(() => {
    const totalColumns = columns.length;
    const pkCount = columns.filter((c) => c.isPk || c.isPrimaryKey).length;
    const fkCount = columns.filter((c) => c.isFk || c.isForeignKey).length;
    const uqCount = columns.filter((c) => c.unique).length;

    return { totalColumns, pkCount, fkCount, uqCount };
  }, [columns]);

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-3.5 space-y-2.5">
      <div className="flex items-center gap-1.5 text-zinc-300 font-semibold text-xs tracking-tight uppercase border-b border-zinc-800/60 pb-2">
        <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
        <span>Statistics</span>
      </div>

      <div className="grid grid-cols-2 gap-2 font-mono">
        {/* Total Columns */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-zinc-400 text-[10px]">
            <Columns3 className="w-3 h-3 text-slate-400" />
            <span>Columns</span>
          </div>
          <span className="font-bold text-white text-xs">{stats.totalColumns}</span>
        </div>

        {/* Primary Keys */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-purple-300 text-[10px]">
            <Key className="w-3 h-3 text-purple-400" />
            <span>Primary Keys</span>
          </div>
          <span className="font-bold text-purple-300 text-xs">{stats.pkCount}</span>
        </div>

        {/* Foreign Keys */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sky-300 text-[10px]">
            <Link className="w-3 h-3 text-sky-400" />
            <span>Foreign Keys</span>
          </div>
          <span className="font-bold text-sky-300 text-xs">{stats.fkCount}</span>
        </div>

        {/* Unique Columns */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-300 text-[10px]">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Unique</span>
          </div>
          <span className="font-bold text-emerald-300 text-xs">{stats.uqCount}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(StatisticsCard);
