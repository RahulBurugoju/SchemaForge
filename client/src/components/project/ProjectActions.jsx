import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectDialog from "./DeleteProjectDialog";

function ProjectActions({ project }) {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handelOpen = () => {
    if (project._id) {
      navigate(`/workspace/${project._id}`);
    } else {
      navigate("/workspace");
    }
  };
  const handelEdit = () => {
    // console.log("Edit : ", project.name);
    setIsEditOpen(true)
  };

  const handelDelete = () => {
    // console.log("Delete : ", project.name);
    setIsDeleteOpen(true)
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handelOpen}
            className="px-3 py-1.5 bg-white text-black hover:bg-zinc-200 font-medium rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Open</span>
          </button>

          <button
            type="button"
            onClick={handelEdit}
            className="px-3 py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handelDelete}
          className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>

      {isEditOpen && (
        <Modal handelCLick = {setIsEditOpen}>
            <EditProjectModal project={project} onCloseEdit={()=>setIsEditOpen(false)}/>
        </Modal>
      )}

      {isDeleteOpen && (
        <Modal handelCLick={setIsDeleteOpen}>
            <DeleteProjectDialog project={project} onCloseDelete={()=>setIsDeleteOpen(false)}/>
        </Modal>
      )}
    </div>
  );
}

export default ProjectActions;
