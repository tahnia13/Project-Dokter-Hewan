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
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-sm border-b border-pink-100">
        <div className="flex justify-between items-center px-4 md:px-6 py-3">
          {/* Menu Button Mobile */}
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl bg-pink-100 text-pink-600 mr-3">
            <FaBars />
          </button>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <input 
              className="border border-pink-200 bg-pink-50/50 w-full rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-pink-400 text-sm placeholder:text-pink-300" 
              type="text" 
              placeholder="Cari pasien, janji temu..." 
              onFocus={() => setSearchOpen(true)} 
              readOnly 
            />
            <FaSearch 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 cursor-pointer" 
              onClick={() => setSearchOpen(true)} 
            />
            <div className="absolute right-3 top-1/2">
              <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-pink-500 bg-pink-100 rounded-md">⌘K</kbd>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl bg-pink-100 text-pink-600">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600">
                <FaBell />
              </div>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 rounded-full ring-2 ring-white">
                12
              </span>
            </div>

            {/* Settings */}
            <div className="hidden sm:block p-2.5 rounded-xl bg-purple-100 text-purple-600">
              <SlSettings />
            </div>

            <div className="h-8 w-px bg-pink-200 hidden sm:block" />

            {/* Profile Section dengan FOTO */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-xs text-pink-400">Welcome back,</p>
                <p className="text-sm font-bold text-pink-800">Dr. Tahnia Siti Aisah</p>
              </div>
              
              {/* Foto Profil */}
              <div className="relative group">
                {/* Gradient ring effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"></div>
                
                {!imageError ? (
                  <img
                    src="/img/cewekCantik.png"
                    alt="Dr. Tahnia"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white relative z-10 cursor-pointer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  /* Fallback jika gambar tidak ditemukan */
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center relative z-10 cursor-pointer">
                    <span className="text-white font-bold text-sm">DT</span>
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