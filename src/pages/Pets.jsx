import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaDog, FaCat, FaPaw, FaUser, FaCalendarAlt, FaHeartbeat, FaBirthdayCake, FaVenusMars, FaSyringe, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialPetOwners, getOwnerName, getOwnerPhone } from "../data/clinicData";

export default function Pets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([]);
  const [owners] = useState(initialPetOwners);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setIsLoading(false);
    }, 500);
  }, []);

  const getPetIcon = (type) => {
    if (type === "Dog") return <FaDog className="text-[#432C81] text-xl" />;
    if (type === "Cat") return <FaCat className="text-[#432C81] text-xl" />;
    return <FaPaw className="text-[#432C81] text-xl" />;
  };

  const getHealthColor = (status) => {
    const colors = { Healthy: "bg-green-100 text-green-600", "Under Treatment": "bg-yellow-100 text-yellow-600", Recovering: "bg-blue-100 text-blue-600", Vaccinated: "bg-purple-100 text-purple-600" };
    return colors[status] || "bg-[#CCC3FF]/50 text-[#432C81]";
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus pasien "${name}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newPets = pets.filter(pet => pet.id !== id);
        setPets(newPets);
        initialPets.length = 0;
        initialPets.push(...newPets);
        setIsDeleting(false);
        alert(`✅ Pasien ${name} berhasil dihapus!`);
      }, 500);
    }
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    getOwnerName(pet.id, owners).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOwnerById = (ownerId) => owners.find(o => o.id === ownerId);

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data pasien..." />;
  if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data pasien..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Data Pasien" subtitle={`${pets.length} Hewan Terdaftar`} breadcrumb={["Dashboard", "Pasien"]}>
        <button onClick={() => navigate("/add-pet")} className="btn-primary inline-flex items-center gap-2">
          <FaPlus size={12} /> Tambah Pasien
        </button>
      </PageHeader>

      <div className="card p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" placeholder="Cari nama hewan atau pemilik..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPets.map((pet) => {
          const owner = getOwnerById(pet.ownerId);
          return (
            <div key={pet.id} className="card overflow-hidden">
              <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] p-3 border-b border-[#CCC3FF]/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      {getPetIcon(pet.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#432C81] text-sm font-nunito">{pet.name}</h3>
                      <p className="text-[10px] text-gray-400">{pet.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${getHealthColor(pet.healthStatus)}`}>
                    {pet.healthStatus}
                  </span>
                </div>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Jenis & Ras:</span><span className="font-semibold text-gray-800">{pet.type} • {pet.breed}</span></div>
                <div className="flex justify-between"><span className="text-gray-500"><FaBirthdayCake className="inline mr-1 text-[10px]" /> Umur:</span><span className="font-medium text-gray-700">{pet.age} tahun</span></div>
                <div className="flex justify-between"><span className="text-gray-500"><FaVenusMars className="inline mr-1 text-[10px]" /> Gender:</span><span className="font-medium text-gray-700">{pet.gender}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Berat:</span><span className="font-medium text-gray-700">{pet.weight}</span></div>
                <div className="flex justify-between pt-1 border-t border-[#CCC3FF]/30"><span className="text-gray-500"><FaUser className="inline mr-1 text-[10px]" /> Pemilik:</span><span className="font-semibold text-[#432C81]">{owner?.name || "Unknown"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500"><FaCalendarAlt className="inline mr-1 text-[10px]" /> Kunjungan:</span><span className="font-medium text-gray-700">{pet.lastVisit}</span></div>
                <div className="flex justify-between"><span className="text-gray-500"><FaSyringe className="inline mr-1 text-[10px]" /> Vaksin:</span><span className="font-medium text-gray-600 text-[9px]">{pet.vaccinations.join(", ")}</span></div>
              </div>
              <div className="px-3 py-2 bg-[#F5F3FF] border-t border-[#CCC3FF]/30 flex gap-2">
                <button className="flex-1 btn-primary py-1 text-[10px] flex items-center justify-center gap-1"><FaEye size={10} /> Rekam Medis</button>
                <button className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-[#432C81] hover:bg-[#CCC3FF]/20"><FaEdit size={12} /></button>
                <button onClick={() => handleDelete(pet.id, pet.name)} className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-red-500 hover:bg-red-50"><FaTrash size={12} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPets.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-8 text-center">
          <FaHeartbeat className="text-4xl text-[#CCC3FF] mx-auto mb-2" />
          <h3 className="text-base font-semibold text-[#432C81] font-nunito">Tidak ada data pasien</h3>
          <p className="text-xs text-gray-400 mt-1">Belum ada hewan yang terdaftar</p>
          <button onClick={() => navigate("/add-pet")} className="mt-3 btn-primary inline-flex items-center gap-1 text-xs py-1.5"><FaPlus size={10} /> Tambah Pasien</button>
        </div>
      )}
    </div>
  );
}