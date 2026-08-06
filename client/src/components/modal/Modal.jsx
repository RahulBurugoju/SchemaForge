import React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

function Modal({ handelCLick, children, maxWidth = "max-w-4xl" }) {
  const handleClose = (e) => {
    if (e) e.stopPropagation();
    if (handelCLick) {
      handelCLick((prev) => !prev);
    }
  };

  const modalContent = (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans selection:bg-zinc-700 selection:text-white animate-fade-in"
    >
      {/* Ambient top light source */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zinc-800/10 blur-3xl rounded-full pointer-events-none" />

      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${maxWidth} bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 flex flex-col justify-between transition-all overflow-hidden z-10`}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer z-20"
          title="Close modal"
        >
          <X className="w-4 h-4 stroke-[2]" />
        </button>

        {/* Modal Children Body */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

export default Modal