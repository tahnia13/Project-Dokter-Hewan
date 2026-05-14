import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaPaw, FaEdit, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPetOwners, initialPets } from "../data/clinicData";

export default function PetOwnerDetail() {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundOwner = initialPetOwners.find(o => o.id === id);
      setOwner(foundOwner);
      if (foundOwner) {
        const ownerPets = initialPets.filter(p => p.ownerId === foundOwner.id);
        setPets(ownerPets);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat detail pemilik..." />;
  if (!owner) return <NotFound />;

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link to="/pet-owners" className="text-[#432C81] hover:text-[#58315A] flex items-center gap-2 font-inter">
          <FaArrowLeft size={14} /> Kembali ke Daftar Pemilik
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#CCC3FF]/30 overflow-hidden max-w-4xl mx-auto">
        {/* Header dengan Foto Profil */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <img 
                src={`https://ui-avatars.com/api/?name=${owner.name}&background=58315A&color=fff&size=120&bold=true&length=2`}
                alt={owner.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/50 relative z-10 shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-nunito">{owner.name}</h1>
              <p className="text-white/80 text-sm font-inter">ID: {owner.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {pets.length} Hewan
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {owner.totalVisits} Kunjungan
                </span>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <FaUser className="text-white text-3xl" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaUser /> Informasi Kontak
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaPhone className="inline mr-1" /> Telepon</span>
                  <span className="font-semibold text-gray-800">{owner.phone}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaEnvelope className="inline mr-1" /> Email</span>
                  <span className="font-semibold text-gray-800">{owner.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaMapMarkerAlt className="inline mr-1" /> Alamat</span>
                  <span className="font-semibold text-gray-800 text-right">{owner.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaCalendarAlt /> Informasi Lainnya
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Member Since</span>
                  <span className="font-semibold text-gray-800">{owner.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter">Total Kunjungan</span>
                  <span className="font-semibold text-gray-800">{owner.totalVisits} kali</span>
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Hewan dengan Foto */}
          <div className="mt-6 bg-[#F5F3FF] rounded-xl p-4">
            <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
              <FaPaw /> Daftar Hewan Peliharaan
            </h3>
            {pets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pets.map(pet => (
                  <Link key={pet.id} to={`/pets/${pet.id}`} className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${pet.name}&background=432C81&color=fff&size=60&bold=true&length=1`}
                      alt={pet.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{pet.name}</p>
                      <p className="text-xs text-gray-500">{pet.type} • {pet.breed}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada hewan peliharaan terdaftar</p>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all font-inter">
              Edit Data Pemilik
            </button>
            <button className="flex-1 border-2 border-[#432C81] text-[#432C81] py-3 rounded-xl font-semibold hover:bg-[#432C81]/10 transition-all font-inter">
              Tambah Hewan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import NotFound from "./NotFound";