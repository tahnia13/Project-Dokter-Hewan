import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaSearch, FaPlus, FaDog, FaCat, FaPaw, 
  FaEdit, FaTrash, FaEye 
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialPetOwners, getOwnerName } from "../data/clinicData";

export default function Pets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([]);
  const [owners] = useState(initialPetOwners);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(initialPets);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getPetIcon = (type) => {
    if (type === "Dog") return <FaDog className="text-[#432C81]" />;
    if (type === "Cat") return <FaCat className="text-[#432C81]" />;
    return <FaPaw className="text-[#432C81]" />;
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus pasien "${name}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newPets = pets.filter(pet => pet.id !== id);
        setPets(newPets);
        setIsDeleting(false);
        alert(`✅ Pasien ${name} berhasil dihapus!`);
      }, 500);
    }
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    getOwnerName(pet.id, owners).toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data pasien..." />;
  if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data pasien..." />;

  return (
    <div id="pets-page">
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Pet List"]}>
        <button 
          onClick={() => navigate("/add-pet")} 
          className="bg-gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center gap-2 font-inter"
        >
          <FaPlus size={14} /> Tambah Pasien
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#CCC3FF]/30">
          
          <div className="p-6 border-b border-[#CCC3FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#432C81] font-nunito">Daftar Pasien Hewan</h2>
              <p className="text-gray-400 text-sm font-inter">Kelola informasi kesehatan pasien Anda</p>
            </div>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari nama hewan atau pemilik..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#CCC3FF] rounded-xl focus:ring-2 focus:ring-[#432C81] outline-none transition-all font-inter"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F3FF] text-gray-600 text-sm uppercase border-b border-[#CCC3FF]/30">
                <tr>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Patient ID</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Pet Name</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Type & Breed</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Owner</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Status</th>
                  <th className="p-4 font-bold text-center text-[#432C81] font-nunito">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCC3FF]/20">
                {filteredPets.map((pet) => (
                  <tr key={pet.id} className="hover:bg-[#F5F3FF] transition-colors">
                    <td className="p-4 text-[#432C81] font-mono font-bold text-sm">
                      {pet.id}
                    </td>
                    <td className="p-4">
                      <Link to={`/pets/${pet.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                          {getPetIcon(pet.type)}
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-700 hover:text-[#432C81] transition-colors">{pet.name}</span>
                           <span className="text-[10px] text-gray-400">{pet.gender}, {pet.age} thn</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-gray-600 italic">
                      {pet.type} <span className="text-gray-300 mx-1">|</span> {pet.breed}
                    </td>
                    <td className="p-4">
                       <span className="text-sm font-medium text-slate-700 font-semibold">
                         {getOwnerName(pet.id, owners)}
                       </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        pet.healthStatus === "Healthy" 
                        ? "bg-green-100 text-green-600 border-green-200" 
                        : pet.healthStatus === "Under Treatment"
                        ? "bg-amber-100 text-amber-600 border-amber-200"
                        : "bg-blue-100 text-blue-600 border-blue-200"
                      }`}>
                        {pet.healthStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link to={`/pets/${pet.id}`} className="text-blue-500 hover:text-blue-700 transition-colors" title="Detail">
                          <FaEye size={18} />
                        </Link>
                        <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(pet.id, pet.name)}
                          className="text-red-500 hover:text-red-700 transition-colors" 
                          title="Hapus"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPets.length === 0 && (
            <div className="p-20 text-center">
              <FaPaw className="text-[#CCC3FF] text-6xl mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Data pasien tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}