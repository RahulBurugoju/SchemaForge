import React from 'react';
import ExportOptions from './ExportOptions.jsx';
import CodeViewer from './CodeViewer.jsx';
import ExportToolbar from './ExportToolbar.jsx';
import ExportFooter from './ExportFooter.jsx';
import EmptyState from './EmptyState.jsx';
import ErrorState from './ErrorState.jsx';

const ExportPreview = ({
  selectedDb,
  onDbChange,
  selectedFormat,
  onFormatChange,
  code,
  isEmpty,
  error,
  onRetry,
  copied,
  onCopy,
  onDownload,
  lineCount,
  characterCount,
  projectId,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <ExportOptions
        selectedDb={selectedDb}
        onDbChange={onDbChange}
        selectedFormat={selectedFormat}
        onFormatChange={onFormatChange}
      />

      {isEmpty ? (
        <EmptyState projectId={projectId} />
      ) : error ? (
        <ErrorState error={error} onRetry={onRetry} />
      ) : (
        <>
          <CodeViewer code={code} language={selectedFormat} />
          <ExportToolbar onCopy={onCopy} onDownload={onDownload} copied={copied} disabled={isEmpty || Boolean(error)} />
          <ExportFooter
            selectedDb={selectedDb}
            selectedFormat={selectedFormat}
            lineCount={lineCount}
            characterCount={characterCount}
          />
        </>
      )}
    </div>
  );
};

export default ExportPreview;
