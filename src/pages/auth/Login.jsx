// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaPaw, FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { loginUser } from "../../lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default: user
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const user = await loginUser(email.trim(), password);
    setLoading(false);

    if (user) {
      alert(`Selamat datang kembali, ${user.name}!`);
      
      // ========== REDIRECT BERDASARKAN ROLE YANG DIPILIH ==========
      // Bukan dari database, tapi dari pilihan user di form!
      switch (role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'user':
          navigate('/member');
          break;
        case 'guest':
          navigate('/');
          break;
        default:
          navigate('/');
      }
      // ===========================================================
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/60 w-full max-w-sm">
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <FaPaw className="text-white text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-[#432C81] font-nunito uppercase tracking-tight">Login ke Akun Anda</h3>
            <p className="text-xs text-gray-500 mt-0.5">Masukkan email, password, dan pilih role Anda</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 pl-9 pr-3.5 outline-none transition-all" 
                placeholder="email@domain.com" 
                required 
              />
            </div>
          </div>

          {/* Password */}
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

          {/* ========== PILIHAN ROLE ========== */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Login Sebagai (Role)</label>
            <div className="relative">
              <FaUserShield className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 pl-9 pr-3.5 outline-none cursor-pointer font-bold text-slate-700 appearance-none"
              >
                <option value="admin">Admin</option>
                <option value="user">User / Member</option>
                <option value="guest">Guest</option>
              </select>
            </div>
          </div>
          {/* ================================== */}

          {/* Lupa Password */}
          <div className="flex justify-end">
            <Link to="/forgot" className="text-[11px] text-[#432C81] hover:underline">Lupa Password?</Link>
          </div>

          {/* Tombol Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs uppercase rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <FaPaw size={12} /> 
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>

          {/* Link Registrasi */}
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