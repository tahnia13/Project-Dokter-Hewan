import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaPaw } from "react-icons/fa";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => { window.location.href = "/login"; }, 2000); };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
          <FaPaw className="text-white text-2xl" />
        </div>
        <h3 className="text-base font-semibold text-[#432C81] font-nunito">Cek Email Anda!</h3>
        <p className="text-xs text-gray-500 mt-1">Link reset password telah dikirim ke:</p>
        <p className="text-xs font-semibold text-[#432C81] mt-0.5">{email}</p>
        <p className="text-[10px] text-gray-400 mt-3">Mengalihkan ke halaman login...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <div className="bg-gradient-primary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
          <FaPaw className="text-white text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-[#432C81] font-nunito">Reset Password</h3>
        <p className="text-xs text-gray-500 mt-0.5">Masukkan email untuk menerima link reset</p>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-primary pl-9" placeholder="dokter@petcare.com" required />
        </div>
      </div>
      <button type="submit" className="w-full btn-primary py-2 text-sm">Kirim Link Reset</button>
      <Link to="/login" className="flex items-center justify-center gap-2 text-xs text-[#432C81] hover:text-[#58315A]">
        <FaArrowLeft size={12} /> Kembali ke Login
      </Link>
    </form>
  );
}