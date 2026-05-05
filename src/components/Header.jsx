import { useState } from "react";
import { FaBell, FaSearch, FaMoon, FaSun, FaBars } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";
import SearchModal from "./SearchModal";

export default function Header({ onMenuClick }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-sm border-b border-[#CCC3FF]/30">
        <div className="flex justify-between items-center px-4 md:px-6 py-2.5">
          <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg bg-[#CCC3FF]/30 text-[#432C81] mr-2">
            <FaBars size={16} />
          </button>

          <div className="relative w-full max-w-md">
            <input 
              className="border border-[#CCC3FF]/50 bg-white/50 w-full rounded-lg py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-[#432C81] text-sm placeholder:text-gray-400 font-inter" 
              type="text" 
              placeholder="Cari pasien, janji temu..." 
              onFocus={() => setSearchOpen(true)} 
              readOnly 
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm cursor-pointer" />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-[#432C81] bg-[#CCC3FF]/30 rounded font-inter">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-1.5 rounded-lg bg-[#CCC3FF]/30 text-[#432C81]">
              {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>

            <div className="relative">
              <div className="p-1.5 rounded-lg bg-gradient-to-r from-[#CCC3FF]/30 to-[#432C81]/10 text-[#432C81]">
                <FaBell size={14} />
              </div>
              <span className="absolute -top-1 -right-1 bg-[#FF8989] text-white text-[9px] font-bold px-1 rounded-full ring-2 ring-white font-nunito">
                12
              </span>
            </div>

            <div className="hidden sm:block p-1.5 rounded-lg bg-[#CCC3FF]/30 text-[#432C81]">
              <SlSettings size={14} />
            </div>

            <div className="h-5 w-px bg-[#CCC3FF]/50 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-gray-400 font-inter">Welcome back,</p>
                <p className="text-xs font-bold text-[#432C81] font-nunito">Dr. Tahnia</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-full blur-sm opacity-60"></div>
                {!imageError ? (
                  <img
                    src="/img/cewekCantik.png"
                    alt="Dr. Tahnia"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white relative z-10 cursor-pointer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center relative z-10 cursor-pointer">
                    <span className="text-white font-bold text-[10px] font-nunito">DT</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}