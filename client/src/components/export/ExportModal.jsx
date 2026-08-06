import React from 'react';
import useExport from '../../hooks/useExport.js';
import ExportPreview from './ExportPreview.jsx';

const ExportModal = ({ isOpen = false, onClose, canvasData, projectName = "SchemaForge_Project" }) => {
  const {
    selectedDb,
    setSelectedDb,
    selectedFormat,
    setSelectedFormat,
    generatedCode,
    isEmpty,
    error,
    retry,
    copied,
    lineCount,
    characterCount,
    copy,
    download,
  } = useExport(canvasData, "mysql");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl shadow-indigo-950/50">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Export Database Schema
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your database target and copy or download the generated DDL/schema code.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <ExportPreview
          selectedDb={selectedDb}
          onDbChange={setSelectedDb}
          selectedFormat={selectedFormat}
          onFormatChange={setSelectedFormat}
          code={generatedCode}
          isEmpty={isEmpty}
          error={error}
          onRetry={retry}
          copied={copied}
          onCopy={copy}
          onDownload={() => download(projectName)}
          lineCount={lineCount}
          characterCount={characterCount}
        />
      </div>
    </div>
  );
};

export default ExportModal;
