import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaPaw, FaCalendarCheck, FaUsers, FaHeartbeat, FaDog, FaCat, 
  FaUserMd, FaCheckCircle, FaSpinner, FaHourglassHalf, FaClock,
  FaSyringe, FaStethoscope, FaArrowUp, FaArrowDown, FaInfoCircle
} from "react-icons/fa";
import Badge from "./Components/Badge";
import Loading from "./Components/Loading";
import Card from "./Components/Card";
import Container from "./Components/Container";
import HeroSection from "./Components/HeroSection";
import FeatureSection from "./Components/FeatureSection";
import ProgressBar from "./Components/ProgressBar";
import { initialPets, initialAppointments, initialPetOwners, initialVeterinarians } from "../data/clinicData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [owners, setOwners] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);

  // =========================================================================
  // KUNCI PERBAIKAN: State untuk fitur hover interaktif rekap angka pada Chart
  // =========================================================================
  const [activeTooltipIdx, setActiveTooltipIdx] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setAppointments(initialAppointments);
      setOwners(initialPetOwners);
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

// ========== DATA STATISTIK (PERBAIKAN LOGIKA TAHUN) ==========
  const totalPets = pets.length;
  
  // Menggunakan tanggal hari ini berdasarkan waktu sistem browser
  const todayObj = new Date();
  const today = todayObj.toISOString().slice(0, 10);
  
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const completedAppointments = appointments.filter(a => a.status === "Completed").length;
  const inProgressAppointments = appointments.filter(a => a.status === "In Progress").length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  
  const dogsCount = pets.filter(p => p.type === "Dog").length;
  const catsCount = pets.filter(p => p.type === "Cat").length;
  const rabbitsCount = pets.filter(p => p.type === "Rabbit").length;
  const birdsCount = pets.filter(p => p.type === "Bird").length;
  const othersCount = pets.filter(p => !["Dog", "Cat", "Rabbit", "Bird"].includes(p.type)).length;
  
  const petTypes = [
    { name: "Kucing", count: catsCount, icon: FaCat, color: "bg-orange-50 text-orange-500 border border-orange-100" },
    { name: "Anjing", count: dogsCount, icon: FaDog, color: "bg-blue-50 text-blue-500 border border-blue-100" },
    { name: "Kelinci", count: rabbitsCount, icon: FaPaw, color: "bg-pink-50 text-pink-500 border border-pink-100" },
    { name: "Burung", count: birdsCount, icon: FaHeartbeat, color: "bg-emerald-50 text-emerald-500 border border-emerald-100" },
    { name: "Lainnya", count: othersCount, icon: FaPaw, color: "bg-purple-50 text-purple-500 border border-purple-100" },
  ].filter(p => p.count > 0);

  // KUNCI PERBAIKAN 1: Memastikan ekstraksi bulan aman tanpa terikat validasi tahun yang kaku
  const getMonthlyVisits = () => {
    const monthly = Array(12).fill(0);
    appointments.forEach(apt => {
      if (apt.date) {
        const month = new Date(apt.date).getMonth();
        if (month >= 0 && month < 12) monthly[month]++;
      }
    });
    return monthly;
  };
  
  const monthlyVisits = getMonthlyVisits();
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
  const maxVisit = Math.max(...monthlyVisits, 1);

  const monthlyDogVisits = Array(12).fill(0);
  const monthlyCatVisits = Array(12).fill(0);
  appointments.forEach((apt) => {
    const pet = pets.find((p) => p.id === apt.petId);
    if (apt.date) {
      const month = new Date(apt.date).getMonth();
      if (month >= 0 && month < 12) {
        if (pet?.type === "Dog") monthlyDogVisits[month] += 1;
        if (pet?.type === "Cat") monthlyCatVisits[month] += 1;
      }
    }
  });
  const maxSpeciesVisit = Math.max(...monthlyDogVisits, ...monthlyCatVisits, 1);

  // KUNCI PERBAIKAN 2: Mengambil indeks bulan aktif saat ini secara dinamis
  const currentMonthIndex = todayObj.getMonth();
  const currentMonthVisits = monthlyVisits[currentMonthIndex];
  
  // Jika bulan ini masih 0 (karena data dummy Anda menumpuk di bulan Mei), 
  // kita ganti display fallback-nya ke bulan terakhir yang memiliki transaksi data terbesar agar dashboard tidak terlihat kosong.
  const dynamicMonthIdx = currentMonthVisits > 0 ? currentMonthIndex : monthlyVisits.indexOf(maxVisit);
  
  const displayMonthVisits = monthlyVisits[dynamicMonthIdx];
  const previousMonthVisits = dynamicMonthIdx > 0 ? monthlyVisits[dynamicMonthIdx - 1] : 0;
  
  const trafficTrendPercent = previousMonthVisits > 0
    ? Math.round(((displayMonthVisits - previousMonthVisits) / previousMonthVisits) * 100)
    : displayMonthVisits > 0 ? 100 : 0;
    
  const trafficTrendLabel = `${trafficTrendPercent >= 0 ? "+" : ""}${trafficTrendPercent}%`;
  const currentMonthName = months[dynamicMonthIdx];

  const totalDogVisits = monthlyDogVisits.reduce((sum, value) => sum + value, 0);
  const totalCatVisits = monthlyCatVisits.reduce((sum, value) => sum + value, 0);

  const chartPoints = (values) => {
    const width = 600;
    const height = 220;
    const padding = 40;
    return values.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (values.length - 1);
      const y = height - padding - (value / maxSpeciesVisit) * (height - padding * 2);
      return { x, y, value };
    });
  };

  const dogPoints = chartPoints(monthlyDogVisits);
  const catPoints = chartPoints(monthlyCatVisits);

  const svgLinePath = (points) => points.map((pt, index) => `${index === 0 ? "M" : "L"}${pt.x},${pt.y}`).join(" ");
  const svgAreaPath = (points) => `M${points[0].x},${220 - 40} ${points.map((pt) => `L${pt.x},${pt.y}`).join(" ")} L${points[points.length - 1].x},${220 - 40} Z`;

  const todayScheduleList = appointments
    .filter(a => a.date === today)
    .slice(0, 5)
    .map(apt => {
      const pet = pets.find(p => p.id === apt.petId);
      const owner = owners.find(o => o.id === pet?.ownerId);
      return {
        id: apt.id,
        petName: pet?.name || "Tidak Diketahui",
        symptoms: apt.symptoms,
        time: apt.time,
        status: apt.status,
        ownerName: owner?.name || "Tidak Diketahui"
      };
    });

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

  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().slice(0, 10);
  }

  const getStatusText = (status) => {
    if (status === "Completed") return "Selesai";
    if (status === "In Progress") return "Proses";
    return "Antri";
  };

  const getStatusBadge = (status) => {
    if (status === "Completed") return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">● Selesai</span>;
    if (status === "In Progress") return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">○ Proses</span>;
    if (status === "Cancelled") return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">✕ Batal</span>;
    return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">Dijadwalkan</span>;
  };

  const recentHeaders = ["Hewan", "Pemilik", "Dokter", "Tanggal", "Status"];

  const totalAppointments = appointments.length;
  const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
  const currentMonthAppointments = appointments.filter(apt => new Date(apt.date).getMonth() === currentMonthIndex).length;
  const currentMonthDays = new Set(appointments.filter(apt => new Date(apt.date).getMonth() === currentMonthIndex).map(apt => apt.date)).size || 1;
  const averageDailyAppointments = Math.round(currentMonthAppointments / currentMonthDays);
  const cancelledAppointments = appointments.filter(a => a.status === "Cancelled").length;
  const busiestMonthIndex = monthlyVisits.indexOf(maxVisit);
  const busiestMonthLabel = `${months[busiestMonthIndex]} (${maxVisit} Kunjungan)`;
  const totalYearlyVisits = monthlyVisits.reduce((sum, value) => sum + value, 0);
  const dogShare = totalYearlyVisits ? Math.round((totalDogVisits / totalYearlyVisits) * 100) : 0;
  const catShare = totalYearlyVisits ? Math.round((totalCatVisits / totalYearlyVisits) * 100) : 0;
  
  const symptomCounts = appointments.reduce((acc, apt) => {
    const key = apt.symptoms || "Checkup";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const topSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([symptom, count]) => ({ symptom, count }));

  const recentData = appointments
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
    .map((apt) => {
      const pet = pets.find((p) => p.id === apt.petId);
      const owner = owners.find((o) => o.id === pet?.ownerId);
      return {
        petName: pet?.name || "Tidak Diketahui",
        ownerName: owner?.name || "Tidak Diketahui",
        veterinarian: apt.veterinarian || "Dokter",
        date: apt.date,
        status: apt.status,
      };
    });

  if (isLoading) return <Loading fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased text-slate-800">
      {/* Hero Section */}
      <div className="mb-8 transform hover:scale-[1.005] transition-all duration-300">
        <HeroSection 
          title={`Selamat Datang, ${shortDoctorName}!`}
          subtitle="Kelola data pasien, jadwal konsultasi, dan layanan kesehatan hewan dengan mudah"
          buttonText="Lihat Pasien →"
          onButtonClick={() => navigate("/pets")}
        />
      </div>

      <Container>
        {/* Header Profile */}
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-[#432C81] to-[#6D47B8] w-14 h-14 rounded-2xl flex items-center justify-center shadow-md shadow-purple-200">
              <FaUserMd className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">SELAMAT PAGI, {shortDoctorName.toUpperCase()}!</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2 text-slate-300">|</span> 
                <span className="text-[#432C81] font-bold">{todayAppointments} Kunjungan Hari Ini</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{doctorName}</p>
              <p className="text-[10px] text-slate-400 font-medium font-mono">ID: VET-ACTIVE</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Sedang Bertugas</span>
          </div>
        </div>

        {/* Info Klinik Trigger Button & Modal */}
        <div className="flex justify-center mb-8">
          <button 
            className="flex items-center gap-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#432C81] hover:bg-[#342264] text-white border-none py-3 px-6 transition-all duration-300 shadow-sm"
            onClick={() => document.getElementById('info_modal').showModal()}
          >
            <FaInfoCircle /> Informasi Paws & Care Clinic
          </button>
          
          <dialog id="info_modal" className="modal backdrop-blur-xs">
            <div className="modal-box bg-white text-slate-800 rounded-2xl border border-slate-200 shadow-2xl p-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="p-2.5 bg-purple-50 rounded-xl text-[#432C81]">
                  <FaHeartbeat size={20} />
                </div>
                <h3 className="font-bold text-lg text-[#432C81]">Paws & Care Veterinary</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">📍 Alamat</span>
                  <span className="font-bold text-slate-800 text-right">Jl. Merdeka No.123, Jakarta</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">📞 Telepon</span>
                  <span className="font-mono font-bold text-slate-800">(021) 1234-5678</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">⏰ Jam Operasional</span>
                  <span className="font-bold text-emerald-600">Senin - Sabtu (09:00 - 17:00)</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">🩺 Dokter Utama</span>
                  <span className="font-bold text-slate-800">{doctorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-400 font-medium">📧 Email Resmi</span>
                  <span className="font-bold text-[#432C81]">info@pawscare.com</span>
                </div>
              </div>
              <div className="modal-action mt-6">
                <form method="dialog">
                  <button className="py-2 px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wide rounded-xl border-none transition-colors">Tutup</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

        {/* 4 Top Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#432C81] to-[#6D47B8] text-white p-6 shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Kunjungan Bulan Ini</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight">{currentMonthAppointments}</span>
              <span className="text-xs text-white/80 font-medium">Kunjungan</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/70 flex items-center justify-between">
              <span>Rata-rata Harian:</span>
              <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">{averageDailyAppointments} / Hari</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 transform hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Tingkat Penyelesaian</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#432C81] tracking-tight">{completionRate}%</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Dari total janji temu:</span>
              <span className="font-bold text-slate-700">{totalAppointments} Sesi</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 transform hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Total Pembatalan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-rose-600 tracking-tight">{cancelledAppointments}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-rose-600 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" /> Perlu evaluasi antrean
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xs border border-slate-200/80 transform hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Puncak Traffic</p>
            <div className="text-sm font-bold text-slate-800 leading-snug mt-2 truncate">{busiestMonthLabel}</div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
              Bulan dengan volume tertinggi
            </div>
          </div>
        </div>

        {/* Laporan Traffic Bulanan - Chart Section */}
        <div className="mb-8">
          <Card title="Analisis Tren & Keluhan Pasien">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-medium">Arahkan kursor pada area grafik bulan untuk melihat detail angka pasien.</p>
                <p className="text-base font-bold text-slate-800 mt-1">{currentMonthName} Tahun Ini — {currentMonthVisits} Total Kunjungan</p>
              </div>
              <div className={`self-start lg:self-center inline-flex items-center rounded-xl px-3.5 py-1.5 text-xs font-bold ${trafficTrendPercent >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {trafficTrendPercent >= 0 ? <FaArrowUp className="mr-1.5" /> : <FaArrowDown className="mr-1.5" />}
                {trafficTrendLabel} dibanding bulan lalu
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* ========================================================================= */}
              {/* PERBAIKAN GRAFIK: Sekarang Interaktif dengan Box Tooltip & Garis Vertikal */}
              {/* ========================================================================= */}
              <div className="xl:col-span-2 bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-center relative">
                
                {/* HTML Float Box Tooltip Rekap Angka */}
                {activeTooltipIdx !== null && (
                  <div 
                    className="absolute z-20 bg-slate-900 text-white p-3 rounded-xl text-xs font-semibold shadow-xl pointer-events-none transition-all duration-150 border border-slate-700 min-w-[140px]"
                    style={{ 
                      left: `${Math.min(Math.max(tooltipPos.x - 70, 20), 450)}px`, 
                      top: `${Math.max(tooltipPos.y - 95, 10)}px` 
                    }}
                  >
                    <div className="text-slate-400 border-b border-slate-700 pb-1 mb-1.5 font-bold tracking-wide uppercase text-[10px]">
                      Rekap {months[activeTooltipIdx]}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center gap-4">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-blue-500" /> Anjing:
                        </span>
                        <span className="font-mono font-bold text-blue-400">{monthlyDogVisits[activeTooltipIdx]} Pasien</span>
                      </div>
                      <div className="flex justify-between items-center gap-4">
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Kucing:
                        </span>
                        <span className="font-mono font-bold text-emerald-400">{monthlyCatVisits[activeTooltipIdx]} Pasien</span>
                      </div>
                      <div className="flex justify-between items-center gap-4 border-t border-slate-800 pt-1 mt-1 text-[11px] font-bold">
                        <span className="text-slate-400">Total:</span>
                        <span className="font-mono text-amber-400">{monthlyDogVisits[activeTooltipIdx] + monthlyCatVisits[activeTooltipIdx]} Sesi</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full relative overflow-x-auto">
                  <svg viewBox="0 0 620 220" className="w-full min-w-[500px] h-56 overflow-visible">
                    <defs>
                      <linearGradient id="lineGradientDog" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGradientCat" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid Background */}
                    <g opacity="0.12">
                      {[0, 1, 2, 3, 4, 5].map((line) => (
                        <line key={line} x1="40" y1={40 + line * 28} x2="580" y2={40 + line * 28} stroke="#64748B" strokeDasharray="3 3" />
                      ))}
                    </g>

                    {/* Garis Bantu Indikator Vertikal saat Hover */}
                    {activeTooltipIdx !== null && dogPoints[activeTooltipIdx] && (
                      <line 
                        x1={dogPoints[activeTooltipIdx].x} 
                        y1="40" 
                        x2={dogPoints[activeTooltipIdx].x} 
                        y2="180" 
                        stroke="#94A3B8" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                        className="transition-all duration-150"
                      />
                    )}

                    {/* Path Area & Line */}
                    <path d={svgAreaPath(catPoints)} fill="url(#lineGradientCat)" />
                    <path d={svgAreaPath(dogPoints)} fill="url(#lineGradientDog)" />
                    <path d={svgLinePath(catPoints)} fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d={svgLinePath(dogPoints)} fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Lingkaran Titik Data Kucing */}
                    {catPoints.map((point, idx) => (
                      <circle 
                        key={`cat-${idx}`} 
                        cx={point.x} 
                        cy={point.y} 
                        r={activeTooltipIdx === idx ? "6" : "4"} 
                        fill={activeTooltipIdx === idx ? "#10B981" : "#FFFFFF"} 
                        stroke="#10B981" 
                        strokeWidth={activeTooltipIdx === idx ? "3" : "2.5"} 
                        className="transition-all duration-150 pointer-events-none"
                      />
                    ))}
                    
                    {/* Lingkaran Titik Data Anjing */}
                    {dogPoints.map((point, idx) => (
                      <circle 
                        key={`dog-${idx}`} 
                        cx={point.x} 
                        cy={point.y} 
                        r={activeTooltipIdx === idx ? "6" : "4"} 
                        fill={activeTooltipIdx === idx ? "#2563EB" : "#FFFFFF"} 
                        stroke="#2563EB" 
                        strokeWidth={activeTooltipIdx === idx ? "3" : "2.5"} 
                        className="transition-all duration-150 pointer-events-none"
                      />
                    ))}
                    
                    {/* Label Bulan Sumbu X */}
                    {months.map((month, idx) => (
                      <text 
                        key={month} 
                        x={40 + (idx * 520) / 11} 
                        y="212" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fontWeight={activeTooltipIdx === idx ? "800" : "600"} 
                        fill={activeTooltipIdx === idx ? "#432C81" : "#94A3B8"}
                        className="transition-colors duration-150"
                      >
                        {month}
                      </text>
                    ))}

                    {/* Area Tangkapan Deteksi Kursor Mouse (Invisible Hover Capturers) */}
                    {months.map((_, idx) => {
                      const barWidth = 520 / 11;
                      const xPos = 40 + (idx * barWidth) - (barWidth / 2);
                      return (
                        <rect
                          key={`capture-${idx}`}
                          x={idx === 0 ? 40 : xPos}
                          y="30"
                          width={idx === 0 || idx === 11 ? barWidth / 2 : barWidth}
                          height="160"
                          fill="transparent"
                          className="cursor-pointer"
                          onMouseEnter={(e) => {
                            setActiveTooltipIdx(idx);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const containerRect = e.currentTarget.closest('.relative').getBoundingClientRect();
                            setTooltipPos({
                              x: rect.left - containerRect.left + (rect.width / 2),
                              y: dogPoints[idx] ? dogPoints[idx].y : 100
                            });
                          }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const containerRect = e.currentTarget.closest('.relative').getBoundingClientRect();
                            setTooltipPos(prev => ({
                              ...prev,
                              x: rect.left - containerRect.left + (rect.width / 2)
                            }));
                          }}
                          onMouseLeave={() => setActiveTooltipIdx(null)}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>
              {/* ========================================================================= */}

              {/* Progress & Top Symptoms */}
              <div className="flex flex-col justify-between gap-4">
                <div className="space-y-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-200/60">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> Rasio Anjing</span>
                      <span>{dogShare}%</span>
                    </div>
                    <ProgressBar label="Persentase Anjing" percentage={dogShare} color="info" showPercentage={false} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" /> Rasio Kucing</span>
                      <span>{catShare}%</span>
                    </div>
                    <ProgressBar label="Persentase Kucing" percentage={catShare} color="success" showPercentage={false} />
                  </div>
                </div>

                <div className="bg-purple-50/40 rounded-2xl p-4 border border-purple-100 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#432C81] mb-3">3 Keluhan Tertinggi</p>
                  <div className="space-y-2.5">
                    {topSymptoms.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center rounded-xl bg-white p-2.5 border border-purple-100 shadow-3xs hover:scale-[1.02] transition-transform">
                        <div>
                          <p className="text-xs font-bold text-slate-700">{item.symptom}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Kasus Terbanyak ke-{idx+1}</p>
                        </div>
                        <span className="text-xs font-black text-[#432C81] bg-purple-50 px-2.5 py-1 rounded-lg">{item.count} Sesi</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Feature Section */}
        <div className="mb-8">
          <FeatureSection features={features} title="Layanan Unggulan Kami" />
        </div>

        {/* Segmentasi Populasi Pasien */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 mb-8">
          <div className="border-b border-slate-100 pb-4 mb-5">
            <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Segmentasi Populasi Pasien</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Jumlah persebaran total jenis ras hewan peliharaan aktif terdaftar</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {petTypes.map((type, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4 bg-slate-50/60 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm hover:border-purple-200 transition-all duration-300">
                <div className={`${type.color} p-3 rounded-xl mb-3 text-lg shadow-3xs`}>
                  <type.icon />
                </div>
                <p className="font-bold text-sm text-slate-700">{type.name}</p>
                <p className="text-xs font-bold text-[#432C81] bg-purple-50 px-2.5 py-0.5 rounded-full mt-1.5">{type.count} Pasien</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dua Kolom Bawah: Kunjungan Terbaru & Jadwal Hari ini */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
          {/* Table Kunjungan Terbaru */}
          <div className="lg:col-span-2">
            <Card title="Riwayat Kunjungan Terbaru">
              <div className="overflow-x-auto -mx-5 -my-3">
                <table className="table w-full text-xs text-left text-slate-600">
                  <thead className="text-[10px] uppercase bg-slate-50/80 text-slate-500 border-b border-slate-100">
                    <tr>
                      {recentHeaders.map((h, i) => (
                        <th key={i} className="px-5 py-3 font-bold tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-purple-50/10 transition-colors">
                        <td className="px-5 py-3.5 font-bold text-slate-800">{item.petName}</td>
                        <td className="px-5 py-3.5 text-slate-500 font-medium">{item.ownerName}</td>
                        <td className="px-5 py-3.5 text-slate-500 font-medium">{item.veterinarian}</td>
                        <td className="px-5 py-3.5 font-mono text-slate-400 font-bold">{item.date}</td>
                        <td className="px-5 py-3.5">{getStatusBadge(item.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Antrean Hari Ini */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-5">
            <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Antrean Hari Ini</h3>
                <p className="text-[11px] text-slate-400 font-medium">Jadwal konsultasi terdekat</p>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">{todayScheduleList.length} Antrean</span>
            </div>
            
            <div className="space-y-3">
              {todayScheduleList.length > 0 ? (
                todayScheduleList.map((item) => (
                  <div key={item.id} className="group p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:shadow-xs hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl text-md mt-0.5 shrink-0 ${item.status === "Completed" ? "bg-emerald-50 text-emerald-500" : item.status === "In Progress" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"}`}>
                        <FaHeartbeat />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800 leading-none group-hover:text-[#432C81] transition-colors">{item.petName}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-1.5 truncate max-w-[150px]">{item.symptoms || "Pemeriksaan rutin"}</p>
                        <p className="text-[10px] text-[#432C81] font-bold mt-0.5">Owner: {item.ownerName}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {getStatusText(item.status)}
                      </span>
                      <p className="text-[10px] font-mono font-bold text-slate-400 flex items-center gap-1"><FaClock size={9} /> {item.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs font-medium">
                  🎉 Hebat! Tidak ada sisa antrean untuk hari ini
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Status Ringkasan Tambahan di Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="Status Kedatangan">
            <div className="space-y-3 text-xs font-bold text-slate-600">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center"><FaCheckCircle className="text-emerald-500 mr-2" /> Selesai Diperiksa</span>
                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-md font-mono">{completedAppointments}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center"><FaSpinner className="text-amber-500 mr-2 animate-spin" /> Di Ruang Konsultasi</span>
                <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-md font-mono">{inProgressAppointments}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center"><FaHourglassHalf className="text-blue-500 mr-2" /> Menunggu Antrean</span>
                <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-md font-mono">{scheduledAppointments}</span>
              </div>
            </div>
          </Card>

          <Card title="Statistik Spesies Utama">
            <div className="space-y-3 text-xs font-bold text-slate-600">
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center"><FaDog className="text-blue-500 mr-2" /> Ras Anjing</span>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md font-mono">{dogsCount}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="flex items-center"><FaCat className="text-orange-500 mr-2" /> Ras Kucing</span>
                <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md font-mono">{catsCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}