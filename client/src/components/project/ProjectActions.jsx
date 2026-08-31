import { ExternalLink, Pencil, Trash2, Download } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectDialog from "./DeleteProjectDialog";

function ProjectActions({ project }) {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpen = () => {
    if (project?._id) {
      navigate(`/workspace/${project._id}`);
    } else {
      navigate("/workspace");
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleExport = () => {
    if (project?._id) {
      navigate(`/export/${project._id}`, { state: { project } });
    } else {
      navigate("/export", { state: { project } });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-1.5 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={handleOpen}
            className="px-2.5 py-1.5 bg-[#F5F5F7] text-[#0B0B0D] hover:bg-white font-medium rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="px-2.5 py-1.5 bg-[#1C1C1F] hover:bg-[#242428] text-[#A1A1A6] hover:text-[#F5F5F7] border border-[#2C2C2E] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="px-2.5 py-1.5 bg-[#1C1C1F] hover:bg-[#242428] text-[#A1A1A6] hover:text-[#F5F5F7] border border-[#2C2C2E] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Edit Project Details"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="p-1.5 text-[#6E6E73] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg text-xs transition-colors cursor-pointer"
          title="Delete Project"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {isEditOpen && (
        <Modal handelCLick={setIsEditOpen}>
          <EditProjectModal
            project={project}
            onCloseEdit={() => setIsEditOpen(false)}
          />
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal handelCLick={setIsDeleteOpen}>
          <DeleteProjectDialog
            project={project}
            onCloseDelete={() => setIsDeleteOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProjectActions;
