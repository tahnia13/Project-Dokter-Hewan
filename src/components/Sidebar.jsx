import { 
  FaHome, 
  FaPaw, 
  FaCalendarAlt, 
  FaUsers, 
  FaUserMd,
  FaSignOutAlt, 
  FaHeartbeat, 
  FaChevronLeft, 
  FaChevronRight,
  FaClinicMedical,
  FaPlus
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isCollapsed = false, onToggleCollapse }) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const menuClass = ({ isActive }) => 
    `flex cursor-pointer items-center rounded-xl p-3 space-x-3 transition-all duration-300 group ${
      isActive 
        ? "bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 shadow-sm border-l-4 border-pink-500" 
        : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
    } ${isCollapsed ? "justify-center" : ""}`;
  
  // 5 MENU UTAMA
  const menuItems = [
    { path: "/", icon: FaHome, label: "Dashboard" },
    { path: "/pets", icon: FaPaw, label: "Pasien" },
    { path: "/appointments", icon: FaCalendarAlt, label: "Janji Temu" },
    { path: "/pet-owners", icon: FaUsers, label: "Pemilik" },
    { path: "/veterinarians", icon: FaUserMd, label: "Dokter" },
  ];

  return (
    <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 h-full overflow-y-auto border-r border-pink-100 ${isCollapsed ? "w-20" : "w-72"}`}>
      
      {/* ==================== LOGO SECTION ==================== */}
      <div className={`p-6 border-b border-pink-100 ${isCollapsed ? "text-center" : ""}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${isCollapsed ? "justify-center w-full" : ""}`}>
            <div className="bg-gradient-primary w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
              <FaHeartbeat className="text-white text-xl" />
            </div>
            {!isCollapsed && (
              <div>
                <span className="font-poppins text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Paws<span className="text-pink-500">&</span>Care
                </span>
                <p className="text-[10px] text-pink-400">Klinik Hewan</p>
              </div>
            )}
          </div>
          {!isCollapsed && onToggleCollapse && (
            <button onClick={onToggleCollapse} className="text-pink-400 hover:text-pink-600 transition-colors">
              <FaChevronLeft />
            </button>
          )}
        </div>
        {isCollapsed && onToggleCollapse && (
          <button onClick={onToggleCollapse} className="mt-4 text-pink-400 hover:text-pink-600 transition-colors">
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* ==================== PROFIL SINGKAT DENGAN FOTO ==================== */}
      {!isCollapsed && (
        <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl flex items-center gap-3">
          {/* Foto Profil */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-sm opacity-60"></div>
            {!imageError ? (
              <img
                src="/img/cewekCantik.png"
                alt="Dr. Tahnia"
                className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center relative z-10">
                <span className="text-white font-bold text-sm">DT</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-pink-800">Dr. Tahnia Siti Aisah</p>
            <p className="text-[10px] text-pink-500">Dokter Hewan</p>
          </div>
        </div>
      )}

      {/* ==================== MENU UTAMA ==================== */}
      <div className="flex-1 py-6">
        <div className="px-4 mb-4">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
              MENU UTAMA
            </p>
          )}
        </div>
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={menuClass}>
                <item.icon className="text-xl flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* ==================== FOOTER ==================== */}
      <div className="p-4 border-t border-pink-100">
        {!isCollapsed ? (
          <>
            {/* Card Help & Support */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-4 text-white shadow-lg mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 rounded-full p-2">
                  <FaClinicMedical />
                </div>
                <div>
                  <p className="text-xs font-semibold">Need Help?</p>
                  <p className="text-[10px] opacity-80">24/7 Support</p>
                </div>
              </div>
              <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-2 text-xs font-semibold transition-all flex items-center justify-center gap-2">
                <FaPlus className="text-xs" /> Contact Support
              </button>
            </div>

            {/* Tombol Logout */}
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold"
            >
              <FaSignOutAlt />
              Logout
            </button>

            {/* Copyright */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-pink-400">© 2026 Paws & Care</p>
              <p className="text-[10px] text-pink-300">Klinik Hewan</p>
            </div>
          </>
        ) : (
          <>
            {/* Version Collapsed - Foto kecil saat collapsed */}
            <div className="flex justify-center mb-3">
              {!imageError ? (
                <img
                  src="/img/cewekCantik.png"
                  alt="Dr. Tahnia"
                  className="w-8 h-8 rounded-full object-cover border border-pink-200"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-[10px]">DT</span>
                </div>
              )}
            </div>
            {/* Tombol Logout */}
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center bg-pink-50 hover:bg-pink-100 text-pink-600 py-2.5 rounded-xl transition-all duration-300 mb-2"
            >
              <FaSignOutAlt />
            </button>
            <div className="text-center">
              <p className="text-[8px] text-pink-400">© 2026</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}