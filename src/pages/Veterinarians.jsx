import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaIdCard, FaEdit, FaTrash, FaEye, FaStethoscope } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialVeterinarians } from "../data/clinicData";

export default function Veterinarians() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [veterinarians, setVeterinarians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status) => status === "Active" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600";

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus dokter "${name}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newVets = veterinarians.filter(v => v.id !== id);
        setVeterinarians(newVets);
        initialVeterinarians.length = 0;
        initialVeterinarians.push(...newVets);
        setIsDeleting(false);
        alert(`✅ Dokter ${name} berhasil dihapus!`);
      }, 500);
    }
  };

  const filtered = veterinarians.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data dokter..." />;
  if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data dokter..." />;

  return (
    <div className="space-y-5">
      <PageHeader title="Dokter Hewan" subtitle={`${veterinarians.length} Dokter Terdaftar`} breadcrumb={["Dashboard", "Dokter"]}>
        <button onClick={() => navigate("/add-veterinarian")} className="btn-primary inline-flex items-center gap-1 text-sm py-1.5 px-3"><FaPlus size={12} /> Tambah Dokter</button>
      </PageHeader>

      <div className="card p-4"><div className="relative"><FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" /><input type="text" placeholder="Cari nama dokter, spesialisasi, atau STR..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-9" /></div></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((vet) => (
          <div key={vet.id} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] p-3 border-b border-[#CCC3FF]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-2 shadow-sm"><FaUserMd className="text-[#432C81] text-base" /></div>
                  <div><h3 className="font-bold text-[#432C81] text-sm font-nunito">{vet.name}</h3><p className="text-[10px] text-gray-400">{vet.id}</p></div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${getStatusColor(vet.status)}`}>{vet.status === "Active" ? "Aktif" : "Cuti"}</span>
              </div>
            </div>
            <div className="p-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500"><FaStethoscope className="inline mr-1 text-[10px]" /> Spesialis:</span><span className="font-semibold text-gray-800">{vet.specialization}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaIdCard className="inline mr-1 text-[10px]" /> STR:</span><span className="font-mono text-gray-500 text-[10px]">{vet.license}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaPhone className="inline mr-1 text-[10px]" /> Telepon:</span><span className="font-medium text-gray-700">{vet.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaEnvelope className="inline mr-1 text-[10px]" /> Email:</span><span className="font-medium text-gray-600 text-[10px] break-all">{vet.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaCalendarAlt className="inline mr-1 text-[10px]" /> Bergabung:</span><span className="font-medium text-gray-700">{vet.joinDate}</span></div>
            </div>
            <div className="px-3 py-2 bg-[#F5F3FF] border-t border-[#CCC3FF]/30 flex gap-2">
              <button className="flex-1 btn-primary py-1 text-[10px] flex items-center justify-center gap-1"><FaEye size={10} /> Detail</button>
              <button className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-[#432C81] hover:bg-[#CCC3FF]/20"><FaEdit size={12} /></button>
              <button onClick={() => handleDelete(vet.id, vet.name)} className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-red-500 hover:bg-red-50"><FaTrash size={12} /></button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-8 text-center"><FaUserMd className="text-4xl text-[#CCC3FF] mx-auto mb-2" /><h3 className="text-base font-semibold text-[#432C81] font-nunito">Tidak ada dokter ditemukan</h3><p className="text-xs text-gray-400 mt-1">Coba dengan kata kunci yang berbeda</p></div>
      )}
    </div>
  );
}