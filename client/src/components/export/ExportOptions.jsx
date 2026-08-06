import React from 'react';
import DatabaseSelector from './DatabaseSelector.jsx';
import FormatSelector from './FormatSelector.jsx';

const ExportOptions = ({ selectedDb, onDbChange, selectedFormat, onFormatChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <DatabaseSelector value={selectedDb} onChange={onDbChange} />
      <FormatSelector value={selectedFormat} onChange={onFormatChange} selectedDb={selectedDb} />
    </div>
  );
};

export default ExportOptions;
