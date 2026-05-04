import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaUser, FaPaw, FaStethoscope, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialAppointments, initialPets } from "../data/clinicData";

export default function FormAppointment() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const pets = initialPets;
  const [formData, setFormData] = useState({ petId: pets[0]?.id || "", veterinarian: "", date: "", time: "", symptoms: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const newId = `APT-${String(initialAppointments.length + 1).padStart(3, "0")}`;
      const newAppointment = { id: newId, petId: formData.petId, veterinarian: formData.veterinarian, date: formData.date, time: formData.time, status: "Scheduled", symptoms: formData.symptoms };
      initialAppointments.push(newAppointment);
      setIsLoading(false);
      alert(`✅ Janji temu untuk ${pets.find(p => p.id === formData.petId)?.name} berhasil dijadwalkan! (ID: ${newId})`);
      navigate("/appointments");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan janji temu..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Janji Temu" breadcrumb={["Dashboard", "Janji Temu", "Tambah"]} />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="bg-gradient-primary px-6 py-4"><div className="flex items-center gap-3"><FaHeartbeat className="text-white text-2xl" /><div><h2 className="text-white font-bold text-xl">Form Janji Temu</h2><p className="text-white/80 text-sm">Isi data janji temu dengan lengkap</p></div></div></div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaPaw className="inline mr-2" />Pilih Pasien *</label><select name="petId" value={formData.petId} onChange={handleChange} className="input-primary" required><option value="">Pilih Pasien</option>{pets.map(pet => (<option key={pet.id} value={pet.id}>{pet.name} ({pet.type} - {pet.breed})</option>))}</select></div>
              <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaStethoscope className="inline mr-2" />Dokter *</label><select name="veterinarian" value={formData.veterinarian} onChange={handleChange} className="input-primary" required><option value="">Pilih Dokter</option><option>Dr. Sarah Wijaya</option><option>Dr. Budi Santoso</option><option>Dr. Anita Permata</option><option>Dr. Rina Anggraini</option><option>Dr. Andi Prakoso</option></select></div>
              <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaCalendarAlt className="inline mr-2" />Tanggal *</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="input-primary" required /></div>
              <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaClock className="inline mr-2" />Waktu *</label><select name="time" value={formData.time} onChange={handleChange} className="input-primary" required><option value="">Pilih Waktu</option><option>09:00</option><option>10:30</option><option>13:00</option><option>14:30</option><option>15:00</option></select></div>
              <div className="md:col-span-2"><label className="block text-sm font-semibold text-pink-800 mb-2"><FaNotesMedical className="inline mr-2" />Keluhan / Catatan</label><textarea name="symptoms" value={formData.symptoms} onChange={handleChange} rows="3" className="input-primary resize-none" placeholder="Deskripsikan keluhan atau gejala..." /></div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 btn-primary" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Simpan Janji Temu"}</button>
              <button type="button" onClick={() => navigate("/appointments")} className="flex-1 btn-secondary">Batal</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}