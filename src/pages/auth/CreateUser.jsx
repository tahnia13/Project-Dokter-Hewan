import { useEffect, useMemo, useState } from "react";
import { FaPaw, FaTrash, FaUserPlus, FaSearch, FaLock, FaUserShield, FaUserMd, FaUser, FaArrowLeft, FaEnvelope, FaIdBadge, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUsers, registerUser, deleteUser } from "../../lib/auth";

const roleLabels = {
  admin: "Admin",
  vet: "Dokter",
  user: "User",
};

export default function CreateUser() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => `${u.name} ${u.email} ${u.id}`.toLowerCase().includes(q));
  }, [users, search]);

  const fetchUsersData = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }

    setSubmitting(true);
    const created = await registerUser({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      role: form.role,
    });
    setSubmitting(false);

    if (created) {
      alert(`User berhasil dibuat di Supabase Auth!`);
      setForm({ name: "", email: "", password: "", confirmPassword: "", role: "user" });
      setShowForm(false);
      fetchUsersData(); // Ambil data terbaru langsung dari tabel profiles
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus otoritas akses user ini dari database?")) return;

    const success = await deleteUser(id);
    if (success) {
      alert("User berhasil dihapus");
      fetchUsersData();
    } else {
      alert("Gagal menghapus user");
    }
  };

  const getRoleCardMeta = (role) => {
    if (role === "admin") {
      return {
        badge: "bg-purple-50 text-purple-700 border-purple-200",
        iconContainer: "bg-purple-500 text-white shadow-purple-100",
        icon: FaUserShield
      };
    }
    if (role === "vet") {
      return {
        badge: "bg-blue-50 text-blue-700 border-blue-200",
        iconContainer: "bg-blue-500 text-white shadow-blue-100",
        icon: FaUserMd
      };
    }
    return {
      badge: "bg-slate-50 text-slate-600 border-slate-200",
      iconContainer: "bg-slate-500 text-white shadow-slate-100",
      icon: FaUser
    };
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 font-inter antialiased text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Navigation Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-14 h-14 rounded-2xl flex items-center justify-center shadow-md shadow-purple-200">
              <FaPaw className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Kelola Otentikasi User (Supabase)</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Sinkronisasi akun real-time dengan database cloud <span className="text-[#432C81] font-bold">Paws & Care</span>
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs font-bold text-[#432C81] hover:text-white bg-purple-50 hover:bg-[#432C81] border border-purple-100 transition-all duration-300 py-2.5 px-4 rounded-xl shadow-3xs"
          >
            <FaArrowLeft size={10} /> Kembali ke Dashboard
          </button>
        </div>

        {/* AREA FORM ATAS */}
        {showForm && (
          <div className="bg-white border-2 border-purple-200 rounded-2xl shadow-md p-6 mb-6 relative animate-fadeIn">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <FaTimes size={14} />
            </button>

            <div className="border-b border-slate-100 pb-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Registrasi Akun Supabase Baru</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Kredensial login cloud akan langsung di-generate otomatis</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs bg-slate-50/60 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 px-3.5 outline-none transition-all"
                  placeholder="Nama lengkap dokter / staf"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full text-xs bg-slate-50/60 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 px-3.5 outline-none transition-all"
                  placeholder="contoh@pawsandcare.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Hak Akses Sistem (Role)</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full text-xs bg-slate-50/60 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 px-3.5 font-bold outline-none cursor-pointer text-slate-700"
                >
                  <option value="admin">Admin Utama</option>
                  <option value="vet">Dokter Spesialis (Veterinarian)</option>
                  <option value="user">User Umum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi (Password)</label>
                <div className="relative">
                  <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                  <input
                    type="password" required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full text-xs bg-slate-50/60 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 pl-9 pr-3.5 font-mono outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Ulangi Kata Sandi</label>
                <input
                  type="password" required
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full text-xs bg-slate-50/60 border border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-2.5 px-3.5 font-mono outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <button 
                  type="button" onClick={() => setShowForm(false)}
                  className="py-2.5 px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase rounded-xl transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit" disabled={submitting}
                  className="py-2.5 px-6 bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <FaUserPlus size={13} /> {submitting ? "Memproses..." : "Konfirmasi Buat User"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CONTAINER UTAMA DATA */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Database Pengguna Aktif</h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Data bersumber langsung dari Cloud Database profiles</p>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-center">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-xl border border-blue-100">
                {filteredUsers.length} Akun Terdaftar
              </span>
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 text-xs font-bold text-white bg-[#432C81] hover:bg-[#342264] transition-all py-2.5 px-4 rounded-xl shadow-xs"
                >
                  <FaUserPlus size={12} /> Tambah User Baru
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 focus:border-purple-400 rounded-xl py-3 pl-9 pr-3.5 text-slate-800 placeholder-slate-400 font-medium shadow-xs outline-none transition-all"
              placeholder="Cari nama karyawan, email terdaftar..."
            />
          </div>

          {loading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-xs font-bold text-slate-400 flex items-center justify-center gap-2 shadow-xs">
              <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-[#432C81] animate-spin" /> Mengunduh data dari cloud...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredUsers.map((u) => {
                const meta = getRoleCardMeta(u.role);
                const IconComponent = meta.icon;

                return (
                  <div key={u.id} className="group bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col justify-between gap-4 hover:shadow-md hover:border-purple-300 transform hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${meta.iconContainer}`}>
                        <IconComponent size={16} />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-bold text-sm text-slate-800 group-hover:text-[#432C81] transition-colors truncate">
                          {u.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold mt-1.5 border ${meta.badge}`}>
                          {roleLabels[u.role] || u.role}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-50 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-500 font-medium">
                        <FaEnvelope className="text-slate-300" size={10} />
                        <span className="truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px]">
                        <FaIdBadge className="text-slate-300" size={10} />
                        <span className="truncate">UID: {u.id}</span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="button" onClick={() => handleDelete(u.id)}
                        className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[10px] font-bold text-rose-600 bg-rose-50/50 hover:bg-rose-600 hover:text-white border border-rose-100 transition-all shadow-3xs"
                      >
                        <FaTrash size={9} /> Hapus Akses
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredUsers.length === 0 && (
                <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-white border border-slate-200/80 rounded-2xl py-12 text-center text-slate-400 font-medium">
                  🔍 Tidak ada data user yang ditemukan.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}