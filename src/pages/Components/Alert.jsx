import { useState } from "react";
export default function Alert({ type = "info", message, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  const types = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };
  return (
    <div className={`${types[type]} border px-4 py-3 rounded-lg relative mb-4`}>
      <span className="block sm:inline">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
  );
}
