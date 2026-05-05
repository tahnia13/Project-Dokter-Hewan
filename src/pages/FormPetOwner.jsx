import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPetOwners } from "../data/clinicData";

export default function FormPetOwner() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const newId = `OWN-${String(initialPetOwners.length + 1).padStart(3, "0")}`;
      const newOwner = { id: newId, name: formData.name, phone: formData.phone, email: formData.email, address: formData.address, joinDate: new Date().toISOString().slice(0,10), totalVisits: 0 };
      initialPetOwners.push(newOwner);
      setIsLoading(false);
      alert(`✅ Pemilik ${formData.name} berhasil didaftarkan!`);
      navigate("/pet-owners");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan data pemilik..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Tambah Pemilik Baru" breadcrumb={["Dashboard", "Pemilik", "Tambah"]} />
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden">
          <div className="bg-gradient-primary px-4 py-3"><div className="flex items-center gap-2"><FaHeartbeat className="text-white text-lg" /><div><h2 className="text-white font-semibold text-base font-nunito">Form Registrasi Pemilik</h2><p className="text-white/80 text-[10px]">Isi data pemilik hewan dengan lengkap</p></div></div></div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaUser className="inline mr-1 text-[10px]" />Nama Lengkap *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary py-2 text-sm" required /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaPhone className="inline mr-1 text-[10px]" />Nomor Telepon *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-primary py-2 text-sm" required /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaEnvelope className="inline mr-1 text-[10px]" />Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-primary py-2 text-sm" /></div>
              <div className="md:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaMapMarkerAlt className="inline mr-1 text-[10px]" />Alamat</label><textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="input-primary py-2 text-sm resize-none"></textarea></div>
            </div>
            <div className="flex gap-3 pt-2"><button type="submit" className="flex-1 btn-primary py-2 text-sm">Daftarkan Pemilik</button><button type="button" onClick={() => navigate("/pet-owners")} className="flex-1 btn-secondary py-2 text-sm">Batal</button></div>
          </div>
        </form>
      </div>
    </div>
  );
}