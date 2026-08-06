import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Sparkles, Filter, Database, Layers, RefreshCw, Home } from 'lucide-react';
import useTemplates from '../hooks/useTemplates.js';
import TemplateGrid from '../components/TemplateGrid.jsx';
import TemplatePreview from '../components/TemplatePreview.jsx';
import Modal from '../../../components/modal/Modal.jsx';
import CreateProjectModal from '../../../components/project/CreateProjectModal.jsx';

const DB_FILTERS = [
  { id: 'all', label: 'All Databases' },
  { id: 'mysql', label: 'MySQL' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mongodb', label: 'MongoDB' },
];

function TemplatesPage() {
  const navigate = useNavigate();
  const { templates } = useTemplates();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDbFilter, setSelectedDbFilter] = useState('all');

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTemplateForCreate, setSelectedTemplateForCreate] = useState(null);

  // Filter templates based on search & DB type
  const filteredTemplates = useMemo(() => {
    return (templates || []).filter((tpl) => {
      const matchesSearch =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDb =
        selectedDbFilter === 'all' ||
        tpl.databaseType?.toLowerCase() === selectedDbFilter.toLowerCase();

      return matchesSearch && matchesDb;
    });
  }, [templates, searchQuery, selectedDbFilter]);

  // Aggregate stats across templates
  const totalTables = useMemo(() => {
    return (templates || []).reduce(
      (acc, tpl) => acc + (tpl.canvasData?.nodes?.length || 0),
      0
    );
  }, [templates]);

  const handleSelectCard = (template) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplateForCreate(template);
    setPreviewTemplate(null);
    setCreateModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDbFilter('all');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans relative selection:bg-zinc-700 selection:text-white pb-16">
      {/* Background ambient light */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none -z-0" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 transition-all cursor-pointer text-xs font-medium"
              title="Home / Landing Page"
            >
              <Home className="w-4 h-4 text-indigo-400" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800/80 transition-all cursor-pointer text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-zinc-900 text-indigo-400 border border-zinc-800 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Template Gallery
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-mono">
            Showing {filteredTemplates.length} of {templates.length} templates
          </p>
        </div>

        {/* Page Title & Quick Stats Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Database Schema Templates
            </h1>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              Accelerate database modeling with ready-to-use industry schemas for E-Commerce, Blog, Healthcare, Education, and Social Networks.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3 shrink-0 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2 px-2 border-r border-zinc-800">
              <Layers className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-[10px] uppercase text-zinc-500 font-semibold">Templates</div>
                <div className="text-sm font-bold text-white">{templates.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <div>
                <div className="text-[10px] uppercase text-zinc-500 font-semibold">Prebuilt Tables</div>
                <div className="text-sm font-bold text-white">{totalTables}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-3 shadow-lg">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by keyword..."
              className="w-full pl-9 pr-4 py-2 bg-black/60 border border-zinc-800/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 text-xs"
            />
          </div>

          {/* Database Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-zinc-500 mr-1 shrink-0" />
            {DB_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedDbFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedDbFilter === filter.id
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid or Empty Filter State */}
        {filteredTemplates.length > 0 ? (
          <TemplateGrid
            templates={filteredTemplates}
            onSelect={handleSelectCard}
            onUse={handleUseTemplate}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 my-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-center space-y-3">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-500">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">No Matching Templates</h3>
            <p className="text-xs text-zinc-400 max-w-sm">
              We couldn't find any templates matching "{searchQuery}" under the selected filter.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer mt-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Search & Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewTemplate && (
        <Modal handelCLick={() => setPreviewTemplate(null)} maxWidth="max-w-3xl">
          <TemplatePreview
            template={previewTemplate}
            onUseTemplate={handleUseTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        </Modal>
      )}

      {/* Create Project Modal Pre-selected with Template */}
      {createModalOpen && (
        <Modal handelCLick={() => setCreateModalOpen(false)} maxWidth="max-w-4xl">
          <CreateProjectModal
            onClose={() => setCreateModalOpen(false)}
            initialTemplate={selectedTemplateForCreate}
          />
        </Modal>
      )}
    </div>
  );
}

export default TemplatesPage;
