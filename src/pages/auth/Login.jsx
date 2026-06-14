// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";
// Gunakan import path relatif '../../' yang aman agar terhindar dari error import Vite
import { loginUser } from "../../lib/auth"; 

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Menggunakan fungsi login riil dari Supabase yang sudah kita set di auth.js
    const user = await loginUser(email.trim(), password);
    setLoading(false);

    if (user) {
      alert(`Selamat datang kembali, ${user.name}!`);
      // Menggunakan navigate() bawaan react-router-dom agar transisi halaman mulus tanpa hard-refresh browser
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/60 w-full max-w-sm">
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Bagian Header Form */}
          <div className="text-center mb-5">
            <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <FaPaw className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-[#432C81] font-nunito uppercase tracking-tight">Login ke Akun Anda</h3>
            <p className="text-xs text-gray-500 mt-0.5">Masukkan email dan password cloud Paws & Care Anda</p>
          </div>

          {/* Input Field: Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 pl-9 pr-3.5 outline-none transition-all" 
                placeholder="admin@petcare.com" 
                required 
              />
            </div>
          </div>

          {/* Input Field: Password + Toggle Eye Visibility */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 pl-9 pr-10 outline-none transition-all" 
                placeholder="••••••••" 
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          {/* Lupa Password Link */}
          <div className="flex justify-end">
            <Link to="/forgot" className="text-[11px] text-[#432C81] hover:underline">Lupa Password?</Link>
          </div>

          {/* Tombol Submit Dinamis */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <FaPaw size={12} /> 
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>

          {/* Link Registrasi Akun */}
          <p className="text-center text-xs text-gray-500 border-t border-slate-100 mt-5 pt-4">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#432C81] font-bold hover:underline">
              Daftar Mandiri Disini
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}