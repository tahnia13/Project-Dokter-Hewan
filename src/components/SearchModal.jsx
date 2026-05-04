import { useState } from "react";
import { FaSearch, FaTimes, FaPaw, FaCalendarAlt, FaUsers } from "react-icons/fa";

export default function SearchModal({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-20">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-rose-50"><div className="flex items-center justify-between mb-2"><h2 className="text-2xl font-bold text-gradient-pink">Quick Search</h2><button onClick={onClose} className="p-2 hover:bg-pink-100 rounded-xl"><FaTimes className="text-pink-500" /></button></div><p className="text-sm text-pink-500">Cari pasien, janji temu, atau pemilik hewan</p></div>
        <div className="p-6"><div className="relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Ketik untuk mencari..." className="w-full pl-12 pr-4 py-4 bg-pink-50 rounded-xl border border-pink-200 focus:ring-2 focus:ring-pink-400 outline-none" autoFocus /></div><button className="w-full mt-6 bg-gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">Cari Sekarang</button></div>
      </div>
    </div>
  );
}