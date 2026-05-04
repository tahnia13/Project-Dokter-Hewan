import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); if (formData.password !== formData.confirmPassword) { alert("Password tidak sama!"); return; } alert("Pendaftaran berhasil!"); window.location.href = "/login"; };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6"><div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"><FaPaw className="text-white text-2xl" /></div><h3 className="text-xl font-bold text-pink-800">Buat Akun Baru</h3><p className="text-sm text-pink-500 mt-1">Daftar untuk mengelola dashboard klinik</p></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Nama Lengkap</label><div className="relative"><FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="input-primary pl-12" placeholder="Dr. Sarah Wijaya" required /></div></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Email</label><div className="relative"><FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="input-primary pl-12" placeholder="dokter@petcare.com" required /></div></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Telepon</label><div className="relative"><FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-primary pl-12" placeholder="0812-3456-7890" /></div></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Password</label><div className="relative"><FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="input-primary pl-12 pr-12" placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400">{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Konfirmasi Password</label><div className="relative"><FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="input-primary pl-12" placeholder="••••••••" required /></div></div>
      <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2"><FaPaw /> Daftar</button>
      <p className="text-center text-sm text-pink-600">Sudah punya akun? <Link to="/login" className="text-pink-700 font-semibold">Masuk</Link></p>
    </form>
  );
}