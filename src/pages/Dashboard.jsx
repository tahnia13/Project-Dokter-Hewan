import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw, FaCalendarCheck, FaUsers, FaHeartbeat, FaDog, FaCat, FaArrowRight, FaChartLine, FaStar, FaUserPlus, FaSyringe } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialAppointments, initialPetOwners } from "../data/clinicData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      setPets(initialPets);
      setAppointments(initialAppointments);
      setOwners(initialPetOwners);
      setIsLoading(false);
    }, 500);
  }, []);

  // Hitung statistik
  const totalPets = pets.length;
  const totalOwners = owners.length;
  const today = new Date().toISOString().slice(0,10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  const dogsCount = pets.filter(p => p.type === "Dog").length;
  const catsCount = pets.filter(p => p.type === "Cat").length;
  const rabbitsCount = pets.filter(p => p.type === "Rabbit").length;
  const todaySchedule = appointments.filter(a => a.date === today).slice(0,4);

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Unknown";
  };

  const stats = [
    { label: "Total Pasien", value: totalPets, change: "+12%", icon: FaPaw, bg: "bg-pink-50", color: "text-pink-600" },
    { label: "Pemilik Hewan", value: totalOwners, change: "+8%", icon: FaUsers, bg: "bg-purple-50", color: "text-purple-600" },
    { label: "Janji Temu Hari Ini", value: todayAppointments, change: "+3", icon: FaCalendarCheck, bg: "bg-rose-50", color: "text-rose-600" },
    { label: "Total Janji Temu", value: appointments.length, change: scheduledAppointments + " terjadwal", icon: FaSyringe, bg: "bg-blue-50", color: "text-blue-600" },
  ];

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Selamat datang di Paws & Care Veterinary Clinic" breadcrumb={["Dashboard"]}>
        <button onClick={() => navigate("/add-appointment")} className="btn-primary inline-flex items-center gap-2"><FaUserPlus /> Janji Temu Baru</button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-5 hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between">
              <div><p className="text-pink-500 text-sm mb-1">{stat.label}</p><p className="text-3xl font-bold text-pink-800">{stat.value}</p><p className="text-xs text-pink-500 mt-1">{stat.change}</p></div>
              <div className={`rounded-2xl p-3 ${stat.bg}`}><stat.icon className={`text-2xl ${stat.color}`} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6"><div><h3 className="text-lg font-bold text-pink-800">Demografi Pasien</h3><p className="text-sm text-pink-500">Distribusi jenis hewan</p></div><FaChartLine className="text-pink-400" /></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-pink-50"><div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><FaDog className="text-pink-500 text-xl" /></div><p className="text-2xl font-bold text-pink-800">{dogsCount}</p><p className="text-sm text-pink-600">Dogs</p><div className="mt-2 h-1.5 bg-pink-200 rounded-full"><div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: `${totalPets ? (dogsCount/totalPets)*100 : 0}%` }}></div></div></div>
            <div className="text-center p-4 rounded-xl bg-rose-50"><div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><FaCat className="text-rose-500 text-xl" /></div><p className="text-2xl font-bold text-pink-800">{catsCount}</p><p className="text-sm text-pink-600">Cats</p><div className="mt-2 h-1.5 bg-pink-200 rounded-full"><div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" style={{ width: `${totalPets ? (catsCount/totalPets)*100 : 0}%` }}></div></div></div>
            <div className="text-center p-4 rounded-xl bg-purple-50"><div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"><FaPaw className="text-purple-500 text-xl" /></div><p className="text-2xl font-bold text-pink-800">{rabbitsCount}</p><p className="text-sm text-pink-600">Rabbits</p><div className="mt-2 h-1.5 bg-pink-200 rounded-full"><div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: `${totalPets ? (rabbitsCount/totalPets)*100 : 0}%` }}></div></div></div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg"><div className="flex items-center justify-between mb-4"><FaStar className="text-3xl text-yellow-300" /><span className="text-xs bg-white/20 px-2 py-1 rounded-full">Today</span></div><p className="text-4xl font-bold">{scheduledAppointments ? Math.round((todayAppointments/scheduledAppointments)*100) : 0}%</p><p className="text-sm opacity-90 mt-1">Clinic Occupancy Rate</p><div className="mt-4 h-2 bg-white/20 rounded-full"><div className="h-full bg-white rounded-full" style={{ width: `${scheduledAppointments ? Math.round((todayAppointments/scheduledAppointments)*100) : 0}%` }}></div></div></div>
          <QuickActionCard title="Quick Checkup" description="Mulai pemeriksaan pasien baru" buttonText="Begin Checkup" icon={FaHeartbeat} onClick={() => navigate("/add-pet")} />
        </div>
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-6"><div><h3 className="text-lg font-bold text-pink-800">Jadwal Hari Ini</h3><p className="text-sm text-pink-500">Janji temu untuk hari ini</p></div><button onClick={() => navigate("/appointments")} className="text-pink-500 text-sm font-semibold hover:underline flex items-center gap-1">Lihat Semua <FaArrowRight className="text-xs" /></button></div>
        {todaySchedule.length > 0 ? (<div className="space-y-3">{todaySchedule.map((apt) => (<div key={apt.id} className="flex items-center justify-between p-4 rounded-xl bg-pink-50 hover:bg-pink-100 transition-all"><div className="flex items-center gap-4"><div className="bg-pink-100 p-3 rounded-full"><FaHeartbeat className="text-pink-500" /></div><div><p className="font-semibold text-pink-800">{getPetName(apt.petId)}</p><p className="text-xs text-pink-500">{apt.veterinarian} • {apt.symptoms?.slice(0,30)}</p></div></div><span className="text-sm font-semibold px-3 py-1 rounded-full bg-white text-pink-600 shadow-sm">{apt.time}</span></div>))}</div>) : (<div className="text-center py-8"><FaCalendarCheck className="text-4xl text-pink-300 mx-auto mb-2" /><p className="text-pink-500">Tidak ada jadwal untuk hari ini</p></div>)}
      </div>
    </div>
  );
}