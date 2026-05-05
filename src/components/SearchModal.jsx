import { useState } from "react";
import { FaSearch, FaTimes, FaPaw, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function SearchModal({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-20">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-[#CCC3FF]/30 bg-gradient-to-r from-[#F5F3FF] to-white">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold text-[#432C81] font-nunito">Quick Search</h2>
            <button onClick={onClose} className="p-1 hover:bg-[#CCC3FF]/20 rounded-lg"><FaTimes className="text-gray-500 text-sm" /></button>
          </div>
          <p className="text-xs text-gray-500">Cari pasien, janji temu, atau pemilik hewan</p>
        </div>
        <div className="p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Ketik untuk mencari..." className="w-full pl-9 pr-3 py-2 bg-[#F5F3FF] rounded-lg border-0 focus:ring-2 focus:ring-[#432C81] outline-none text-sm" autoFocus />
          </div>
          <button className="w-full mt-4 bg-gradient-primary text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all">Cari Sekarang</button>
        </div>
      </div>
    </div>
  );
}