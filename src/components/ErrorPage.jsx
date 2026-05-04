import { Link } from "react-router-dom";
import { FaArrowLeft, FaHome, FaHeartbeat } from "react-icons/fa";

export default function ErrorPage({ kodeError, deskripsiError }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gradient-soft-pink">
      <div className="text-center max-w-lg">
        <div className="relative mb-8"><div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-3xl opacity-20 animate-pulse"></div><div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-full p-8 inline-block animate-float shadow-2xl"><FaHeartbeat className="text-7xl text-pink-500" /></div></div>
        <h1 className="text-8xl font-black text-gradient-pink">{kodeError || 404}</h1>
        <h2 className="text-2xl font-bold text-pink-800 mb-3">Error {kodeError || 404}</h2>
        <p className="text-pink-600/70 mb-8">{deskripsiError || "Halaman tidak ditemukan"}</p>
        <div className="flex gap-4 justify-center"><Link to="/" className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg"><FaHome /> Back to Dashboard</Link><button onClick={() => window.history.back()} className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 px-6 py-3 rounded-xl font-bold hover:bg-pink-200"><FaArrowLeft /> Go Back</button></div>
      </div>
    </div>
  );
}