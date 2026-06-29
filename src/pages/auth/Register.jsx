// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../lib/auth";
import { 
  FaPaw, 
  FaLock, 
  FaUser, 
  FaEnvelope, 
  FaUserMd, 
  FaUserPlus,
  FaShieldAlt,
  FaCheckCircle
} from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    role: "user" // default: user
  });
  const [loading, setLoading] = useState(false);
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role // admin, user, atau guest
      });

      if (result) {
        const roleName = form.role === "admin" ? "Admin" : 
                         form.role === "user" ? "User / Member" : "Guest";
        
        alert(`✅ Pendaftaran berhasil sebagai ${roleName}! Silakan login dengan akun Anda.`);
        
        // ========== REDIRECT KE LOGIN ==========
        // BUKAN LANGSUNG KE PAGE, TAPI KE LOGIN
        navigate("/login");
        // ======================================
      }
    } catch (error) {
      setError(error.message || "Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menentukan role label dan icon
  const getRoleInfo = (role) => {
    const roles = {
      user: { 
        label: "User / Member", 
        icon: FaUser, 
        desc: "Akses layanan klinik dan booking janji",
        color: "#432C81"
      },
      admin: { 
        label: "Admin", 
        icon: FaShieldAlt, 
        desc: "Akses penuh manajemen klinik",
        color: "#F43F5E"
      },
      guest: { 
        label: "Guest", 
        icon: FaUserPlus, 
        desc: "Akses terbatas ke landing page",
        color: "#94A3B8"
      }
    };
    return roles[role] || roles.user;
  };

  const roleInfo = getRoleInfo(form.role);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/60 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-12 h-12 rounded-xl flex items-center justify-center mx-auto shadow-md">
            <FaPaw className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-3 uppercase tracking-tight">Buat Akun Baru</h1>
          <p className="text-xs text-slate-500 mt-1">Daftar sekarang untuk mengakses layanan Paws & Care</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-600 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* ========== NAMA LENGKAP ========== */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text" 
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="Nama Lengkap Anda"
              />
            </div>
          </div>

          {/* ========== EMAIL ========== */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="email" 
                required
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="nama@domain.com"
              />
            </div>
          </div>

          {/* ========== PASSWORD ========== */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="password" 
                required
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-3.5 outline-none focus:border-purple-400 transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>
          </div>

          {/* ========== KONFIRMASI PASSWORD ========== */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Konfirmasi Password</label>
            <input
              type="password" 
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-purple-400 transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* ========== ROLE SELECTION ========== */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Role / Jenis Akun</label>
            
            {/* Tombol dropdown */}
            <button
              type="button"
              onClick={() => setShowRoleOptions(!showRoleOptions)}
              className="w-full flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 outline-none focus:border-purple-400 transition-all"
            >
              <div className="flex items-center gap-2">
                <roleInfo.icon style={{ color: roleInfo.color }} />
                <span className="font-medium">{roleInfo.label}</span>
                <span className="text-[10px] text-slate-400 ml-2">({roleInfo.desc})</span>
              </div>
              <span className="text-slate-400">{showRoleOptions ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown options */}
            {showRoleOptions && (
              <div className="mt-2 space-y-2 border border-slate-200 rounded-xl p-2 bg-white shadow-lg">
                {[
                  { role: "user", label: "User / Member", icon: FaUser, desc: "Akses layanan klinik dan booking janji", color: "#432C81" },
                  { role: "admin", label: "Admin", icon: FaShieldAlt, desc: "Akses penuh manajemen klinik", color: "#F43F5E" },
                  { role: "guest", label: "Guest", icon: FaUserPlus, desc: "Akses terbatas ke landing page", color: "#94A3B8" },
                ].map((option) => (
                  <button
                    key={option.role}
                    type="button"
                    onClick={() => {
                      setForm({...form, role: option.role});
                      setShowRoleOptions(false);
                    }}
                    className={`w-full flex items-center gap-3 text-left text-xs p-2.5 rounded-xl transition-all ${
                      form.role === option.role 
                        ? "bg-purple-50 border border-purple-200" 
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" 
                      style={{ background: `${option.color}15` }}
                    >
                      <option.icon style={{ color: option.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-700">{option.label}</div>
                      <div className="text-[10px] text-slate-400">{option.desc}</div>
                    </div>
                    {form.role === option.role && (
                      <FaCheckCircle className="text-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ========== INFO ROLE YANG DIPILIH ========== */}
          {form.role && (
            <div 
              className="flex items-center gap-2 text-[10px] px-3 py-2 rounded-lg"
              style={{ 
                background: `${roleInfo.color}10`,
                border: `1px solid ${roleInfo.color}20`,
                color: roleInfo.color
              }}
            >
              <roleInfo.icon className="text-xs" />
              <span className="font-medium">Akun akan didaftarkan sebagai: {roleInfo.label}</span>
            </div>
          )}

          {/* ========== SUBMIT BUTTON ========== */}
          <button
            type="submit" 
            disabled={loading}
            className="w-full py-2.5 bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs uppercase rounded-xl transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Mendaftarkan..." : "Daftar Akun"}
          </button>
        </form>

        {/* ========== LINK LOGIN ========== */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            Sudah punya akun?{" "}
            <button 
              onClick={() => navigate("/login")} 
              className="text-[#432C81] font-bold hover:underline"
            >
              Login di sini
            </button>
          </p>
        </div>

        {/* ========== INFO ROLE ========== */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-[10px] text-slate-400 text-center">
            💡 <span className="font-semibold">Admin</span> → Dashboard &nbsp;|&nbsp; 
            <span className="font-semibold"> User</span> → Member Page &nbsp;|&nbsp; 
            <span className="font-semibold"> Guest</span> → Landing Page
          </p>
        </div>

      </div>
    </div>
  );
}