import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaCalendarPlus, FaEye, FaEdit, FaTrash, FaPaw, FaClock, FaUserMd, FaFilter } from "react-icons/fa";
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
    const colors = {
      Scheduled: "bg-[#CCC3FF]/50 text-[#432C81] border-[#432C81]/20",
      Completed: "bg-green-100 text-green-600 border-green-200",
      "In Progress": "bg-yellow-100 text-yellow-600 border-yellow-200",
      Cancelled: "bg-red-100 text-red-600 border-red-200"
    };
    return colors[status] || "bg-gray-100 text-gray-600 border-gray-200";
  };

  const handleDelete = (id) => {
    if (window.confirm(`Hapus janji temu ini?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newAppointments = appointments.filter(a => a.id !== id);
        setAppointments(newAppointments);
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
    <div id="appointments-page">
      <PageHeader title="Janji Temu" breadcrumb={["Dashboard", "Appointment List"]}>
        <button 
          onClick={() => navigate("/add-appointment")} 
          className="bg-gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center gap-2 font-inter"
        >
          <FaCalendarPlus size={14} /> Janji Temu Baru
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#CCC3FF]/30">
          
          <div className="p-6 border-b border-[#CCC3FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#432C81] font-nunito">Daftar Janji Temu</h2>
              <p className="text-gray-400 text-sm font-inter">Kelola jadwal konsultasi pasien</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-64">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari hewan atau pemilik..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#CCC3FF] rounded-xl focus:ring-2 focus:ring-[#432C81] outline-none transition-all font-inter"
                />
              </div>
              <div className="relative w-full sm:w-48">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#CCC3FF] rounded-xl focus:ring-2 focus:ring-[#432C81] outline-none appearance-none bg-white font-inter"
                >
                  <option value="all">Semua Status</option>
                  <option value="Scheduled">Dijadwalkan</option>
                  <option value="In Progress">Berlangsung</option>
                  <option value="Completed">Selesai</option>
                  <option value="Cancelled">Dibatalkan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F3FF] text-gray-600 text-sm uppercase border-b border-[#CCC3FF]/30">
                <tr>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">ID</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Hewan</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Pemilik</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Dokter</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Tanggal & Waktu</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Status</th>
                  <th className="p-4 font-bold text-center text-[#432C81] font-nunito">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCC3FF]/20">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#F5F3FF] transition-colors">
                    <td className="p-4 text-[#432C81] font-mono font-bold text-sm">
                      {apt.id}
                    </td>
                    <td className="p-4">
                      <Link to={`/appointments/${apt.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                          <FaPaw className="text-[#432C81]" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 hover:text-[#432C81] transition-colors">{getPetName(apt.petId)}</span>
                          <span className="text-gray-400 text-xs block">({getPetType(apt.petId)})</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-700">{getOwnerName(apt.petId, owners)}</span>
                      <span className="text-gray-400 text-xs block">{getOwnerPhone(apt.petId, owners)}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <FaUserMd className="text-[#432C81] text-sm" />
                        <span className="text-sm text-gray-700">{apt.veterinarian}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-800">{apt.date}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                        <FaClock size={10} /> {apt.time}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link to={`/appointments/${apt.id}`} className="text-blue-500 hover:text-blue-700 transition-colors" title="Detail">
                          <FaEye size={18} />
                        </Link>
                        <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(apt.id)}
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

          {filtered.length === 0 && (
            <div className="p-20 text-center">
              <FaCalendarPlus className="text-[#CCC3FF] text-6xl mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Tidak ada janji temu ditemukan.</p>
            </div>
          )}

          <div className="px-6 py-4 border-t border-[#CCC3FF]/30 flex justify-between items-center">
            <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {appointments.length} janji temu</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">Previous</button>
              <button className="px-3 py-1 bg-gradient-primary text-white rounded-lg text-sm shadow-md">1</button>
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">2</button>
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}