import { FaPaw } from "react-icons/fa";

export default function LoadingSpinner({ fullScreen = false, text = "Loading..." }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white rounded-full p-5 shadow-2xl">
              <FaPaw className="text-4xl text-[#432C81] animate-pulse" />
            </div>
          </div>
          <div className="mt-3 flex flex-col items-center">
            <div className="w-8 h-8 border-3 border-[#432C81] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-[#432C81] font-semibold text-sm text-center font-nunito">{text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[150px] w-full">
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 border-3 border-[#432C81] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-1 text-xs text-[#432C81] text-center font-inter">{text}</p>
      </div>
    </div>
  );
}