import { useState } from "react";
import { FaSearch, FaTimes, FaPaw, FaCalendarAlt, FaUsers, FaHeartbeat } from "react-icons/fa";
import { initialPets } from "../data/clinicData";

export default function SearchModal({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!open) return null;

  const totalPets = initialPets.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-20">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-[#CCC3FF]/30 bg-gradient-to-r from-[#F5F3FF] to-white">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-[#432C81] font-nunito">Quick Search</h2>
              <button onClick={onClose} className="p-1 hover:bg-[#CCC3FF]/20 rounded-lg"><FaTimes className="text-gray-500 text-sm" /></button>
            </div>
            <p className="text-xs text-gray-500">Cari pasien, janji temu, atau pemilik hewan</p>
          </div>

          <div className="flex-1 p-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ketik untuk mencari..."
                className="w-full pl-9 pr-3 py-2 bg-[#F5F3FF] rounded-lg border-0 focus:ring-2 focus:ring-[#432C81] outline-none text-sm"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button className="flex-1 bg-gradient-primary text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all">Cari Sekarang</button>
              <button className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">Filter</button>
            </div>
          </div>

          {/* Clinic info panel */}
          <div className="w-full md:w-72 p-4 bg-gradient-to-b from-white to-gray-50 border-t md:border-t-0 md:border-l border-[#EEE]">
            <div className="text-center">
              <FaHeartbeat className="text-[#432C81] text-3xl mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Paws & Care Clinic</p>
              <p className="text-xs text-gray-500">Buka: Senin - Sabtu</p>
              <p className="text-xs text-gray-500">09:00 - 17:00</p>
              <div className="mt-3 flex justify-center gap-2">
                <div className="text-xs text-gray-600 flex items-center gap-2"><FaPaw /> {totalPets} pasien</div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>📞 (021) 1234-5678</p>
                <p>📍 Jl. Merdeka No.123, Jakarta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}