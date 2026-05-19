import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-slide-up">
      <div className={`${types[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
}