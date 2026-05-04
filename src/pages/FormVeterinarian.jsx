import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaStethoscope, FaIdCard, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialVeterinarians } from "../data/clinicData";

export default function FormVeterinarian() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", specialization: "", license: "", phone: "", email: "", joinDate: "", status: "Active" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const newId = `VET-${String(initialVeterinarians.length + 1).padStart(3, "0")}`;
      const newVet = { id: newId, ...formData };
      initialVeterinarians.push(newVet);
      setIsLoading(false);
      alert(`✅ Dokter ${formData.name} berhasil ditambahkan! (ID: ${newId})`);
      navigate("/veterinarians");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan data dokter..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Dokter Hewan" breadcrumb={["Dashboard", "Dokter", "Tambah"]} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="bg-gradient-primary px-6 py-4"><div className="flex items-center gap-3"><FaHeartbeat className="text-white text-2xl" /><div><h2 className="text-white font-bold text-xl">Form Tambah Dokter</h2><p className="text-white/80 text-sm">Isi data dokter hewan dengan lengkap</p></div></div></div>
          <div className="p-6 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaUserMd className="inline mr-2" />Nama Lengkap *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary" required /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaStethoscope className="inline mr-2" />Spesialisasi *</label><select name="specialization" value={formData.specialization} onChange={handleChange} className="input-primary" required><option value="">Pilih Spesialisasi</option><option>Dokter Umum</option><option>Bedah</option><option>Dokter Gigi</option><option>Dermatologi</option><option>Kardiologi</option></select></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaIdCard className="inline mr-2" />Nomor STR *</label><input type="text" name="license" value={formData.license} onChange={handleChange} className="input-primary" required /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaPhone className="inline mr-2" />Nomor Telepon</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-primary" /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaEnvelope className="inline mr-2" />Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-primary" /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaCalendarAlt className="inline mr-2" />Tanggal Bergabung</label><input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="input-primary" /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2">Status</label><select name="status" value={formData.status} onChange={handleChange} className="input-primary"><option>Active</option><option>On Leave</option></select></div>
          </div><div className="flex gap-4"><button type="submit" className="flex-1 btn-primary" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Tambah Dokter"}</button><button type="button" onClick={() => navigate("/veterinarians")} className="flex-1 btn-secondary">Batal</button></div></div>
        </form>
      </div>
    </div>
  );
}