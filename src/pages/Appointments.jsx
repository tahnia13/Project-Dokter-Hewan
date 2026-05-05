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
    const colors = { Scheduled: "bg-[#CCC3FF]/50 text-[#432C81]", Completed: "bg-green-100 text-green-600", "In Progress": "bg-yellow-100 text-yellow-600", Cancelled: "bg-red-100 text-red-600" };
    return colors[status] || "bg-[#CCC3FF]/50 text-[#432C81]";
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
    <div className="space-y-5">
      <PageHeader title="Janji Temu" subtitle={`${appointments.length} Total Janji Temu`} breadcrumb={["Dashboard", "Janji Temu"]}>
        <button onClick={() => navigate("/add-appointment")} className="btn-primary inline-flex items-center gap-1 text-sm py-1.5 px-3"><FaCalendarPlus size={12} /> Janji Temu Baru</button>
      </PageHeader>

      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative"><FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" /><input type="text" placeholder="Cari hewan atau pemilik..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-9" /></div>
          <div className="relative"><FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="pl-9 pr-8 py-2 border border-[#CCC3FF] rounded-lg text-sm bg-white"><option value="all">Semua ({appointments.length})</option><option value="Scheduled">Dijadwalkan ({appointments.filter(a => a.status === "Scheduled").length})</option><option value="In Progress">Berlangsung ({appointments.filter(a => a.status === "In Progress").length})</option><option value="Completed">Selesai ({appointments.filter(a => a.status === "Completed").length})</option></select></div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F5F3FF] border-b border-[#CCC3FF]/30">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">ID</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Hewan</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Pemilik</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Dokter</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Tanggal & Waktu</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Status</th>
                <th className="px-3 py-2 text-left text-[10px] font-semibold text-[#432C81]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CCC3FF]/20">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#F5F3FF] transition-colors">
                  <td className="px-3 py-2 text-[11px] font-mono text-[#432C81]">{apt.id}</td>
                  <td className="px-3 py-2"><div className="flex items-center gap-1"><FaPaw className="text-[#432C81] text-[10px]" /><span className="font-medium text-gray-800 text-xs">{getPetName(apt.petId)}</span><span className="text-[9px] text-gray-400">({getPetType(apt.petId)})</span></div></td>
                  <td className="px-3 py-2"><span className="text-xs text-gray-700">{getOwnerName(apt.petId, owners)}</span></td>
                  <td className="px-3 py-2 text-xs text-gray-600"><FaUserMd className="inline mr-1 text-[#432C81] text-[10px]" />{apt.veterinarian}</td>
                  <td className="px-3 py-2"><div className="text-xs text-gray-700">{apt.date}</div><div className="text-[10px] text-gray-400 flex items-center gap-0.5"><FaClock className="text-[8px]" /> {apt.time}</div></td>
                  <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${getStatusColor(apt.status)}`}>{apt.status}</span></td>
                  <td className="px-3 py-2"><div className="flex gap-1"><button className="p-1 text-[#432C81] hover:bg-[#CCC3FF]/20 rounded"><FaEye size={11} /></button><button className="p-1 text-[#432C81] hover:bg-[#CCC3FF]/20 rounded"><FaEdit size={11} /></button><button onClick={() => handleDelete(apt.id)} className="p-1 text-red-500 hover:bg-red-100 rounded"><FaTrash size={11} /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 border-t border-[#CCC3FF]/30 flex justify-between items-center text-xs">
          <p className="text-gray-500">Menampilkan {filtered.length} dari {appointments.length}</p>
          <div className="flex gap-1"><button className="px-2 py-0.5 border border-[#CCC3FF]/30 rounded text-gray-500 text-[10px]">Previous</button><button className="px-2 py-0.5 bg-gradient-primary text-white rounded text-[10px]">1</button><button className="px-2 py-0.5 border border-[#CCC3FF]/30 rounded text-gray-500 text-[10px]">Next</button></div>
        </div>
      </div>
    </div>
  );
}