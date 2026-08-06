import React from 'react';

const FormatSelector = ({ value, onChange, selectedDb }) => {
  const isMongo = selectedDb === 'mongodb';

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
        Export Format
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 hover:border-slate-700 text-sm shadow-inner cursor-pointer"
      >
        {isMongo ? (
          <option value="mongoose" className="bg-slate-900 text-slate-100">
            JS Mongoose Schema (.js)
          </option>
        ) : (
          <option value="sql" className="bg-slate-900 text-slate-100">
            SQL DDL Script (.sql)
          </option>
        )}
        <option value="json" className="bg-slate-900 text-slate-100">
          Raw Schema JSON (.json)
        </option>
      </select>
    </div>
  );
};

export default FormatSelector;
