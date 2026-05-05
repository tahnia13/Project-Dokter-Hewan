import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if (formData.password !== formData.confirmPassword) { alert("Password tidak sama!"); return; } alert("Pendaftaran berhasil!"); window.location.href = "/login"; };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="text-center mb-4">
        <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
          <FaPaw className="text-white text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-[#432C81] font-nunito">Buat Akun Baru</h3>
        <p className="text-xs text-gray-500 mt-0.5">Daftar untuk mengelola dashboard klinik</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Lengkap</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-primary pl-9" placeholder="Dr. Sarah Wijaya" required />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-primary pl-9" placeholder="dokter@petcare.com" required />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Telepon</label>
        <div className="relative">
          <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-primary pl-9" placeholder="0812-3456-7890" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="input-primary pl-9 pr-9" placeholder="••••••••" required />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Konfirmasi Password</label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="input-primary pl-9" placeholder="••••••••" required />
        </div>
      </div>
      <button type="submit" className="w-full btn-primary py-2 text-sm flex items-center justify-center gap-2">
        <FaPaw size={14} /> Daftar
      </button>
      <p className="text-center text-xs text-gray-500">
        Sudah punya akun? <Link to="/login" className="text-[#432C81] font-semibold">Masuk</Link>
      </p>
    </form>
  );
}