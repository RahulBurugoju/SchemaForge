import { useEffect, useState, useMemo } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardSearchBar from "../components/dashboard/DashboardSearchBar";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/project/project.Thunk";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import Modal from "../components/modal/Modal";
import CreateProjectModal from "../components/project/CreateProjectModal";

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects = [], loading, error } = useSelector(
    (state) => state.project || {}
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("All");

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedEngine("All");
  };

  // Filter projects by name, description, databaseType, and engine pill selection
  const filteredProjects = useMemo(() => {
    return (projects || []).filter((project) => {
      const name = project.projectName || project.name || "";
      const description = project.description || "";
      const dbType = project.databaseType || "";

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        name.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        dbType.toLowerCase().includes(query);

      const matchesEngine =
        selectedEngine === "All" ||
        dbType.toLowerCase() === selectedEngine.toLowerCase();

      return matchesQuery && matchesEngine;
    });
  }, [projects, searchQuery, selectedEngine]);

  if (loading && (!projects || projects.length === 0)) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] flex items-center justify-center p-4 font-sans">
        <div className="flex flex-col items-center gap-3 p-6 bg-[#141416] border border-[#2C2C2E] rounded-xl">
          <Loader2 className="w-6 h-6 text-[#A1A1A6] animate-spin stroke-[2]" />
          <p className="text-xs font-mono text-[#A1A1A6]">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error && (!projects || projects.length === 0)) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-[#F5F5F7] flex items-center justify-center p-4 font-sans">
        <div className="max-w-sm w-full p-6 bg-[#141416] border border-rose-500/20 rounded-xl text-center space-y-4">
          <div className="inline-flex p-2.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-[#F5F5F7] tracking-tight">
            Failed to Load Projects
          </h3>
          <p className="text-xs text-rose-400 font-mono bg-rose-500/5 p-2.5 rounded-md border border-rose-500/10 leading-relaxed">
            {typeof error === "string"
              ? error
              : error?.message || "An error occurred while fetching projects."}
          </p>
          <button
            onClick={() => dispatch(fetchProjects())}
            className="w-full py-2 px-3 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#0B0B0D] text-[#F5F5F7] flex overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="max-w-6xl mx-auto px-6 py-8">
          <DashboardHeader user={user} onCreate={handleCreate} />
          <DashboardStats projects={projects} />

          <DashboardSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedEngine={selectedEngine}
            setSelectedEngine={setSelectedEngine}
          />

          <ProjectGrid
            projects={filteredProjects}
            totalProjectCount={projects.length}
            onCreate={handleCreate}
            onClearFilters={handleClearFilters}
            searchQuery={searchQuery}
            selectedEngine={selectedEngine}
          />
        </main>
      </div>

      {isOpen && (
        <Modal handelCLick={setIsOpen} maxWidth="max-w-3xl">
          <CreateProjectModal onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default DashboardPage;
