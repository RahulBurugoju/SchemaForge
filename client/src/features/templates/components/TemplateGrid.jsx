import React from 'react';
import TemplateCard from './TemplateCard.jsx';

const TemplateGrid = ({ templates = [], selectedTemplateId, onSelect, onUse }) => {
  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplateId === template.id}
          onSelect={onSelect}
          onUse={onUse}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
