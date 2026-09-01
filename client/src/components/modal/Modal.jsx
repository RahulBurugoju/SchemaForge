import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

function Modal({ handelCLick, children, maxWidth = "max-w-3xl" }) {
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (handelCLick) {
      handelCLick((prev) => !prev);
    }
  };

  const modalContent = (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm font-sans selection:bg-indigo-600 selection:text-white animate-fade-in"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidth} bg-[#141416] border border-[#2C2C2E] rounded-2xl p-6 shadow-2xl flex flex-col justify-between transition-all overflow-hidden z-10`}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#6E6E73] hover:text-[#F5F5F7] hover:bg-[#1C1C1F] border border-transparent hover:border-[#2C2C2E] transition-colors cursor-pointer z-20"
          title="Close modal"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Modal Children Body */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal;