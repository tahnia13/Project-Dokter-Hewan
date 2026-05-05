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
      alert(`✅ Dokter ${formData.name} berhasil ditambahkan!`);
      navigate("/veterinarians");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan data dokter..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Tambah Dokter Hewan" breadcrumb={["Dashboard", "Dokter", "Tambah"]} />
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden">
          <div className="bg-gradient-primary px-4 py-3"><div className="flex items-center gap-2"><FaHeartbeat className="text-white text-lg" /><div><h2 className="text-white font-semibold text-base font-nunito">Form Tambah Dokter</h2><p className="text-white/80 text-[10px]">Isi data dokter hewan dengan lengkap</p></div></div></div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaUserMd className="inline mr-1 text-[10px]" />Nama Lengkap *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary py-2 text-sm" required /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaStethoscope className="inline mr-1 text-[10px]" />Spesialisasi *</label><select name="specialization" value={formData.specialization} onChange={handleChange} className="input-primary py-2 text-sm" required><option value="">Pilih Spesialisasi</option><option>Dokter Umum</option><option>Bedah</option><option>Dokter Gigi</option><option>Dermatologi</option><option>Kardiologi</option></select></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaIdCard className="inline mr-1 text-[10px]" />Nomor STR *</label><input type="text" name="license" value={formData.license} onChange={handleChange} className="input-primary py-2 text-sm" required /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaPhone className="inline mr-1 text-[10px]" />Nomor Telepon</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-primary py-2 text-sm" /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaEnvelope className="inline mr-1 text-[10px]" />Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-primary py-2 text-sm" /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaCalendarAlt className="inline mr-1 text-[10px]" />Tanggal Bergabung</label><input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} className="input-primary py-2 text-sm" /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1">Status</label><select name="status" value={formData.status} onChange={handleChange} className="input-primary py-2 text-sm"><option>Active</option><option>On Leave</option></select></div>
            </div>
            <div className="flex gap-3 pt-2"><button type="submit" className="flex-1 btn-primary py-2 text-sm">Tambah Dokter</button><button type="button" onClick={() => navigate("/veterinarians")} className="flex-1 btn-secondary py-2 text-sm">Batal</button></div>
          </div>
        </form>
      </div>
    </div>
  );
}