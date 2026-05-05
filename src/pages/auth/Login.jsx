import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); window.location.href = "/"; };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-5">
        <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
          <FaPaw className="text-white text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-[#432C81] font-nunito">Login ke Akun Anda</h3>
        <p className="text-xs text-gray-500 mt-0.5">Masukkan email dan password Anda</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-primary pl-9" placeholder="admin@petcare.com" required />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-primary pl-9 pr-9" placeholder="••••••••" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Link to="/forgot" className="text-[11px] text-[#432C81] hover:text-[#58315A]">Lupa Password?</Link>
      </div>
      <button type="submit" className="w-full btn-primary py-2 text-sm flex items-center justify-center gap-2">
        <FaPaw size={14} /> Masuk
      </button>
      <p className="text-center text-xs text-gray-500">
        Belum punya akun? <Link to="/register" className="text-[#432C81] font-semibold">Daftar</Link>
      </p>
    </form>
  );
}