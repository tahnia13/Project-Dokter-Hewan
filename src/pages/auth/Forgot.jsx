import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaPaw } from "react-icons/fa";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => { window.location.href = "/login"; }, 2000); };

  if (submitted) {
    return (<div className="text-center py-8"><div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><FaPaw className="text-white text-2xl" /></div><h3 className="text-lg font-semibold text-pink-800">Cek Email Anda!</h3><p className="text-sm text-pink-500 mt-2">Link reset password telah dikirim ke:</p><p className="text-sm font-semibold text-pink-600 mt-1">{email}</p><p className="text-xs text-pink-400 mt-4">Mengalihkan ke halaman login...</p></div>);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-6"><div className="bg-gradient-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"><FaPaw className="text-white text-2xl" /></div><h3 className="text-xl font-bold text-pink-800">Reset Password</h3><p className="text-sm text-pink-500 mt-1">Masukkan email untuk menerima link reset</p></div>
      <div><label className="block text-sm font-semibold text-pink-800 mb-2">Email</label><div className="relative"><FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-primary pl-12" placeholder="dokter@petcare.com" required /></div></div>
      <button type="submit" className="w-full btn-primary">Kirim Link Reset</button>
      <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-pink-600"><FaArrowLeft className="text-xs" /> Kembali ke Login</Link>
    </form>
  );
}