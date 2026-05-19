import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaPaw, FaCalendarCheck, FaUsers, FaHeartbeat, FaDog, FaCat, 
  FaUserMd, FaCheckCircle, FaSpinner, FaHourglassHalf, FaClock,
  FaSyringe, FaStethoscope
} from "react-icons/fa";
import Badge from "./Components/Badge";
import Loading from "./Components/Loading";
import Card from "./Components/Card";
import Table from "./Components/Table";
import Container from "./Components/Container";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
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

  // ========== DATA STATISTIK ==========
  const totalPets = pets.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const completedAppointments = appointments.filter(a => a.status === "Completed").length;
  const inProgressAppointments = appointments.filter(a => a.status === "In Progress").length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  
  // Data jenis hewan
  const dogsCount = pets.filter(p => p.type === "Dog").length;
  const catsCount = pets.filter(p => p.type === "Cat").length;
  const rabbitsCount = pets.filter(p => p.type === "Rabbit").length;
  const birdsCount = pets.filter(p => p.type === "Bird").length;
  const othersCount = pets.filter(p => !["Dog", "Cat", "Rabbit", "Bird"].includes(p.type)).length;
  
  const petTypes = [
    { name: "Kucing", count: catsCount, icon: FaCat, color: "bg-orange-100 text-orange-600" },
    { name: "Anjing", count: dogsCount, icon: FaDog, color: "bg-blue-100 text-blue-600" },
    { name: "Kelinci", count: rabbitsCount, icon: FaPaw, color: "bg-pink-100 text-pink-600" },
    { name: "Burung", count: birdsCount, icon: FaHeartbeat, color: "bg-green-100 text-green-600" },
    { name: "Lainnya", count: othersCount, icon: FaPaw, color: "bg-purple-100 text-purple-600" },
  ].filter(p => p.count > 0);

  // Data kunjungan bulanan untuk grafik
  const getMonthlyVisits = () => {
    const monthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    appointments.forEach(apt => {
      const month = new Date(apt.date).getMonth();
      if (month >= 0 && month < 12) monthly[month]++;
    });
    return monthly;
  };
  
  const monthlyVisits = getMonthlyVisits();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const maxVisit = Math.max(...monthlyVisits, 1);

  // Data jadwal hari ini
  const todayScheduleList = appointments
    .filter(a => a.date === today)
    .slice(0, 5)
    .map(apt => {
      const pet = pets.find(p => p.id === apt.petId);
      const owner = owners.find(o => o.id === pet?.ownerId);
      return {
        id: apt.id,
        petName: pet?.name || "Unknown",
        symptoms: apt.symptoms,
        time: apt.time,
        status: apt.status,
        ownerName: owner?.name || "Unknown"
      };
    });

  // Data kunjungan terbaru untuk tabel
  const recentData = appointments.slice(0, 5).map(apt => {
    const pet = pets.find(p => p.id === apt.petId);
    const owner = owners.find(o => o.id === pet?.ownerId);
    return {
      petName: pet?.name || "-",
      ownerName: owner?.name || "-",
      veterinarian: apt.veterinarian,
      date: apt.date,
      status: apt.status
    };
  });

  // Data untuk FeatureSection
  const features = [
    { icon: "🐶", title: "Perawatan Anjing", description: "Layanan kesehatan lengkap untuk anjing kesayangan Anda" },
    { icon: "🐱", title: "Perawatan Kucing", description: "Perawatan khusus untuk kucing dengan dokter spesialis" },
    { icon: "🐰", title: "Perawatan Kelinci", description: "Penanganan profesional untuk kelinci peliharaan" },
    { icon: "🦜", title: "Perawatan Burung", description: "Konsultasi kesehatan untuk burung eksotis" },
  ];

  const activeVet = veterinarians.find(v => v.status === "Active");
  const doctorName = activeVet?.name || "Dr. Sarah Wijaya";
  const shortDoctorName = doctorName.replace("Dr. ", "");

  const yesterdayAppointments = appointments.filter(a => a.date === getYesterdayDate()).length;
  const appointmentChange = todayAppointments - yesterdayAppointments;

  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  }

  const getBadgeType = (status) => {
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "danger";
    if (status === "In Progress") return "warning";
    return "primary";
  };

  const getStatusText = (status) => {
    if (status === "Completed") return "Selesai";
    if (status === "In Progress") return "Proses";
    return "Antri";
  };

  const getStatusBadge = (status) => {
    if (status === "Completed") return <Badge type="success">Selesai</Badge>;
    if (status === "In Progress") return <Badge type="warning">Proses</Badge>;
    if (status === "Cancelled") return <Badge type="danger">Batal</Badge>;
    return <Badge type="primary">Dijadwalkan</Badge>;
  };

  const recentHeaders = ["Hewan", "Pemilik", "Dokter", "Tanggal", "Status"];

  if (isLoading) return <Loading fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="p-5">
      {/* Hero Section */}
      <HeroSection 
        title={`Selamat Datang, ${shortDoctorName}!`}
        subtitle="Kelola data pasien, jadwal konsultasi, dan layanan kesehatan hewan dengan mudah"
        buttonText="Lihat Pasien"
        onButtonClick={() => navigate("/pets")}
      />

      <Container>
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
            <Badge type="success">Sedang Bertugas</Badge>
          </div>
        </div>

        {/* Data Display Component - Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card title="Total Pasien" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{totalPets}</p>
            <p className="text-sm text-gray-500">hewan terdaftar</p>
            <div className="mt-2 flex justify-center gap-2">
              <Badge type="success">+12 bulan ini</Badge>
            </div>
          </Card>

          <Card title="Kunjungan Hari Ini" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{todayAppointments}</p>
            <p className={`text-sm ${appointmentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {appointmentChange >= 0 ? `+${appointmentChange}` : appointmentChange} dari kemarin
            </p>
            <div className="mt-2 flex justify-center gap-2">
              <Badge type="warning">{scheduledAppointments} antri</Badge>
            </div>
          </Card>

          <Card title="Dokter Aktif" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{veterinarians.filter(v => v.status === "Active").length}</p>
            <p className="text-sm text-gray-500">dokter bertugas</p>
            <div className="mt-2 flex justify-center gap-2">
              <Badge type="success">Sedang Praktik</Badge>
            </div>
          </Card>

          <Card title="Tingkat Kepuasan" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">98%</p>
            <p className="text-sm text-gray-500">rating positif</p>
            <div className="mt-2 flex justify-center gap-2">
              <Badge type="info">⭐ 4.9/5</Badge>
            </div>
          </Card>
        </div>

        {/* Grafik Kunjungan Bulanan */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5 mb-8">
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

        {/* Feature Section */}
        <FeatureSection features={features} title="Layanan Kami" />

        {/* Pasien Sering Berkunjung */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5 mb-8">
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

        {/* Data Display Component - Table Kunjungan Terbaru */}
        <div className="mt-8 mb-8">
          <Card title="Kunjungan Terbaru">
            <Table headers={recentHeaders}>
              {recentData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="border border-gray-300 px-4 py-2">{item.petName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.ownerName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.veterinarian}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{getStatusBadge(item.status)}</td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>

        {/* Jadwal Hari Ini */}
        <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-5 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4 font-nunito">JADWAL HARI INI</h3>
          <div className="space-y-3">
            {todayScheduleList.length > 0 ? (
              todayScheduleList.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0">
                  <div className={`p-2 rounded-full ${item.status === "Completed" ? "bg-green-100" : item.status === "In Progress" ? "bg-yellow-100" : "bg-blue-100"}`}>
                    <FaHeartbeat className={`text-sm ${item.status === "Completed" ? "text-green-600" : item.status === "In Progress" ? "text-yellow-600" : "text-blue-600"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.petName}</p>
                    <p className="text-xs text-gray-500">{item.symptoms || "Pemeriksaan rutin"} - {item.ownerName}</p>
                  </div>
                  <div className="text-right">
                    <Badge type={getBadgeType(item.status)}>{getStatusText(item.status)}</Badge>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><FaClock size={10} /> {item.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Tidak ada jadwal untuk hari ini</p>
            )}
          </div>
        </div>

        {/* Status Ringkasan & Info Klinik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card title="Status Kunjungan">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span><FaCheckCircle className="inline text-green-500 mr-2" /> Selesai</span>
                <Badge type="success">{completedAppointments}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span><FaSpinner className="inline text-yellow-500 mr-2 animate-spin" /> Dalam Proses</span>
                <Badge type="warning">{inProgressAppointments}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span><FaHourglassHalf className="inline text-blue-500 mr-2" /> Dijadwalkan</span>
                <Badge type="primary">{scheduledAppointments}</Badge>
              </div>
            </div>
          </Card>

          <Card title="Statistik Hewan">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span><FaDog className="inline text-blue-500 mr-2" /> Anjing</span>
                <Badge type="info">{dogsCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span><FaCat className="inline text-orange-500 mr-2" /> Kucing</span>
                <Badge type="info">{catsCount}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span><FaPaw className="inline text-purple-500 mr-2" /> Lainnya</span>
                <Badge type="info">{othersCount + rabbitsCount + birdsCount}</Badge>
              </div>
            </div>
          </Card>

          <Card title="Info Klinik">
            <div className="text-center">
              <FaHeartbeat className="text-[#432C81] text-3xl mx-auto mb-2" />
              <p className="font-semibold">Paws & Care Clinic</p>
              <p className="text-xs text-gray-500">Buka: Senin - Sabtu</p>
              <p className="text-xs text-gray-500">09:00 - 17:00</p>
              <div className="mt-3">
                <Badge type="success">Buka Hari Ini</Badge>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}