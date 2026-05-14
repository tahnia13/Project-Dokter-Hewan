import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaIdCard, FaStethoscope, FaEdit, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialVeterinarians } from "../data/clinicData";

export default function VeterinarianDetail() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundVet = initialVeterinarians.find(v => v.id === id);
      setVet(foundVet);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat detail dokter..." />;
  if (!vet) return <NotFound />;

  return (
    <div className="p-5">
      <div className="mb-4">
        <Link to="/veterinarians" className="text-[#432C81] hover:text-[#58315A] flex items-center gap-2 font-inter">
          <FaArrowLeft size={14} /> Kembali ke Daftar Dokter
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-[#CCC3FF]/30 overflow-hidden max-w-4xl mx-auto">
        {/* Header dengan Foto Profil */}
        <div className="bg-gradient-primary p-6 text-white">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
              <img 
                src={`https://ui-avatars.com/api/?name=${vet.name}&background=58315A&color=fff&size=120&bold=true&length=2`}
                alt={vet.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/50 relative z-10 shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-nunito">{vet.name}</h1>
              <p className="text-white/80 text-sm font-inter">ID: {vet.id}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${vet.status === "Active" ? "bg-green-600" : "bg-yellow-600"}`}>
                  {vet.status === "Active" ? "Aktif" : "Cuti"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20">
                  {vet.specialization}
                </span>
              </div>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <FaUserMd className="text-white text-3xl" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaStethoscope /> Informasi Profesional
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter">Spesialisasi</span>
                  <span className="font-semibold text-gray-800">{vet.specialization}</span>
                </div>
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaIdCard className="inline mr-1" /> Nomor STR</span>
                  <span className="font-semibold text-gray-800">{vet.license}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaCalendarAlt className="inline mr-1" /> Tanggal Bergabung</span>
                  <span className="font-semibold text-gray-800">{vet.joinDate}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F3FF] rounded-xl p-4">
              <h3 className="text-lg font-bold text-[#432C81] mb-4 font-nunito flex items-center gap-2">
                <FaPhone /> Informasi Kontak
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-[#CCC3FF]/30 pb-2">
                  <span className="text-gray-500 font-inter"><FaPhone className="inline mr-1" /> Telepon</span>
                  <span className="font-semibold text-gray-800">{vet.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-inter"><FaEnvelope className="inline mr-1" /> Email</span>
                  <span className="font-semibold text-gray-800">{vet.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all font-inter">
              Edit Data Dokter
            </button>
            <button className="flex-1 border-2 border-[#432C81] text-[#432C81] py-3 rounded-xl font-semibold hover:bg-[#432C81]/10 transition-all font-inter">
              Jadwal Praktek
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import NotFound from "./NotFound";