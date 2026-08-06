import React from 'react';

const DATABASES = [
  { id: 'mysql', name: 'MySQL', icon: '🐬' },
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘' },
  { id: 'sqlite', name: 'SQLite', icon: '🪶' },
  { id: 'sqlserver', name: 'SQL Server (T-SQL)', icon: '🟥' },
  { id: 'mongodb', name: 'MongoDB (Mongoose)', icon: '🍃' },
];

const DatabaseSelector = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
        Target Database
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 hover:border-slate-700 text-sm shadow-inner cursor-pointer"
      >
        {DATABASES.map((db) => (
          <option key={db.id} value={db.id} className="bg-slate-900 text-slate-100 py-2">
            {db.icon} {db.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatabaseSelector;
