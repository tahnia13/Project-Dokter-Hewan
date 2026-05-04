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
  const [isLoading, setIsLoading] = useState(true);  // <=== AWALNYA TRUE
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setPets(initialPets);
      setIsLoading(false);
    }, 500);
  }, []);

  const getPetIcon = (type) => {
    if (type === "Dog") return <FaDog className="text-pink-600 text-2xl" />;
    if (type === "Cat") return <FaCat className="text-rose-600 text-2xl" />;
    return <FaPaw className="text-purple-600 text-2xl" />;
  };

  const getHealthColor = (status) => {
    const colors = { Healthy: "bg-green-100 text-green-600", "Under Treatment": "bg-yellow-100 text-yellow-600", Recovering: "bg-blue-100 text-blue-600", Vaccinated: "bg-purple-100 text-purple-600" };
    return colors[status] || "bg-pink-100 text-pink-600";
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

  // LOADING AWAL
  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data pasien..." />;
if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data pasien..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Data Pasien" subtitle={`${pets.length} Hewan Terdaftar`} breadcrumb={["Dashboard", "Pasien"]}>
        <button onClick={() => navigate("/add-pet")} className="btn-primary inline-flex items-center gap-2">
          <FaPlus /> Tambah Pasien
        </button>
      </PageHeader>

      <div className="card p-5">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
          <input type="text" placeholder="Cari nama hewan atau pemilik..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-11" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => {
          const owner = getOwnerById(pet.ownerId);
          return (
            <div key={pet.id} className="card overflow-hidden">
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 border-b border-pink-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-full p-3 shadow-sm">{getPetIcon(pet.type)}</div>
                    <div><h3 className="font-bold text-pink-800 text-lg">{pet.name}</h3><p className="text-xs text-pink-400">{pet.id}</p></div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthColor(pet.healthStatus)}`}>{pet.healthStatus}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm border-b border-pink-50 pb-2"><span className="text-pink-500">Jenis & Ras:</span><span className="font-semibold text-pink-800">{pet.type} • {pet.breed}</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500"><FaBirthdayCake className="inline mr-1" /> Umur:</span><span className="font-medium text-pink-800">{pet.age} tahun</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500"><FaVenusMars className="inline mr-1" /> Gender:</span><span className="font-medium text-pink-800">{pet.gender}</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500">Berat:</span><span className="font-medium text-pink-800">{pet.weight}</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-pink-50"><span className="text-pink-500"><FaUser className="inline mr-1" /> Pemilik:</span><span className="font-semibold text-pink-800">{owner?.name || "Unknown"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500">Telepon:</span><span className="font-medium text-pink-700 text-xs">{owner?.phone || "-"}</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500"><FaCalendarAlt className="inline mr-1" /> Kunjungan Terakhir:</span><span className="font-medium text-pink-800">{pet.lastVisit}</span></div>
                <div className="flex justify-between text-sm"><span className="text-pink-500"><FaSyringe className="inline mr-1" /> Vaksin:</span><span className="font-medium text-pink-800 text-xs">{pet.vaccinations.join(", ")}</span></div>
              </div>
              <div className="px-5 py-3 bg-pink-50 border-t border-pink-100 flex gap-2">
                <button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"><FaEye size={12} /> Rekam Medis</button>
                <button className="p-2 border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100"><FaEdit /></button>
                <button onClick={() => handleDelete(pet.id, pet.name)} className="p-2 border border-pink-200 rounded-lg text-red-500 hover:bg-red-50"><FaTrash /></button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPets.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-12 text-center">
          <FaHeartbeat className="text-6xl text-pink-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-pink-600">Tidak ada data pasien</h3>
          <p className="text-pink-400 mt-2">Belum ada hewan yang terdaftar</p>
          <button onClick={() => navigate("/add-pet")} className="mt-4 btn-primary inline-flex items-center gap-2"><FaPlus /> Tambah Pasien</button>
        </div>
      )}
    </div>
  );
}