import { FaPaw } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-soft">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-full blur-xl animate-pulse"></div>
          <div className="relative bg-white rounded-full p-5 shadow-2xl">
            <FaPaw className="text-4xl text-[#432C81] animate-pulse" />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <div className="w-10 h-10 border-3 border-[#432C81] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-[#432C81] font-semibold text-sm text-center font-nunito">Loading Paws & Care...</p>
        </div>
      </div>
    </div>
  );
}