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
    `flex cursor-pointer items-center rounded-xl p-4 space-x-3 transition-all duration-300 group ${
      isActive 
        ? "bg-gradient-to-r from-[#CCC3FF]/40 to-[#432C81]/10 text-[#432C81] font-semibold shadow-md border-l-4 border-[#432C81]" 
        : "text-gray-600 hover:bg-[#CCC3FF]/20 hover:text-[#432C81]"
    } ${isCollapsed ? "justify-center" : ""}`;
  
  // ISI MENU TETAP SAMA (tidak berubah)
  const menuItems = [
    { path: "/", icon: FaHome, label: "Dashboard" },
    { path: "/pets", icon: FaPaw, label: "Pasien" },
    { path: "/appointments", icon: FaCalendarAlt, label: "Janji Temu" },
    { path: "/pet-owners", icon: FaUsers, label: "Pemilik" },
    { path: "/veterinarians", icon: FaUserMd, label: "Dokter" },
  ];

  return (
    <div className={`bg-white shadow-2xl flex flex-col transition-all duration-300 h-full overflow-y-auto border-r border-[#CCC3FF]/30 ${isCollapsed ? "w-20" : "w-80"}`}>
      
      {/* Logo Section - Style DocSwift, Tapi Isi Tetap */}
      <div className={`p-6 border-b border-[#CCC3FF]/30 ${isCollapsed ? "text-center" : ""}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
            {/* Icon tetap ❤️ (Paws & Care) */}
            <div className="bg-gradient-primary w-10 h-10 rounded-xl flex items-center justify-center shadow-md">
              <FaHeartbeat className="text-white text-xl" />
            </div>
            {!isCollapsed && (
              <div>
                {/* Nama tetap Paws & Care */}
                <span className="font-nunito text-xl font-bold bg-gradient-to-r from-[#432C81] to-[#58315A] bg-clip-text text-transparent">
                  Paws<span className="text-[#58315A]">&</span>Care
                </span>
                <p className="text-[10px] text-gray-400 -mt-0.5 font-inter">Klinik Hewan</p>
              </div>
            )}
          </div>
          {!isCollapsed && onToggleCollapse && (
            <button onClick={onToggleCollapse} className="text-gray-400 hover:text-[#432C81] transition-colors">
              <FaChevronLeft size={14} />
            </button>
          )}
        </div>
        {isCollapsed && onToggleCollapse && (
          <button onClick={onToggleCollapse} className="mt-4 text-gray-400 hover:text-[#432C81] transition-colors">
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Profile Ringkasan - Style DocSwift */}
      {!isCollapsed && (
        <div className="mx-4 mt-4 p-3 bg-gradient-to-r from-[#CCC3FF]/30 to-[#432C81]/5 rounded-xl flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-full blur-sm opacity-60"></div>
            {!imageError ? (
              <img
                src="/img/cewekCantik.png"
                alt="Dr. Tahnia"
                className="w-10 h-10 rounded-full object-cover border-2 border-white relative z-10"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center relative z-10">
                <span className="text-white font-bold text-sm font-nunito">DT</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-800 font-nunito">Dr. Sarah Wijaya</p>
            <p className="text-[10px] text-gray-500 font-inter">Dokter Hewan</p>
          </div>
        </div>
      )}

      {/* Menu Utama - Style DocSwift, Isi Tetap */}
      <div className="flex-1 py-6">
        <div className="px-4 mb-4">
          {!isCollapsed && (
            <p className="text-[10px] font-bold text-[#432C81] uppercase tracking-wider px-2 font-inter">
              MENU UTAMA
            </p>
          )}
        </div>
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={menuClass}>
                <item.icon className="text-xl flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-semibold font-inter tracking-wide">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer - Style DocSwift */}
      <div className="p-4 border-t border-[#CCC3FF]/30">
        {!isCollapsed ? (
          <>
            <div className="bg-gradient-primary rounded-2xl p-4 text-white shadow-md mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 rounded-full p-2">
                  <FaClinicMedical size={14} />
                </div>
                <div>
                  <p className="text-xs font-semibold font-nunito">Need Help?</p>
                  <p className="text-[10px] opacity-80 font-inter">24/7 Support</p>
                </div>
              </div>
              <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl py-2 text-xs font-semibold transition-all flex items-center justify-center gap-2 font-inter">
                <FaPlus size={12} /> Contact Support
              </button>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 bg-[#CCC3FF]/30 hover:bg-[#CCC3FF]/50 text-[#432C81] py-2.5 rounded-xl transition-all text-sm font-semibold font-inter"
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>

            <div className="mt-4 text-center">
              <p className="text-[10px] text-gray-400 font-inter">© 2026 Paws & Care</p>
              <p className="text-[10px] text-gray-400 font-inter">Klinik Hewan</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-3">
              {!imageError ? (
                <img
                  src="/img/cewekCantik.png"
                  alt="Dr. Tahnia"
                  className="w-8 h-8 rounded-full object-cover border border-[#CCC3FF]"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-[10px] font-nunito">DT</span>
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center bg-[#CCC3FF]/30 hover:bg-[#CCC3FF]/50 text-[#432C81] py-2.5 rounded-xl transition-all mb-2"
            >
              <FaSignOutAlt size={16} />
            </button>
            <div className="text-center">
              <p className="text-[8px] text-gray-400 font-inter">© 2026</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}