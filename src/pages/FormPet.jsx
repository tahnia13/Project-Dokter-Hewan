import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaUser, FaBirthdayCake, FaVenusMars, FaWeightHanging, FaSyringe, FaNotesMedical, FaHeartbeat } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Alert from "./Components/Alert";
import Loading from "./Components/Loading";
import { initialPets, initialPetOwners } from "../data/clinicData";

export default function FormPet() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
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
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/pets");
      }, 1500);
    }, 800);
  };

  const petTypeOptions = [
    { value: "Dog", label: "Anjing (Dog)" },
    { value: "Cat", label: "Kucing (Cat)" },
    { value: "Rabbit", label: "Kelinci (Rabbit)" }
  ];
  const genderOptions = [
    { value: "Male", label: "Jantan (Male)" },
    { value: "Female", label: "Betina (Female)" }
  ];
  const healthOptions = [
    { value: "Healthy", label: "Sehat (Healthy)" },
    { value: "Under Treatment", label: "Dalam Perawatan (Under Treatment)" },
    { value: "Recovering", label: "Pemulihan (Recovering)" }
  ];
  const ownerOptions = owners.map(owner => ({ value: owner.id, label: `${owner.name} (${owner.phone})` }));

  if (isLoading) return <Loading fullScreen text="Menyimpan data pasien..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Tambah Pasien Baru" breadcrumb={["Dashboard", "Pasien", "Tambah"]} />
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 overflow-hidden">
          <div className="bg-gradient-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <FaHeartbeat className="text-white text-lg" />
              <div>
                <h2 className="text-white font-semibold text-base font-nunito">Form Registrasi Pasien</h2>
                <p className="text-white/80 text-[10px]">Isi data hewan pasien dengan lengkap</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {showAlert && <Alert type="success" message={`Pasien ${formData.name} berhasil didaftarkan!`} onClose={() => setShowAlert(false)} />}
            
            <div>
              <h3 className="text-sm font-semibold text-[#432C81] mb-2 font-nunito"><FaPaw className="inline mr-1 text-sm" /> Informasi Hewan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InputField label="Nama Hewan" name="name" placeholder="Masukkan nama hewan" value={formData.name} onChange={handleChange} required />
                <SelectField label="Jenis Hewan" name="type" options={petTypeOptions} value={formData.type} onChange={handleChange} />
                <InputField label="Ras" name="breed" placeholder="Contoh: Pers, Anggora" value={formData.breed} onChange={handleChange} />
                <InputField label="Umur (Tahun)" type="number" name="age" placeholder="Umur dalam tahun" value={formData.age} onChange={handleChange} icon={FaBirthdayCake} />
                <SelectField label="Jenis Kelamin" name="gender" options={genderOptions} value={formData.gender} onChange={handleChange} icon={FaVenusMars} />
                <InputField label="Berat Badan" name="weight" placeholder="Contoh: 5 kg" value={formData.weight} onChange={handleChange} icon={FaWeightHanging} />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-[#432C81] mb-2 font-nunito"><FaUser className="inline mr-1 text-sm" /> Informasi Pemilik</h3>
              <div className="grid grid-cols-1 gap-3">
                <SelectField label="Pilih Pemilik" name="ownerId" options={ownerOptions} value={formData.ownerId} onChange={handleChange} required />
                <SelectField label="Status Kesehatan" name="healthStatus" options={healthOptions} value={formData.healthStatus} onChange={handleChange} />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-[#432C81] mb-2 font-nunito"><FaSyringe className="inline mr-1 text-sm" /> Informasi Medis</h3>
              <div className="grid grid-cols-1 gap-3">
                <InputField label="Vaksinasi (pisahkan dengan koma)" name="vaccinations" placeholder="Rabies, DHPP" value={formData.vaccinations} onChange={handleChange} />
                <InputField label="Alergi / Catatan" name="allergies" placeholder="Catatan alergi atau kondisi khusus" value={formData.allergies} onChange={handleChange} icon={FaNotesMedical} />
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button type="success" className="flex-1">Daftarkan Pasien</Button>
              <Button type="secondary" onClick={() => navigate("/pets")} className="flex-1">Batal</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}