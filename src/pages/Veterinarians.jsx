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
if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data dokter..." />
  return (
    <div className="space-y-6">
      <PageHeader title="Dokter Hewan" subtitle={`${veterinarians.length} Dokter Terdaftar`} breadcrumb={["Dashboard", "Dokter"]}>
        <button onClick={() => navigate("/add-veterinarian")} className="btn-primary inline-flex items-center gap-2"><FaPlus /> Tambah Dokter</button>
      </PageHeader>

      <div className="card p-5"><div className="relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="text" placeholder="Cari nama dokter, spesialisasi, atau STR..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-11" /></div></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((vet) => (
          <div key={vet.id} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 border-b border-pink-100"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="bg-white rounded-full p-3 shadow-sm"><FaUserMd className="text-pink-500 text-2xl" /></div><div><h3 className="font-bold text-pink-800 text-lg">{vet.name}</h3><p className="text-xs text-pink-400">{vet.id}</p></div></div><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vet.status)}`}>{vet.status === "Active" ? "Aktif" : "Cuti"}</span></div></div>
            <div className="p-5 space-y-3"><div className="flex justify-between text-sm border-b border-pink-50 pb-2"><span className="text-pink-500"><FaStethoscope className="inline mr-1" /> Spesialis:</span><span className="font-semibold text-pink-800">{vet.specialization}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaIdCard className="inline mr-1" /> STR:</span><span className="font-medium text-pink-700 font-mono text-xs">{vet.license}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaPhone className="inline mr-1" /> Telepon:</span><span className="font-medium text-pink-800">{vet.phone}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaEnvelope className="inline mr-1" /> Email:</span><span className="font-medium text-pink-800 text-sm break-all">{vet.email}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaCalendarAlt className="inline mr-1" /> Bergabung:</span><span className="font-medium text-pink-800">{vet.joinDate}</span></div></div>
            <div className="px-5 py-3 bg-pink-50 border-t border-pink-100 flex gap-2"><button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"><FaEye size={12} /> Detail</button><button className="p-2 border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100"><FaEdit /></button><button onClick={() => handleDelete(vet.id, vet.name)} className="p-2 border border-pink-200 rounded-lg text-red-500 hover:bg-red-50"><FaTrash /></button></div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-12 text-center"><FaUserMd className="text-6xl text-pink-300 mx-auto mb-4" /><h3 className="text-xl font-semibold text-pink-600">Tidak ada dokter ditemukan</h3><p className="text-pink-400 mt-2">Coba dengan kata kunci yang berbeda</p></div>
      )}
    </div>
  );
}