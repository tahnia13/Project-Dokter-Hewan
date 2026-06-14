// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../lib/auth";
import { FaPaw, FaLock, FaUser, FaEnvelope } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);
    const success = await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      role: "user" // Default role untuk pendaftaran mandiri
    });
    setLoading(false);

    if (success) {
      alert("Pendaftaran berhasil! Silakan login dengan akun baru Anda.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/60 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-12 h-12 rounded-xl flex items-center justify-center mx-auto shadow-md">
            <FaPaw className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-3 uppercase tracking-tight">Buat Akun Baru</h1>
          <p className="text-xs text-slate-500 mt-1">Daftar sekarang untuk mengakses layanan Paws & Care</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text" required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="Nama Lengkap Anda"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="email" required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="nama@domain.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="password" required
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password</label>
            <input
              type="password" required
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-purple-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-2.5 bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs uppercase rounded-xl transition-all shadow-xs"
          >
            {loading ? "Mendaftarkan..." : "Daftar Akun"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Sudah punya akun?{" "}
            <button onClick={() => navigate("/login")} className="text-[#432C81] font-bold hover:underline">
              Login di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}