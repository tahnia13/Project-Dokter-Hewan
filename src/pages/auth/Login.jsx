import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock, FaPaw, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); window.location.href = "/"; };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6"><div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"><FaPaw className="text-white text-2xl" /></div><h3 className="text-xl font-bold text-pink-800">Login ke Akun Anda</h3><p className="text-sm text-pink-500 mt-1">Masukkan email dan password Anda</p></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Email Address</label><div className="relative"><FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-primary pl-12" placeholder="dokter@petcare.com" required /></div></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Password</label><div className="relative"><FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="input-primary pl-12 pr-12" placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400">{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div></div>
      <div className="flex justify-end"><Link to="/forgot" className="text-sm text-pink-600">Lupa Password?</Link></div>
      <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2"><FaPaw /> Masuk</button>
      <p className="text-center text-sm text-pink-600">Belum punya akun? <Link to="/register" className="text-pink-700 font-semibold">Daftar</Link></p>
    </form>
  );
}