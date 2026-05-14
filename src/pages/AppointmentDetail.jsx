import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaArrowLeft, FaPaw, FaUserMd, FaCalendarAlt, FaClock, 
  FaNotesMedical, FaUser, FaPhone, FaEnvelope, FaDog, FaCat 
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialAppointments, initialPets, initialPetOwners, initialVeterinarians } from "../data/clinicData";

export default function AppointmentDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [pet, setPet] = useState(null);
  const [owner, setOwner] = useState(null);
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundAppointment = initialAppointments.find(a => a.id === id);
      setAppointment(foundAppointment);
      if (foundAppointment) {
        const foundPet = initialPets.find(p => p.id === foundAppointment.petId);
        setPet(foundPet);
        if (foundPet) {
          const foundOwner = initialPetOwners.find(o => o.id === foundPet.ownerId);
          setOwner(foundOwner);
        }
        const foundVet = initialVeterinarians.find(v => v.name === foundAppointment.veterinarian);
        setVet(foundVet);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const getPetIcon = () => {
    if (pet?.type === "Dog") return <FaDog className="text-[#432C81] text-2xl" />;
    if (pet?.type === "Cat") return <FaCat className="text-[#432C81] text-2xl" />;
    return <FaPaw className="text-[#432C81] text-2xl" />;
  };

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "bg-[#CCC3FF]/50 text-[#432C81]",
      Completed: "bg-green-100 text-green-600",
      "In Progress": "bg-yellow-100 text-yellow-600",
      Cancelled: "bg-red-100 text-red-600"
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat detail janji temu..." />;
  if (!appointment) return <NotFound />;

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link to="/appointments" className="text-[#432C81] hover:text-[#58315A] flex items-center gap-2 font-inter">
          <FaArrowLeft size={14} /> Kembali ke Daftar Janji Temu
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#CCC3FF]/30 overflow-hidden max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <img 
                src={`https://ui-avatars.com/api/?name=${pet?.name || "Pet"}&background=432C81&color=fff&size=120&bold=true&length=1`}
                alt={pet?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/50 relative z-10 shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-nunito">Appointment Detail</h1>
              <p className="text-white/80 text-sm font-inter">ID: {appointment.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} bg-white/20 text-white`}>
                  {appointment.status}
                </span>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <FaCalendarAlt className="text-white text-3xl" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informasi Janji Temu */}
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaCalendarAlt /> Detail Janji Temu
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Tanggal</span>
                  <span className="font-semibold text-gray-800">{appointment.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaClock className="inline mr-1" /> Waktu</span>
                  <span className="font-semibold text-gray-800">{appointment.time}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaUserMd className="inline mr-1" /> Dokter</span>
                  <div className="flex items-center gap-2">
                    {vet && (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${vet.name}&background=58315A&color=fff&size=40&bold=true&length=2`}
                        alt={vet.name}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <span className="font-semibold text-gray-800">{appointment.veterinarian}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaNotesMedical className="inline mr-1" /> Keluhan</span>
                  <span className="font-semibold text-gray-800 text-right">{appointment.symptoms || "-"}</span>
                </div>
              </div>
            </div>

            {/* Informasi Hewan */}
            {pet && (
              <div className="bg-[#F5F3FF] rounded-xl p-4">
                <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                  <FaPaw /> Informasi Hewan
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-3">
                    {getPetIcon()}
                    <div>
                      <Link to={`/pets/${pet.id}`} className="font-semibold text-gray-800 hover:text-[#432C81]">
                        {pet.name}
                      </Link>
                      <p className="text-xs text-gray-500">{pet.type} • {pet.breed}</p>
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                    <span className="text-gray-500 font-inter">Umur</span>
                    <span className="font-semibold text-gray-800">{pet.age} tahun</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-inter">Berat</span>
                    <span className="font-semibold text-gray-800">{pet.weight}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Informasi Pemilik */}
          {owner && (
            <div className="mt-6 bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaUser /> Informasi Pemilik
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={`https://ui-avatars.com/api/?name=${owner.name}&background=58315A&color=fff&size=60&bold=true&length=2`}
                  alt={owner.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <Link to={`/pet-owners/${owner.id}`} className="font-semibold text-gray-800 hover:text-[#432C81]">
                    {owner.name}
                  </Link>
                  <p className="text-xs text-gray-500">Pemilik</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaPhone className="inline mr-1" /> Telepon</span>
                  <span className="font-semibold text-gray-800">{owner.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaEnvelope className="inline mr-1" /> Email</span>
                  <span className="font-semibold text-gray-800">{owner.email}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all font-inter">
              Edit Janji Temu
            </button>
            <button className="flex-1 border-2 border-[#432C81] text-[#432C81] py-3 rounded-xl font-semibold hover:bg-[#432C81]/10 transition-all font-inter">
              Lihat Riwayat Pasien
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import NotFound from "./NotFound";