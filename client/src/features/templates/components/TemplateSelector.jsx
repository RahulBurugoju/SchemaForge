import React, { useState } from 'react';
import useTemplates from '../hooks/useTemplates.js';
import TemplateGrid from './TemplateGrid.jsx';

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const { templates, loading } = useTemplates();
  const [activeId, setActiveId] = useState(selectedTemplate?.id || 'blank');

  const handleSelect = (template) => {
    setActiveId(template.id);
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-6 text-zinc-400 text-xs font-medium">
        Loading templates...
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
          Starter Template <span className="text-indigo-400">*</span>
        </label>
        <span className="text-xs text-zinc-500 font-mono">
          {templates.length} templates available
        </span>
      </div>

      <TemplateGrid
        templates={templates}
        selectedTemplateId={selectedTemplate?.id || activeId}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default TemplateSelector;
