import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  Database,
  Layers,
  RefreshCw,
  Home,
} from "lucide-react";
import useTemplates from "../hooks/useTemplates.js";
import TemplateGrid from "../components/TemplateGrid.jsx";
import TemplatePreview from "../components/TemplatePreview.jsx";
import Modal from "../../../components/modal/Modal.jsx";
import CreateProjectModal from "../../../components/project/CreateProjectModal.jsx";

const DB_FILTERS = [
  { id: "all", label: "All" },
  { id: "mysql", label: "MySQL" },
  { id: "postgresql", label: "PostgreSQL" },
  { id: "mongodb", label: "MongoDB" },
];

function TemplatesPage() {
  const navigate = useNavigate();
  const { templates } = useTemplates();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDbFilter, setSelectedDbFilter] = useState("all");

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTemplateForCreate, setSelectedTemplateForCreate] =
    useState(null);

  // Filter templates based on search & DB type
  const filteredTemplates = useMemo(() => {
    return (templates || []).filter((tpl) => {
      const matchesSearch =
        tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tpl.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDb =
        selectedDbFilter === "all" ||
        tpl.databaseType?.toLowerCase() === selectedDbFilter.toLowerCase();

      return matchesSearch && matchesDb;
    });
  }, [templates, searchQuery, selectedDbFilter]);

  const handleSelectCard = (template) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplateForCreate(template);
    setPreviewTemplate(null);
    setCreateModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDbFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] font-sans pb-16">
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between border-b border-[#2C2C2E] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#141416] border border-transparent transition-colors text-xs font-medium cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#141416] border border-transparent transition-colors text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </button>
          </div>

          <p className="text-xs text-[#6E6E73] font-mono">
            {filteredTemplates.length} of {templates.length} templates
          </p>
        </div>

        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">
            Starter Templates
          </h1>
          <p className="text-[#A1A1A6] text-xs max-w-2xl leading-relaxed">
            Ready-to-use database models for E-Commerce, Blog CMS, Healthcare, Education, and Social systems.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-9 pr-4 py-2 bg-[#141416] border border-[#2C2C2E] rounded-lg text-[#F5F5F7] placeholder-[#6E6E73] focus:outline-none focus:border-[#3A3A3C] text-xs transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
            {DB_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedDbFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDbFilter === filter.id
                    ? "bg-[#F5F5F7] text-[#0B0B0D] shadow-sm font-semibold"
                    : "bg-[#141416] text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-[#2C2C2E]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <TemplateGrid
            templates={filteredTemplates}
            onSelect={handleSelectCard}
            onUse={handleUseTemplate}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-[#141416] border border-[#2C2C2E] rounded-xl text-center space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F5F7]">
              No Matching Templates
            </h3>
            <p className="text-xs text-[#A1A1A6] max-w-sm">
              We couldn't find any templates matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3 py-1.5 bg-[#1C1C1F] hover:bg-[#242428] text-[#F5F5F7] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-[#2C2C2E] mt-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {previewTemplate && (
        <Modal
          handelCLick={() => setPreviewTemplate(null)}
          maxWidth="max-w-3xl"
        >
          <TemplatePreview
            template={previewTemplate}
            onUseTemplate={handleUseTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        </Modal>
      )}

      {/* Create Project Modal */}
      {createModalOpen && (
        <Modal
          handelCLick={() => setCreateModalOpen(false)}
          maxWidth="max-w-3xl"
        >
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
