import { FaPaw } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-soft-pink">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-6 shadow-2xl">
            <FaPaw className="text-5xl text-pink-500 animate-pulse" />
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-pink-600 font-semibold text-center">Loading Paws & Care...</p>
        </div>
      </div>
    </div>
  );
}