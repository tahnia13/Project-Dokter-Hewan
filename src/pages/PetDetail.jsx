import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaArrowLeft, FaPaw, FaUser, FaCalendarAlt, FaHeartbeat, 
  FaBirthdayCake, FaVenusMars, FaSyringe, FaDog, FaCat 
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialPetOwners } from "../data/clinicData";

export default function PetDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundPet = initialPets.find(p => p.id === id);
      setPet(foundPet);
      if (foundPet) {
        const foundOwner = initialPetOwners.find(o => o.id === foundPet.ownerId);
        setOwner(foundOwner);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const getPetIcon = () => {
    if (pet?.type === "Dog") return <FaDog className="text-white text-5xl" />;
    if (pet?.type === "Cat") return <FaCat className="text-white text-5xl" />;
    return <FaPaw className="text-white text-5xl" />;
  };

  const getPetImage = () => {
    // Gunakan UI Avatars berdasarkan nama hewan
    return `https://ui-avatars.com/api/?name=${pet?.name}&background=432C81&color=fff&size=120&bold=true&length=1`;
  };

  const getHealthColor = (status) => {
    const colors = {
      Healthy: "bg-green-100 text-green-600",
      "Under Treatment": "bg-amber-100 text-amber-600",
      Recovering: "bg-blue-100 text-blue-600",
      Vaccinated: "bg-purple-100 text-purple-600"
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat detail pasien..." />;
  if (!pet) return <NotFound />;

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link to="/pets" className="text-[#432C81] hover:text-[#58315A] flex items-center gap-2 font-inter">
          <FaArrowLeft size={14} /> Kembali ke Daftar Pasien
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#CCC3FF]/30 overflow-hidden max-w-4xl mx-auto">
        {/* Header dengan Foto Profil */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-6">
            {/* Foto Profil Hewan */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <img 
                src={getPetImage()} 
                alt={pet.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/50 relative z-10 shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-nunito">{pet.name}</h1>
              <p className="text-white/80 text-sm font-inter">Patient ID: {pet.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {pet.type}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getHealthColor(pet.healthStatus)}`}>
                  {pet.healthStatus}
                </span>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              {getPetIcon()}
            </div>
          </div>
        </div>

        {/* Body (sama seperti sebelumnya) */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informasi Hewan */}
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaPaw /> Informasi Hewan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Jenis Hewan</span>
                  <span className="font-semibold text-gray-800">{pet.type}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Ras</span>
                  <span className="font-semibold text-gray-800">{pet.breed}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaBirthdayCake className="inline mr-1" /> Umur</span>
                  <span className="font-semibold text-gray-800">{pet.age} tahun</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaVenusMars className="inline mr-1" /> Gender</span>
                  <span className="font-semibold text-gray-800">{pet.gender}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Berat Badan</span>
                  <span className="font-semibold text-gray-800">{pet.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaCalendarAlt className="inline mr-1" /> Kunjungan Terakhir</span>
                  <span className="font-semibold text-gray-800">{pet.lastVisit}</span>
                </div>
              </div>
            </div>

            {/* Informasi Pemilik */}
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaUser /> Informasi Pemilik
              </h3>
              {owner ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${owner.name}&background=58315A&color=fff&size=60&bold=true`}
                      alt={owner.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{owner.name}</p>
                      <p className="text-xs text-gray-500">Pemilik</p>
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                    <span className="text-gray-500 font-inter">Nomor Telepon</span>
                    <span className="font-semibold text-gray-800">{owner.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                    <span className="text-gray-500 font-inter">Email</span>
                    <span className="font-semibold text-gray-800">{owner.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-inter">Alamat</span>
                    <span className="font-semibold text-gray-800 text-right">{owner.address}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Data pemilik tidak ditemukan</p>
              )}
            </div>
          </div>

          {/* Informasi Medis */}
          <div className="mt-6 bg-[#F5F3FF] rounded-xl p-4">
            <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
              <FaSyringe /> Informasi Medis
            </h3>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="text-gray-500 font-inter">Vaksinasi:</span>
                {pet.vaccinations.map((v, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs bg-[#CCC3FF]/50 text-[#432C81]">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all font-inter">
              Edit Data Pasien
            </button>
            <button className="flex-1 border-2 border-[#432C81] text-[#432C81] py-3 rounded-xl font-semibold hover:bg-[#432C81]/10 transition-all font-inter">
              Riwayat Kunjungan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import NotFound from "./NotFound";