import React from 'react';

const CodeViewer = ({ code = '', language = 'sql' }) => {
  const lines = code.split('\n');

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/90 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-slate-800/60 bg-slate-900/60 px-4 py-2 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Preview ({language.toUpperCase()})
        </span>
        <span>{lines.length} lines</span>
      </div>
      <div className="max-h-[420px] overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, index) => (
              <tr key={index} className="hover:bg-slate-900/50 transition-colors">
                <td className="w-10 select-none pr-4 text-right text-slate-600 font-mono text-[11px]">
                  {index + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {line || ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeViewer;
