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
      alert(`✅ Janji temu untuk ${pets.find(p => p.id === formData.petId)?.name} berhasil dijadwalkan!`);
      navigate("/appointments");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan janji temu..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Tambah Janji Temu" breadcrumb={["Dashboard", "Janji Temu", "Tambah"]} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden">
          <div className="bg-gradient-primary px-4 py-3"><div className="flex items-center gap-2"><FaHeartbeat className="text-white text-lg" /><div><h2 className="text-white font-semibold text-base font-nunito">Form Janji Temu</h2><p className="text-white/80 text-[10px]">Isi data janji temu dengan lengkap</p></div></div></div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaPaw className="inline mr-1 text-[10px]" />Pilih Pasien *</label><select name="petId" value={formData.petId} onChange={handleChange} className="input-primary py-2 text-sm" required><option value="">Pilih Pasien</option>{pets.map(pet => (<option key={pet.id} value={pet.id}>{pet.name} ({pet.type} - {pet.breed})</option>))}</select></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaStethoscope className="inline mr-1 text-[10px]" />Dokter *</label><select name="veterinarian" value={formData.veterinarian} onChange={handleChange} className="input-primary py-2 text-sm" required><option value="">Pilih Dokter</option><option>Dr. Sarah Wijaya</option><option>Dr. Budi Santoso</option><option>Dr. Anita Permata</option><option>Dr. Rina Anggraini</option><option>Dr. Andi Prakoso</option></select></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaCalendarAlt className="inline mr-1 text-[10px]" />Tanggal *</label><input type="date" name="date" value={formData.date} onChange={handleChange} className="input-primary py-2 text-sm" required /></div>
              <div><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaClock className="inline mr-1 text-[10px]" />Waktu *</label><select name="time" value={formData.time} onChange={handleChange} className="input-primary py-2 text-sm" required><option value="">Pilih Waktu</option><option>09:00</option><option>10:30</option><option>13:00</option><option>14:30</option><option>15:00</option></select></div>
              <div className="md:col-span-2"><label className="block text-[11px] font-semibold text-gray-600 mb-1"><FaNotesMedical className="inline mr-1 text-[10px]" />Keluhan / Catatan</label><textarea name="symptoms" value={formData.symptoms} onChange={handleChange} rows="2" className="input-primary py-2 text-sm resize-none" placeholder="Deskripsikan keluhan atau gejala..."></textarea></div>
            </div>
            <div className="flex gap-3 pt-2"><button type="submit" className="flex-1 btn-primary py-2 text-sm">Simpan Janji Temu</button><button type="button" onClick={() => navigate("/appointments")} className="flex-1 btn-secondary py-2 text-sm">Batal</button></div>
          </div>
        </form>
      </div>
    </div>
  );
}