import { FaPaw } from "react-icons/fa";

export default function LoadingSpinner({ fullScreen = false, text = "Loading..." }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl">
              <FaPaw className="text-5xl text-pink-500 animate-pulse" />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-3 text-pink-600 font-semibold text-center">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  // Untuk loading kecil di dalam komponen
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-3 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-sm text-pink-500 text-center">{text}</p>
      </div>
    </div>
  );
}