import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaPaw, FaStethoscope, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Alert from "./Components/Alert";
import Loading from "./Components/Loading";
import { initialAppointments, initialPets } from "../data/clinicData";

export default function FormAppointment() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/appointments");
      }, 1500);
    }, 800);
  };

  const petOptions = pets.map(pet => ({ value: pet.id, label: `${pet.name} (${pet.type} - ${pet.breed})` }));
  const veterinarianOptions = [
    { value: "Dr. Sarah Wijaya", label: "Dr. Sarah Wijaya" },
    { value: "Dr. Budi Santoso", label: "Dr. Budi Santoso" },
    { value: "Dr. Anita Permata", label: "Dr. Anita Permata" },
    { value: "Dr. Rina Anggraini", label: "Dr. Rina Anggraini" },
    { value: "Dr. Andi Prakoso", label: "Dr. Andi Prakoso" }
  ];
  const timeOptions = [
    { value: "09:00", label: "09:00" },
    { value: "10:30", label: "10:30" },
    { value: "13:00", label: "13:00" },
    { value: "14:30", label: "14:30" },
    { value: "15:00", label: "15:00" }
  ];

  if (isLoading) return <Loading fullScreen text="Menyimpan janji temu..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Tambah Janji Temu" breadcrumb={["Janji Temu", "Tambah"]} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden">
          <div className="bg-gradient-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <FaHeartbeat className="text-white text-lg" />
              <div>
                <h2 className="text-white font-semibold text-base font-nunito">Form Janji Temu</h2>
                <p className="text-white/80 text-[10px]">Isi data janji temu dengan lengkap</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {showAlert && <Alert type="success" message="Janji temu berhasil dijadwalkan!" onClose={() => setShowAlert(false)} />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SelectField label="Pilih Pasien" name="petId" options={petOptions} value={formData.petId} onChange={handleChange} required icon={FaPaw} />
              <SelectField label="Dokter" name="veterinarian" options={veterinarianOptions} value={formData.veterinarian} onChange={handleChange} required icon={FaStethoscope} />
              <InputField label="Tanggal" type="date" name="date" value={formData.date} onChange={handleChange} required icon={FaCalendarAlt} />
              <SelectField label="Waktu" name="time" options={timeOptions} value={formData.time} onChange={handleChange} required icon={FaClock} />
              <div className="md:col-span-2">
                <InputField label="Keluhan / Catatan" type="text" name="symptoms" placeholder="Deskripsikan keluhan atau gejala..." value={formData.symptoms} onChange={handleChange} icon={FaNotesMedical} />
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button type="success" className="flex-1">Simpan Janji Temu</Button>
              <Button type="secondary" onClick={() => navigate("/appointments")} className="flex-1">Batal</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}