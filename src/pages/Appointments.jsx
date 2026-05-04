import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaCalendarPlus, FaEye, FaEdit, FaTrash, FaPaw, FaClock, FaUserMd } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialAppointments, initialPets, initialPetOwners, getOwnerName, getOwnerPhone } from "../data/clinicData";

export default function Appointments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const pets = initialPets;
  const owners = initialPetOwners;

  useEffect(() => {
    setTimeout(() => {
      setAppointments(initialAppointments);
      setIsLoading(false);
    }, 500);
  }, []);

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Unknown";
  };

  const getPetType = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.type : "Unknown";
  };

  const getStatusColor = (status) => {
    const colors = { Scheduled: "bg-pink-100 text-pink-600", Completed: "bg-green-100 text-green-600", "In Progress": "bg-yellow-100 text-yellow-600", Cancelled: "bg-red-100 text-red-600" };
    return colors[status] || "bg-pink-100 text-pink-600";
  };

  const handleDelete = (id) => {
    if (window.confirm(`Hapus janji temu ini?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newAppointments = appointments.filter(a => a.id !== id);
        setAppointments(newAppointments);
        initialAppointments.length = 0;
        initialAppointments.push(...newAppointments);
        setIsDeleting(false);
        alert(`✅ Janji temu berhasil dihapus!`);
      }, 500);
    }
  };

  const filtered = appointments.filter(a => 
    (getPetName(a.petId).toLowerCase().includes(searchTerm.toLowerCase()) || 
     getOwnerName(a.petId, owners).toLowerCase().includes(searchTerm.toLowerCase())) && 
    (filterStatus === "all" || a.status === filterStatus)
  );

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data janji temu..." />;
if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data janji temu..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Janji Temu" subtitle={`${appointments.length} Total Janji Temu`} breadcrumb={["Dashboard", "Janji Temu"]}>
        <button onClick={() => navigate("/add-appointment")} className="btn-primary inline-flex items-center gap-2"><FaCalendarPlus /> Janji Temu Baru</button>
      </PageHeader>

      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="text" placeholder="Cari hewan atau pemilik..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-11" /></div>
          <div className="relative"><FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="pl-11 pr-10 py-3 border border-pink-200 rounded-xl bg-white"><option value="all">Semua ({appointments.length})</option><option value="Scheduled">Dijadwalkan ({appointments.filter(a => a.status === "Scheduled").length})</option><option value="In Progress">Berlangsung ({appointments.filter(a => a.status === "In Progress").length})</option><option value="Completed">Selesai ({appointments.filter(a => a.status === "Completed").length})</option></select></div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-pink-50 border-b border-pink-100">
              <tr><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">ID</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Hewan</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Pemilik</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Dokter</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Tanggal & Waktu</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Status</th><th className="px-4 py-3 text-left text-xs font-semibold text-pink-600">Aksi</th></tr></thead>
            <tbody className="divide-y divide-pink-50">
              {filtered.map((apt) => (<tr key={apt.id} className="hover:bg-pink-50"><td className="px-4 py-3 text-sm font-mono text-pink-600">{apt.id}</td><td className="px-4 py-3"><div className="flex items-center gap-2"><FaPaw className="text-pink-400" /><span className="font-medium text-pink-800">{getPetName(apt.petId)}</span><span className="text-xs text-pink-400">({getPetType(apt.petId)})</span></div></td><td className="px-4 py-3"><div><span className="text-sm text-pink-800">{getOwnerName(apt.petId, owners)}</span><span className="text-xs text-pink-400 block">{getOwnerPhone(apt.petId, owners)}</span></div></td><td className="px-4 py-3 text-sm text-pink-700"><FaUserMd className="inline mr-1 text-pink-400" />{apt.veterinarian}</td><td className="px-4 py-3"><div className="text-sm text-pink-800">{apt.date}</div><div className="text-xs text-pink-400 flex items-center gap-1"><FaClock /> {apt.time}</div></td><td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>{apt.status}</span></td><td className="px-4 py-3"><div className="flex gap-2"><button className="p-2 text-pink-500 hover:bg-pink-100 rounded"><FaEye /></button><button className="p-2 text-rose-500 hover:bg-rose-100 rounded"><FaEdit /></button><button onClick={() => handleDelete(apt.id)} className="p-2 text-red-500 hover:bg-red-100 rounded"><FaTrash /></button></div></td></tr>))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-pink-100 flex justify-between"><p className="text-sm text-pink-500">Menampilkan {filtered.length} dari {appointments.length} janji temu</p><div className="flex gap-2"><button className="px-3 py-1 border border-pink-200 rounded text-sm text-pink-600">Previous</button><button className="px-3 py-1 bg-gradient-primary text-white rounded text-sm">1</button><button className="px-3 py-1 border border-pink-200 rounded text-sm text-pink-600">Next</button></div></div>
      </div>
    </div>
  );
}