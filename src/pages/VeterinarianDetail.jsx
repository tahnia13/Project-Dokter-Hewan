import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaArrowLeft, 
  FaUserMd, 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt, 
  FaIdCard, 
  FaStethoscope, 
  FaEdit, 
  FaCalendarCheck,
  FaShieldAlt,
  FaBriefcaseMedical
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialVeterinarians } from "../data/clinicData";
import NotFound from "./NotFound";

export default function VeterinarianDetail() {
  const { id } = useParams();
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const foundVet = initialVeterinarians.find(v => v.id === id);
      setVet(foundVet);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (isLoading) return <LoadingSpinner fullScreen text="Menyelaraskan berkas kredensial dokter..." />;
  if (!vet) return <NotFound />;

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-5 max-w-4xl mx-auto">
        <Link 
          to="/veterinarians" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#432C81] hover:text-[#342264] bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm transition-all duration-200"
        >
          <FaArrowLeft size={11} /> Kembali ke Kredensial Dokter
        </Link>
      </div>

      {/* Kartu Profil Utama Medis */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden max-w-4xl mx-auto transform hover:scale-[1.002] transition-all duration-300">
        
        {/* Banner Profil Atas */}
        <div className="bg-gradient-to-r from-[#432C81] to-[#58315A] p-6 sm:p-8 text-white relative">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 text-white/5 pointer-events-none">
            <FaUserMd size={200} />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg animate-pulse"></div>
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(vet.name)}&background=ffffff&color=432C81&size=150&bold=true&length=2`}
                alt={vet.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/40 shadow-xl relative z-10"
              />
            </div>
            
            <div className="flex-1 mt-2 sm:mt-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{vet.name}</h1>
                <span className={`mx-auto sm:mx-0 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit ${
                  vet.status === "Active" ? "bg-emerald-500 text-white shadow-sm shadow-emerald-700/20" : "bg-amber-500 text-white shadow-sm shadow-amber-700/20"
                }`}>
                  {vet.status === "Active" ? "● Aktif Praktik" : "○ Cuti / Izin"}
                </span>
              </div>
              
              <p className="text-white/70 text-xs font-mono font-bold tracking-widest mt-1 uppercase">ID REGISTRASI: {vet.id}</p>
              
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4">
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-white/15 border border-white/10 backdrop-blur-md text-white flex items-center gap-1.5">
                  <FaBriefcaseMedical size={11} /> {vet.specialization}
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-white/15 border border-white/10 backdrop-blur-md text-white/90 flex items-center gap-1.5 font-mono">
                  <FaShieldAlt size={11} /> STR: {vet.license}
                </span>
              </div>
            </div>

            <div className="hidden lg:block bg-white/10 border border-white/10 p-3.5 rounded-2xl backdrop-blur-md">
              <FaUserMd className="text-white text-3xl" />
            </div>
          </div>
        </div>

        {/* Konten Detail Grid */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Blok Informasi Profesional */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#432C81] mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="bg-purple-100 p-1.5 rounded-lg text-[#432C81]"><FaStethoscope size={12} /></span>
                  Spesifikasi & Kredensial
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold">Kluster Keahlian</span>
                    <span className="font-bold text-slate-800 bg-white border px-3 py-1 rounded-xl shadow-2xs text-[#432C81]">
                      {vet.specialization}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold">No. STR Resmi</span>
                    <span className="font-mono font-bold text-slate-800 bg-white border px-3 py-1 rounded-xl shadow-2xs tracking-tight">
                      {vet.license}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold">Kontrak Terhitung</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <FaCalendarAlt className="text-slate-400" /> {vet.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blok Informasi Kontak */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-[#432C81] mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
                  <span className="bg-purple-100 p-1.5 rounded-lg text-[#432C81]"><FaPhone size={12} /></span>
                  Kontak Korespondensi
                </h3>
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold">Saluran Telepon</span>
                    <span className="font-mono font-bold text-slate-800 bg-white border px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <FaPhone size={10} className="text-slate-400" /> {vet.phone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400 font-semibold">Alamat Surat Elektronik</span>
                    <span className="font-mono font-bold text-slate-800 bg-white border px-3 py-1 rounded-xl shadow-2xs flex items-center gap-1.5">
                      <FaEnvelope size={10} className="text-slate-400" /> {vet.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Panel Tombol Manajemen Aksi */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-[#432C81] to-[#58315A] hover:opacity-95 text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-purple-200/60 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
              <FaEdit size={14} /> Perbarui Kredensial Dokter
            </button>
            <button className="flex-1 border-2 border-[#432C81] text-[#432C81] hover:bg-purple-50 py-3.5 rounded-xl font-bold text-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2">
              <FaCalendarCheck size={14} /> Kelola Plotting Jadwal Shift
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}