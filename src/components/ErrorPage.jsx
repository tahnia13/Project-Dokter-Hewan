import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome, FaHeartbeat } from "react-icons/fa";

export default function ErrorPage({ kodeError, deskripsiError }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 bg-gradient-soft">
      <div className="text-center max-w-md">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-full p-6 inline-block animate-float shadow-lg">
            <FaHeartbeat className="text-5xl text-[#432C81]" />
          </div>
        </div>
        <h1 className="text-7xl font-black text-gradient-primary">{kodeError || 404}</h1>
        <h2 className="text-xl font-bold text-[#432C81] mb-2 font-nunito">Error {kodeError || 404}</h2>
        <p className="text-gray-500 mb-6 text-sm">{deskripsiError || "Halaman tidak ditemukan"}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-1.5 bg-gradient-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-md"><FaHome size={12} /> Back to Dashboard</Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 bg-[#CCC3FF]/30 text-[#432C81] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#CCC3FF]/50"><FaArrowLeft size={12} /> Go Back</button>
        </div>
      </div>
    </div>
  );
}