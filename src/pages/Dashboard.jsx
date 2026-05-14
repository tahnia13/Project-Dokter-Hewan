import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaPaw, 
  FaCalendarCheck, 
  FaUsers, 
  FaHeartbeat, 
  FaDog, 
  FaCat, 
  FaUserPlus, 
  FaSyringe,
  FaUserMd,
  FaCheckCircle,
  FaSpinner,
  FaHourglassHalf,
  FaClock
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialAppointments, initialPetOwners, initialVeterinarians } from "../data/clinicData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [owners, setOwners] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setAppointments(initialAppointments);
      setOwners(initialPetOwners);
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  // ========== DATA REAL DARI PROJECT ==========
  
  // Total data
  const totalPets = pets.length;
  const totalOwners = owners.length;
  const totalVets = veterinarians.length;
  
  // Data kunjungan hari ini (dari appointments)
  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  
  // Status appointments
  const completedAppointments = appointments.filter(a => a.status === "Completed").length;
  const inProgressAppointments = appointments.filter(a => a.status === "In Progress").length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  const cancelledAppointments = appointments.filter(a => a.status === "Cancelled").length;
  
  // Data jenis hewan (dari pets)
  const dogsCount = pets.filter(p => p.type === "Dog").length;
  const catsCount = pets.filter(p => p.type === "Cat").length;
  const rabbitsCount = pets.filter(p => p.type === "Rabbit").length;
  const birdsCount = pets.filter(p => p.type === "Bird").length;
  const othersCount = pets.filter(p => !["Dog", "Cat", "Rabbit", "Bird"].includes(p.type)).length;
  
  // Daftar jenis hewan untuk "Pasien Sering Berkunjung"
  const petTypes = [
    { name: "Kucing", count: catsCount, icon: FaCat, color: "bg-orange-100 text-orange-600" },
    { name: "Anjing", count: dogsCount, icon: FaDog, color: "bg-blue-100 text-blue-600" },
    { name: "Kelinci", count: rabbitsCount, icon: FaPaw, color: "bg-pink-100 text-pink-600" },
    { name: "Burung", count: birdsCount, icon: FaHeartbeat, color: "bg-green-100 text-green-600" },
    { name: "Lainnya", count: othersCount, icon: FaPaw, color: "bg-purple-100 text-purple-600" },
  ].filter(p => p.count > 0);

  // Data kunjungan bulanan (dari appointments berdasarkan tanggal)
  const getMonthlyVisits = () => {
    const monthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    appointments.forEach(apt => {
      const month = new Date(apt.date).getMonth();
      if (month >= 0 && month < 12) {
        monthly[month]++;
      }
    });
    return monthly;
  };
  
  const monthlyVisits = getMonthlyVisits();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const maxVisit = Math.max(...monthlyVisits, 1);

  // Data jadwal hari ini (dari appointments)
  const todayScheduleList = appointments
    .filter(a => a.date === today)
    .slice(0, 5)
    .map(apt => {
      const pet = pets.find(p => p.id === apt.petId);
      const owner = owners.find(o => o.id === pet?.ownerId);
      return {
        id: apt.id,
        petName: pet?.name || "Unknown",
        petType: pet?.type || "Unknown",
        ownerName: owner?.name || "Unknown",
        status: apt.status,
        symptoms: apt.symptoms,
        time: apt.time,
        veterinarian: apt.veterinarian
      };
    });

  // Data kunjungan terbaru (dari appointments)
  const recentVisits = appointments
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map(apt => {
      const pet = pets.find(p => p.id === apt.petId);
      return {
        id: apt.id,
        petName: pet?.name || "Unknown",
        petType: pet?.type || "Unknown",
        veterinarian: apt.veterinarian,
        date: apt.date,
        status: apt.status
      };
    });

  // Status counts untuk card status
  const statusCounts = {
    completed: completedAppointments,
    inProgress: inProgressAppointments,
    queue: scheduledAppointments
  };

  // Nama dokter yang sedang bertugas (ambil dari veterinarians yang status Active)
  const activeVet = veterinarians.find(v => v.status === "Active");
  const doctorName = activeVet?.name || "Dr. Sarah Wijaya";
  const shortDoctorName = doctorName.replace("Dr. ", "");

  // Hitung persentase perubahan (simulasi)
  const yesterdayAppointments = appointments.filter(a => a.date === getYesterdayDate()).length;
  const appointmentChange = todayAppointments - yesterdayAppointments;

  // Helper untuk mendapatkan tanggal kemarin
  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  }

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="p-5">
      {/* Header Profile */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary w-12 h-12 rounded-full flex items-center justify-center">
              <FaUserMd className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 font-nunito">SELAMAT PAGI, {shortDoctorName.toUpperCase()}!</h1>
              <p className="text-sm text-gray-500 font-inter">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                {' - '} {todayAppointments} kunjungan terjadi hari ini
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800 font-nunito">{doctorName}</p>
          <p className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block">Sedang Bertugas</p>
        </div>
      </div>

      {/* Grid 2 Kolom */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card Kunjungan Hari Ini */}
          <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 font-nunito">KUNJUNGAN HARI INI</h3>
                <p className="text-3xl font-bold text-[#432C81] font-nunito">{todayAppointments}</p>
                <p className={`text-sm ${appointmentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {appointmentChange >= 0 ? `+${appointmentChange}` : appointmentChange} dari kemarin
                </p>
              </div>
              <div className="bg-[#F5F3FF] rounded-lg p-3">
                <FaCalendarCheck className="text-[#432C81] text-2xl" />
              </div>
            </div>
          </div>

          {/* Grafik Kunjungan Bulanan */}
          <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">Kunjungan Bulanan {new Date().getFullYear()}</h3>
            <div className="flex items-end gap-2 h-48">
              {monthlyVisits.slice(0, 6).map((value, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#432C81] to-[#58315A] rounded-t-lg transition-all hover:opacity-80"
                    style={{ height: `${(value / maxVisit) * 120}px`, minHeight: value > 0 ? '4px' : '0' }}
                  ></div>
                  <p className="text-xs text-gray-500 mt-2 font-inter">{months[idx]}</p>
                  <p className="text-xs font-bold text-gray-700">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pasien Sering Berkunjung */}
          <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">PASIEN SERING BERKUNJUNG</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {petTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`${type.color} p-2 rounded-full`}>
                    <type.icon className="text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{type.name}</p>
                    <p className="text-xs text-gray-500">{type.count} pasien</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (1/3) */}
        <div className="space-y-6">
          
          {/* Profil Singkat */}
          <div className="bg-gradient-primary rounded-xl p-5 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <FaPaw className="text-2xl" />
              </div>
              <div>
                <p className="font-semibold font-nunito">Paws & Care</p>
                <p className="text-xs opacity-80">ADMIN PANEL</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{doctorName}</p>
            <p className="text-xs opacity-80">Sedang Bertugas</p>
          </div>

          {/* Status Pasien */}
          <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">STATUS</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-sm font-inter">Selesai</span>
                </div>
                <span className="font-bold text-gray-800">{statusCounts.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaSpinner className="text-yellow-500 animate-spin" />
                  <span className="text-sm font-inter">Proses</span>
                </div>
                <span className="font-bold text-gray-800">{statusCounts.inProgress}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaHourglassHalf className="text-blue-500" />
                  <span className="text-sm font-inter">Antri</span>
                </div>
                <span className="font-bold text-gray-800">{statusCounts.queue}</span>
              </div>
            </div>
          </div>

          {/* Total Pasien Aktif */}
          <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5 text-center">
            <FaHeartbeat className="text-[#432C81] text-3xl mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800 font-nunito">{totalPets}</p>
            <p className="text-sm text-gray-500 font-inter">TOTAL PASIEN AKTIF</p>
            <p className="text-xs text-green-600 mt-1">+{pets.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 30*24*60*60*1000)).length} bulan ini</p>
          </div>

          {/* Antrian */}
          <div className="bg-gradient-to-r from-[#FF8989] to-[#ECBB5F] rounded-xl p-4 text-white text-center">
            <p className="text-2xl font-bold">{scheduledAppointments}</p>
            <p className="text-sm font-inter">antrian</p>
          </div>
        </div>
      </div>

      {/* Jadwal Hari Ini & Kunjungan Terbaru - Full Width */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Jadwal Hari Ini (List) */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">JADWAL HARI INI</h3>
          <div className="space-y-3">
            {todayScheduleList.length > 0 ? (
              todayScheduleList.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0">
                  <div className={`p-2 rounded-full ${
                    item.status === "Completed" ? "bg-green-100" : 
                    item.status === "In Progress" ? "bg-yellow-100" : "bg-blue-100"
                  }`}>
                    <FaHeartbeat className={`text-sm ${
                      item.status === "Completed" ? "text-green-600" : 
                      item.status === "In Progress" ? "text-yellow-600" : "text-blue-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.petName}</p>
                    <p className="text-xs text-gray-500">{item.symptoms || "Pemeriksaan rutin"} - {item.ownerName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.status === "Completed" ? "bg-green-100 text-green-600" : 
                      item.status === "In Progress" ? "bg-yellow-100 text-yellow-600" : "bg-blue-100 text-blue-600"
                    }`}>
                      {item.status === "Completed" ? "Selesai" : 
                       item.status === "In Progress" ? "Proses" : "Antri"}
                    </span>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><FaClock size={10} /> {item.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Tidak ada jadwal untuk hari ini</p>
            )}
          </div>
        </div>

        {/* Kunjungan Terbaru */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">KUNJUNGAN TERBARU</h3>
          <div className="space-y-3">
            {recentVisits.map((visit) => (
              <div key={visit.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-[#CCC3FF]/30 p-2 rounded-full">
                  <FaPaw className="text-[#432C81]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{visit.petName}</p>
                  <p className="text-xs text-gray-500">{visit.petType} - {visit.veterinarian}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-gray-400">{visit.date}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    visit.status === "Completed" ? "bg-green-100 text-green-600" : 
                    visit.status === "In Progress" ? "bg-yellow-100 text-yellow-600" : "bg-blue-100 text-blue-600"
                  }`}>
                    {visit.status === "Completed" ? "Selesai" : 
                     visit.status === "In Progress" ? "Proses" : "Dijadwalkan"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}