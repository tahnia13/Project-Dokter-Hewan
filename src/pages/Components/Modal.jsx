import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const els = contentRef.current.querySelectorAll(
      "input, textarea, select"
    );
    els.forEach((el) => {
      el.classList.add("border", "border-gray-300", "bg-white", "text-black");
      if (!el.placeholder) el.placeholder = "";
    });
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div ref={contentRef} className="bg-white text-black rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
}
