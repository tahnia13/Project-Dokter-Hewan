import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaUser, FaBirthdayCake, FaVenusMars, FaWeightHanging, FaSyringe, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialPetOwners } from "../data/clinicData";

export default function FormPet() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const owners = initialPetOwners;
  const [formData, setFormData] = useState({ 
    name: "", type: "Dog", breed: "", age: "", gender: "Male", weight: "", 
    ownerId: owners[0]?.id || "", healthStatus: "Healthy", vaccinations: "", allergies: "" 
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const newId = `PET-${10000 + initialPets.length + 1}`;
      const newPet = {
        id: newId, name: formData.name, type: formData.type, breed: formData.breed, 
        age: parseInt(formData.age) || 0, gender: formData.gender, weight: formData.weight,
        ownerId: formData.ownerId, lastVisit: new Date().toISOString().slice(0,10), 
        healthStatus: formData.healthStatus, vaccinations: formData.vaccinations.split(",").map(v => v.trim())
      };
      initialPets.push(newPet);
      setIsLoading(false);
      alert(`✅ Pasien ${formData.name} berhasil didaftarkan! (ID: ${newId})`);
      navigate("/pets");
    }, 800);
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Menyimpan data pasien..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Pasien Baru" breadcrumb={["Dashboard", "Pasien", "Tambah"]} />
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden">
          <div className="bg-gradient-primary px-6 py-4">
            <div className="flex items-center gap-3"><FaHeartbeat className="text-white text-2xl" /><div><h2 className="text-white font-bold text-xl">Form Registrasi Pasien</h2><p className="text-white/80 text-sm">Isi data hewan pasien dengan lengkap</p></div></div>
          </div>
          <div className="p-6 space-y-6">
            <div><h3 className="text-lg font-semibold text-pink-800 mb-4"><FaPaw className="inline mr-2" /> Informasi Hewan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Nama Hewan *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="input-primary" required /></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Jenis Hewan *</label><select name="type" value={formData.type} onChange={handleChange} className="input-primary"><option>Dog</option><option>Cat</option><option>Rabbit</option></select></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Ras</label><input type="text" name="breed" value={formData.breed} onChange={handleChange} className="input-primary" /></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaBirthdayCake className="inline mr-1" /> Umur (Tahun)</label><input type="number" name="age" value={formData.age} onChange={handleChange} className="input-primary" /></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaVenusMars className="inline mr-1" /> Jenis Kelamin</label><select name="gender" value={formData.gender} onChange={handleChange} className="input-primary"><option>Male</option><option>Female</option></select></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaWeightHanging className="inline mr-1" /> Berat Badan</label><input type="text" name="weight" value={formData.weight} onChange={handleChange} className="input-primary" placeholder="Contoh: 5 kg" /></div>
              </div>
            </div>
            <div><h3 className="text-lg font-semibold text-pink-800 mb-4"><FaUser className="inline mr-2" /> Informasi Pemilik</h3>
              <div className="grid grid-cols-1 gap-6">
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Pilih Pemilik *</label><select name="ownerId" value={formData.ownerId} onChange={handleChange} className="input-primary" required><option value="">Pilih Pemilik</option>{owners.map(owner => (<option key={owner.id} value={owner.id}>{owner.name} ({owner.phone})</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Status Kesehatan</label><select name="healthStatus" value={formData.healthStatus} onChange={handleChange} className="input-primary"><option>Healthy</option><option>Under Treatment</option><option>Recovering</option></select></div>
              </div>
            </div>
            <div><h3 className="text-lg font-semibold text-pink-800 mb-4"><FaSyringe className="inline mr-2" /> Informasi Medis</h3>
              <div className="grid grid-cols-1 gap-6">
                <div><label className="block text-sm font-semibold text-pink-800 mb-2">Vaksinasi (pisahkan dengan koma)</label><input type="text" name="vaccinations" value={formData.vaccinations} onChange={handleChange} className="input-primary" placeholder="Rabies, DHPP" /></div>
                <div><label className="block text-sm font-semibold text-pink-800 mb-2"><FaNotesMedical className="inline mr-1" /> Alergi / Catatan</label><textarea name="allergies" value={formData.allergies} onChange={handleChange} rows="3" className="input-primary resize-none"></textarea></div>
              </div>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 btn-primary" disabled={isLoading}>{isLoading ? "Menyimpan..." : "Daftarkan Pasien"}</button>
              <button type="button" onClick={() => navigate("/pets")} className="flex-1 btn-secondary">Batal</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}