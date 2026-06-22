import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaPaw, FaCalendarCheck, FaUsers, FaHeartbeat, FaDog, FaCat, 
  FaUserMd, FaCheckCircle, FaSpinner, FaHourglassHalf, FaClock,
  FaSyringe, FaStethoscope, FaArrowUp, FaArrowDown, FaInfoCircle,
  FaChartPie, FaChartBar, FaChartLine
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
  const [activeTooltipIdx, setActiveTooltipIdx] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setAppointments(initialAppointments);
      setOwners(initialPetOwners);
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  // ========== DATA ==========
  const totalPets = pets.length;
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
    { name: "Kucing", count: catsCount, icon: FaCat, color: "#F59E0B" },
    { name: "Anjing", count: dogsCount, icon: FaDog, color: "#3B82F6" },
    { name: "Kelinci", count: rabbitsCount, icon: FaPaw, color: "#EC4899" },
    { name: "Burung", count: birdsCount, icon: FaHeartbeat, color: "#10B981" },
    { name: "Lainnya", count: othersCount, icon: FaPaw, color: "#8B5CF6" },
  ].filter(p => p.count > 0);

  const totalCount = petTypes.reduce((sum, d) => sum + d.count, 0);

  // Monthly data
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

  const currentMonthIndex = todayObj.getMonth();
  const currentMonthVisits = monthlyVisits[currentMonthIndex];
  const dynamicMonthIdx = currentMonthVisits > 0 ? currentMonthIndex : monthlyVisits.indexOf(Math.max(...monthlyVisits));
  
  const previousMonthVisits = dynamicMonthIdx > 0 ? monthlyVisits[dynamicMonthIdx - 1] : 0;
  const trafficTrendPercent = previousMonthVisits > 0
    ? Math.round(((monthlyVisits[dynamicMonthIdx] - previousMonthVisits) / previousMonthVisits) * 100)
    : monthlyVisits[dynamicMonthIdx] > 0 ? 100 : 0;

  const totalAppointments = appointments.length;
  const completionRate = totalAppointments > 0 ? Math.round((completedAppointments / totalAppointments) * 100) : 0;
  const cancelledAppointments = appointments.filter(a => a.status === "Cancelled").length;
  const busiestMonthIndex = monthlyVisits.indexOf(Math.max(...monthlyVisits));
  const busiestMonthLabel = `${months[busiestMonthIndex]} (${Math.max(...monthlyVisits)} Kunjungan)`;

  const activeVet = veterinarians.find(v => v.status === "Active");
  const doctorName = activeVet?.name || "Dr. Sarah Wijaya";
  const shortDoctorName = doctorName.replace("Dr. ", "");

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
  const features = [
    { icon: "🐶", title: "Perawatan Anjing", description: "Layanan kesehatan lengkap untuk anjing kesayangan Anda" },
    { icon: "🐱", title: "Perawatan Kucing", description: "Perawatan khusus untuk kucing dengan dokter spesialis" },
    { icon: "🐰", title: "Perawatan Kelinci", description: "Penanganan profesional untuk kelinci peliharaan" },
    { icon: "🦜", title: "Perawatan Burung", description: "Konsultasi kesehatan untuk burung eksotis" },
  ];

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

  // Donut Chart Segments
  const donutSegments = petTypes.map((d, idx) => {
    const percentage = (d.count / totalCount) * 100;
    const startAngle = petTypes.slice(0, idx).reduce((sum, item) => sum + (item.count / totalCount) * 100, 0) * 3.6;
    return { ...d, percentage, startAngle };
  });

  if (isLoading) return <Loading fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased text-slate-800">

      {/* ========== NAVBAR / HERO ========== */}
      <div className="mb-8">
        <HeroSection 
          title={`Selamat Datang, ${shortDoctorName}!`}
          subtitle="Kelola data pasien, jadwal konsultasi, dan layanan kesehatan hewan dengan mudah"
          buttonText="Lihat Pasien →"
          onButtonClick={() => navigate("/pets")}
        />
      </div>

      <Container>
        {/* ========== PROFILE HEADER ========== */}
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

        {/* ========== INFO MODAL ========== */}
        <div className="flex justify-center mb-8">
          <button 
            className="flex items-center gap-2 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#432C81] hover:bg-[#342264] text-white border-none py-3 px-6 transition-all duration-300 shadow-sm"
            onClick={() => document.getElementById('info_modal').showModal()}
          >
            <FaInfoCircle /> Informasi Klinik
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
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">📧 Email</span>
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

        {/* ========== 4 KPI CARDS ========== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl bg-gradient-to-br from-[#432C81] to-[#6D47B8] text-white p-6 shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Kunjungan Bulan Ini</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight">{monthlyVisits[currentMonthIndex]}</span>
              <span className="text-xs text-white/80 font-medium">Kunjungan</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/70 flex items-center justify-between">
              <span>Rata-rata Harian:</span>
              <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                {Math.round(monthlyVisits[currentMonthIndex] / 30)} / Hari
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Tingkat Penyelesaian</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#432C81] tracking-tight">{completionRate}%</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Dari total janji temu:</span>
              <span className="font-bold text-slate-700">{totalAppointments} Sesi</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Total Pembatalan</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-rose-600 tracking-tight">{cancelledAppointments}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-rose-600 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" /> Perlu evaluasi
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 hover:-translate-y-0.5 transition-all duration-300">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Puncak Traffic</p>
            <div className="text-sm font-bold text-slate-800 leading-snug mt-2 truncate">{busiestMonthLabel}</div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
              Bulan dengan volume tertinggi
            </div>
          </div>
        </div>

        {/* ========== CHART SECTION ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* DONUT CHART */}
          <div className="lg:col-span-1">
            <Card title="Komposisi Pasien">
              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {donutSegments.map((d, idx) => {
                      const startRad = (d.startAngle - 90) * Math.PI / 180;
                      const endRad = (d.startAngle + d.percentage * 3.6 - 90) * Math.PI / 180;
                      const x1 = 100 + 70 * Math.cos(startRad);
                      const y1 = 100 + 70 * Math.sin(startRad);
                      const x2 = 100 + 70 * Math.cos(endRad);
                      const y2 = 100 + 70 * Math.sin(endRad);
                      const largeArc = d.percentage > 50 ? 1 : 0;
                      
                      const pathData = `M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`;
                      
                      return (
                        <g key={idx}>
                          <path
                            d={pathData}
                            fill={d.color}
                            stroke="white"
                            strokeWidth="2"
                            className="transition-all duration-300 cursor-pointer hover:opacity-80"
                            onMouseEnter={() => setHoveredSegment(idx)}
                            onMouseLeave={() => setHoveredSegment(null)}
                            style={{
                              transform: hoveredSegment === idx ? "scale(1.03)" : "scale(1)",
                              transformOrigin: "100px 100px",
                              transition: "transform 0.3s ease"
                            }}
                          />
                          {d.percentage > 10 && (
                            <text
                              x={100 + 50 * Math.cos((startRad + endRad) / 2)}
                              y={100 + 50 * Math.sin((startRad + endRad) / 2)}
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="text-xs font-bold text-white drop-shadow-lg"
                            >
                              {Math.round(d.percentage)}%
                            </text>
                          )}
                        </g>
                      );
                    })}
                    <circle cx="100" cy="100" r="45" fill="white" />
                    <text x="100" y="95" textAnchor="middle" className="text-xl font-black text-slate-800">Total</text>
                    <text x="100" y="115" textAnchor="middle" className="text-lg font-bold text-[#432C81]">{totalCount}</text>
                  </svg>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {petTypes.map((d, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                        hoveredSegment === idx ? "bg-slate-100 scale-105" : "bg-white"
                      }`}
                      onMouseEnter={() => setHoveredSegment(idx)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span>{d.name}</span>
                      <span className="text-slate-400 font-mono">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* STACKED BAR CHART */}
          <div className="lg:col-span-2">
            <Card title="Tren Kunjungan">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-slate-600">Anjing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-slate-600">Kucing</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="flex items-end h-60 gap-2 min-w-[500px]">
                  {months.map((month, idx) => {
                    const total = monthlyDogVisits[idx] + monthlyCatVisits[idx];
                    const height = total > 0 ? (total / Math.max(...monthlyVisits)) * 200 : 4;
                    const dogH = monthlyDogVisits[idx] > 0 ? (monthlyDogVisits[idx] / Math.max(...monthlyVisits)) * 200 : 0;
                    const catH = monthlyCatVisits[idx] > 0 ? (monthlyCatVisits[idx] / Math.max(...monthlyVisits)) * 200 : 0;
                    const totalH = dogH + catH;
                    
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group">
                        <div className="relative w-full flex flex-col items-center">
                          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap z-10 pointer-events-none">
                            <div className="font-bold">{month}</div>
                            <div className="flex gap-2">
                              <span>🐕 {monthlyDogVisits[idx]}</span>
                              <span>🐈 {monthlyCatVisits[idx]}</span>
                              <span className="text-amber-300">Total: {total}</span>
                            </div>
                          </div>
                          
                          <div className="w-full relative" style={{ height: `${height}px` }}>
                            {catH > 0 && (
                              <div 
                                className="absolute bottom-0 w-full rounded-t-sm transition-all duration-500 hover:opacity-80"
                                style={{ 
                                  height: `${(catH / totalH) * 100}%`,
                                  background: "#10B981",
                                  bottom: 0
                                }}
                              />
                            )}
                            {dogH > 0 && (
                              <div 
                                className="absolute bottom-0 w-full rounded-t-sm transition-all duration-500 hover:opacity-80"
                                style={{ 
                                  height: `${(dogH / totalH) * 100}%`,
                                  background: "#3B82F6",
                                  bottom: `${(catH / totalH) * 100}%`
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium mt-2">{month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ========== LINE CHART ========== */}
        <div className="mb-8">
          <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-3">
                  <FaChartLine className="text-[#432C81] text-lg" />
                  <p className="text-sm font-bold text-slate-800">{months[dynamicMonthIdx]} — {monthlyVisits[dynamicMonthIdx]} Total Kunjungan</p>
                </div>
                <p className="text-xs text-slate-400 mt-1">Arahkan kursor pada titik grafik untuk melihat detail</p>
              </div>
              <div className={`self-start lg:self-center inline-flex items-center rounded-xl px-3.5 py-1.5 text-xs font-bold ${trafficTrendPercent >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {trafficTrendPercent >= 0 ? <FaArrowUp className="mr-1.5" /> : <FaArrowDown className="mr-1.5" />}
                {trafficTrendPercent >= 0 ? "+" : ""}{trafficTrendPercent}%
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 relative">
              {/* Tooltip Float */}
              {activeTooltipIdx !== null && (
                <div 
                  className="absolute z-20 bg-slate-900 text-white p-3 rounded-xl text-xs font-semibold shadow-xl pointer-events-none transition-all duration-150 border border-slate-700 min-w-[120px]"
                  style={{ 
                    left: `${Math.min(Math.max((40 + activeTooltipIdx * 520/11) - 60, 20), 450)}px`, 
                    top: `${Math.max((220 - 40 - (monthlyVisits[activeTooltipIdx] / maxVisit) * 140) - 80, 10)}px` 
                  }}
                >
                  <div className="text-slate-400 border-b border-slate-700 pb-1 mb-1 font-bold tracking-wide uppercase text-[10px]">
                    {months[activeTooltipIdx]}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-slate-300">Kunjungan:</span>
                    <span className="font-mono font-bold text-amber-400">{monthlyVisits[activeTooltipIdx]} Sesi</span>
                  </div>
                </div>
              )}

              <div className="w-full overflow-x-auto">
                <svg viewBox="0 0 620 220" className="w-full min-w-[500px] h-56 overflow-visible">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid */}
                  <g opacity="0.12">
                    {[0, 1, 2, 3, 4, 5].map((line) => (
                      <line key={line} x1="40" y1={40 + line * 28} x2="580" y2={40 + line * 28} stroke="#64748B" strokeDasharray="3 3" />
                    ))}
                  </g>

                  {/* Area */}
                  <path 
                    d={`M${40 + 0 * 520/11},${220 - 40} ${monthlyVisits.map((v, i) => `L${40 + i * 520/11},${220 - 40 - (v / maxVisit) * 140}`).join(" ")} L${580},${220 - 40} Z`} 
                    fill="url(#areaGradient)" 
                  />

                  {/* Line */}
                  <path 
                    d={monthlyVisits.map((v, i) => `${i === 0 ? "M" : "L"}${40 + i * 520/11},${220 - 40 - (v / maxVisit) * 140}`).join(" ")} 
                    fill="none" 
                    stroke="#7C3AED" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Points */}
                  {monthlyVisits.map((v, i) => (
                    <circle 
                      key={i} 
                      cx={40 + i * 520/11} 
                      cy={220 - 40 - (v / maxVisit) * 140} 
                      r={activeTooltipIdx === i ? "7" : "4"} 
                      fill={activeTooltipIdx === i ? "#7C3AED" : "white"} 
                      stroke="#7C3AED" 
                      strokeWidth={activeTooltipIdx === i ? "3" : "2"} 
                      className="transition-all duration-200 pointer-events-none"
                    />
                  ))}

                  {/* Labels */}
                  {months.map((month, i) => (
                    <text 
                      key={i} 
                      x={40 + i * 520/11} 
                      y="215" 
                      textAnchor="middle" 
                      fontSize="10" 
                      fontWeight={activeTooltipIdx === i ? "800" : "500"} 
                      fill={activeTooltipIdx === i ? "#7C3AED" : "#94A3B8"}
                      className="transition-colors duration-150"
                    >
                      {month}
                    </text>
                  ))}

                  {/* Hover Capture */}
                  {months.map((_, i) => {
                    const barWidth = 520 / 11;
                    return (
                      <rect
                        key={i}
                        x={i === 0 ? 40 : 40 + i * barWidth - barWidth/2}
                        y="30"
                        width={i === 0 || i === 11 ? barWidth/2 : barWidth}
                        height="170"
                        fill="transparent"
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveTooltipIdx(i)}
                        onMouseLeave={() => setActiveTooltipIdx(null)}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* ========== 3 COLUMN METRICS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">Distribusi Spesies</p>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Anjing</span>
                  <span>{dogsCount} ({Math.round((dogsCount/totalPets)*100)}%)</span>
                </div>
                <ProgressBar percentage={(dogsCount/totalPets)*100} color="info" showPercentage={false} />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Kucing</span>
                  <span>{catsCount} ({Math.round((catsCount/totalPets)*100)}%)</span>
                </div>
                <ProgressBar percentage={(catsCount/totalPets)*100} color="success" showPercentage={false} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">Keluhan Terbanyak</p>
            {(() => {
              const symptomCounts = appointments.reduce((acc, apt) => {
                const key = apt.symptoms || "Checkup";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
              }, {});
              const top = Object.entries(symptomCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
              return top.map(([symptom, count], idx) => (
                <div key={idx} className="flex justify-between items-center rounded-xl bg-slate-50 p-2.5 mb-2 border border-slate-100">
                  <p className="text-xs font-bold text-slate-700">{symptom}</p>
                  <span className="text-xs font-black text-[#432C81] bg-purple-50 px-2.5 py-1 rounded-lg">{count} Sesi</span>
                </div>
              ));
            })()}
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">Status Kunjungan</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><FaCheckCircle /> Selesai</span>
                <span className="font-mono font-bold text-emerald-700">{completedAppointments}</span>
              </div>
              <div className="flex justify-between items-center bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-amber-700"><FaSpinner className="animate-spin" /> Proses</span>
                <span className="font-mono font-bold text-amber-700">{inProgressAppointments}</span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-2.5 rounded-xl border border-blue-100">
                <span className="flex items-center gap-2 text-xs font-semibold text-blue-700"><FaHourglassHalf /> Antri</span>
                <span className="font-mono font-bold text-blue-700">{scheduledAppointments}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== RECENT VISITS & SCHEDULE ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <Card title="Kunjungan Terbaru">
              <div className="overflow-x-auto -mx-5 -my-3">
                <table className="w-full text-xs text-left text-slate-600">
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

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
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
                  🎉 Tidak ada antrean hari ini
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}