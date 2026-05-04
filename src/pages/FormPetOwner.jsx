import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
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
      alert(`✅ Pemilik ${formData.name} berhasil didaftarkan! (ID: ${newId})`);
      navigate("/pet-owners");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan data pemilik..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Pemilik Baru" breadcrumb={["Dashboard", "Pemilik", "Tambah"]} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="bg-gradient-primary px-6 py-4"><div className="flex items-center gap-3"><FaHeartbeat className="text-white text-2xl" /><div><h2 className="text-white font-bold text-xl">Form Registrasi Pemilik</h2><p className="text-white/80 text-sm">Isi data pemilik hewan dengan lengkap</p></div></div></div>
          <div className="p-6 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaUser className="inline mr-2" />Nama Lengkap *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary" required /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaPhone className="inline mr-2" />Nomor Telepon *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-primary" required /></div>
            <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaEnvelope className="inline mr-2" />Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="input-primary" /></div>
            <div className="md:col-span-2"><label className="block text-sm font-semibold text-pink-800 mb-2"><FaMapMarkerAlt className="inline mr-2" />Alamat</label><textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="input-primary resize-none"></textarea></div>
          </div><div className="flex gap-4"><button type="submit" className="flex-1 btn-primary" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Daftarkan Pemilik"}</button><button type="button" onClick={() => navigate("/pet-owners")} className="flex-1 btn-secondary">Batal</button></div></div>
        </form>
      </div>
    </div>
  );
}