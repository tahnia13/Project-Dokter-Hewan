import { useNavigate } from "react-router-dom";
import {
  FaPaw,
  FaStar,
  FaUserMd,
  FaUserPlus,
  FaCrown,
  FaAward,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaShieldVirus,
  FaBuilding,
  FaHandsHelping,
  FaClock,
  FaArrowUp,
  FaFire,
  FaPercent,
  FaGift,
  FaTrophy,
  FaDog,
  FaSyringe,
  FaStethoscope,
  FaTooth,
  FaBolt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaCalendarAlt,
  FaMagic,
  FaHeartbeat,
  FaGem,
  FaInfinity,
} from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {
  initialPets,
  initialAppointments,
  initialPetOwners,
  initialVeterinarians,
} from "../data/clinicData";

/* ─── Design Tokens ─── */
const tokens = {
  bg: "#07071A",
  surface: "#0F0F2E",
  card: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  violet: "#7C3AED",
  violetLight: "#A78BFA",
  gold: "#F59E0B",
  goldLight: "#FCD34D",
  rose: "#F43F5E",
  cyan: "#06B6D4",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textFaint: "#475569",
};

/* ─── Components ─── */

// Glass Card
const GlassCard = ({ children, className = "", hover = true }) => (
  <div
    className={`relative backdrop-blur-xl border rounded-3xl transition-all duration-500 ${
      hover ? "hover:-translate-y-2 hover:border-violet-500/30" : ""
    } ${className}`}
    style={{
      background: tokens.card,
      borderColor: tokens.border,
    }}
  >
    {children}
  </div>
);

// Badge
const Badge = ({ children, color = "violet" }) => {
  const colors = {
    violet: "from-violet-600/80 to-purple-700/80 text-violet-100",
    gold: "from-amber-500/80 to-yellow-600/80 text-amber-100",
    rose: "from-rose-500/80 to-pink-600/80 text-rose-100",
    cyan: "from-cyan-500/80 to-teal-600/80 text-cyan-100",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${colors[color]} backdrop-blur-md text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase border border-white/10 shadow-lg`}
    >
      {children}
    </span>
  );
};

// Gradient Button
const GradientButton = ({ children, onClick, icon: Icon, className = "" }) => (
  <button
    onClick={onClick}
    className={`group relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] ${className}`}
    style={{
      background: "linear-gradient(135deg, #7C3AED, #9333EA)",
    }}
  >
    <span className="relative z-10 flex items-center gap-3">
      {Icon && <Icon className="text-lg group-hover:rotate-12 transition-transform duration-300" />}
      {children}
    </span>
    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </button>
);

export default function LandingPage() {
  const navigate = useNavigate();
  const [pets] = useState(initialPets);
  const [appointments] = useState(initialAppointments);
  const [owners] = useState(initialPetOwners);
  const [veterinarians] = useState(initialVeterinarians);
  const [isVisible, setIsVisible] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePromo, setActivePromo] = useState(null);
  const sectionRefs = useRef({});

  const totalPets = pets.length;
  const totalOwners = owners.length;
  const totalVets = veterinarians.filter((v) => v.status === "Active").length;
  const goldMembers = owners.filter((o) => o.totalVisits >= 10).length;
  const silverMembers = owners.filter(
    (o) => o.totalVisits >= 5 && o.totalVisits < 10
  ).length;
  const bronzeMembers = owners.filter(
    (o) => o.totalVisits >= 1 && o.totalVisits < 5
  ).length;
  const newMembers = owners.filter((o) => o.totalVisits === 0).length;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setScrolled(window.scrollY > 20);
      Object.keys(sectionRefs.current).forEach((key) => {
        const el = sectionRefs.current[key];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.82)
            setIsVisible((prev) => ({ ...prev, [key]: true }));
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const registerRef = (el, key) => {
    if (el) sectionRefs.current[key] = el;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const animCls = (key) =>
    `transition-all duration-700 ease-out ${
      isVisible[key] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
    }`;

  const promos = [
    {
      id: 1,
      title: "Vaksinasi Gratis",
      desc: "50 pendaftar pertama mendapatkan vaksinasi lengkap tanpa biaya.",
      icon: FaSyringe,
      accent: "#10B981",
      deadline: "Berakhir 30 Juni 2026",
      badge: "🔥 Terbatas",
    },
    {
      id: 2,
      title: "Diskon 50% Grooming",
      desc: "Paket grooming premium untuk semua member baru klinik.",
      icon: FaPercent,
      accent: "#7C3AED",
      deadline: "Berakhir 15 Juli 2026",
      badge: "⚡ Spesial",
    },
    {
      id: 3,
      title: "Konsultasi Gratis",
      desc: "Konsultasi dokter hewan pertama Anda sepenuhnya gratis.",
      icon: FaUserMd,
      accent: "#06B6D4",
      deadline: "Sepanjang 2026",
      badge: "✨ Klaim",
    },
    {
      id: 4,
      title: "Paket 3 Bulan",
      desc: "Perawatan komprehensif 3 bulan hanya Rp 500.000 — hemat 40%.",
      icon: FaGift,
      accent: "#F59E0B",
      deadline: "Berakhir 31 Agt 2026",
      badge: "💎 Hemat",
    },
    {
      id: 5,
      title: "Reward Kunjungan",
      desc: "Hadiah eksklusif otomatis untuk setiap kelipatan 10 kunjungan.",
      icon: FaTrophy,
      accent: "#F43F5E",
      deadline: "Sepanjang 2026",
      badge: "🏆 Loyal",
    },
    {
      id: 6,
      title: "Bundling Vaksin",
      desc: "Free grooming 1x saat Anda membeli paket vaksinasi lengkap.",
      icon: FaDog,
      accent: "#EC4899",
      deadline: "Berakhir 30 Sep 2026",
      badge: "🎀 Bundle",
    },
  ];

  const memberTiers = [
    {
      tier: "Gold",
      icon: FaCrown,
      req: "10+ Kunjungan",
      gradient: "from-amber-400 to-yellow-500",
      glow: "rgba(251,191,36,0.25)",
      benefits: [
        "Vaksinasi gratis 1× per tahun",
        "Diskon 20% semua layanan",
        "Prioritas booking dokter",
        "Hadiah ulang tahun pet",
        "Free grooming 1× per tahun",
      ],
    },
    {
      tier: "Silver",
      icon: FaGem,
      req: "5–9 Kunjungan",
      gradient: "from-slate-300 to-slate-400",
      glow: "rgba(148,163,184,0.2)",
      benefits: [
        "Diskon 10% semua layanan",
        "Prioritas booking",
        "Konsultasi gratis 1× per tahun",
        "Notifikasi promo eksklusif",
      ],
    },
    {
      tier: "Bronze",
      icon: FaShieldAlt,
      req: "1–4 Kunjungan",
      gradient: "from-amber-600 to-amber-700",
      glow: "rgba(217,119,6,0.2)",
      benefits: [
        "Konsultasi gratis pertama",
        "Promo eksklusif member",
        "Rekam medis digital",
      ],
    },
  ];

  const services = [
    {
      icon: FaStethoscope,
      title: "Konsultasi Dokter",
      desc: "Pemeriksaan menyeluruh oleh dokter hewan spesialis berpengalaman.",
      accent: "#7C3AED",
    },
    {
      icon: FaSyringe,
      title: "Vaksinasi Lengkap",
      desc: "Perlindungan maksimal dari penyakit berbahaya dengan jadwal vaksin terstruktur.",
      accent: "#10B981",
    },
    {
      icon: FaTooth,
      title: "Perawatan Gigi",
      desc: "Scaling, polishing, dan perawatan kesehatan rongga mulut hewan.",
      accent: "#06B6D4",
    },
    {
      icon: FaBolt,
      title: "IGD 24/7",
      desc: "Layanan gawat darurat medis siap siaga sepanjang waktu, setiap hari.",
      accent: "#F43F5E",
    },
  ];

  const reasons = [
    {
      icon: FaShieldVirus,
      title: "Dokter Bersertifikat",
      desc: "Tim dokter terlatih dengan sertifikasi resmi dan pengalaman bertahun-tahun.",
    },
    {
      icon: FaBuilding,
      title: "Fasilitas Modern",
      desc: "Peralatan medis mutakhir dalam ruangan steril berstandar internasional.",
    },
    {
      icon: FaHandsHelping,
      title: "Penanganan Penuh Kasih",
      desc: "Setiap anggota tim terlatih khusus dalam penanganan hewan dengan empati tinggi.",
    },
    {
      icon: FaClock,
      title: "Reservasi Fleksibel",
      desc: "Sistem booking online — pilih jadwal, dokter, dan layanan dari mana saja.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: FaUserPlus,
      title: "Buat Akun",
      desc: "Daftarkan akun Anda dan tambahkan profil hewan peliharaan.",
    },
    {
      number: "02",
      icon: FaCalendarAlt,
      title: "Booking Janji",
      desc: "Pilih layanan, dokter pilihan, dan waktu yang paling nyaman.",
    },
    {
      number: "03",
      icon: FaHeartbeat,
      title: "Kunjungi Klinik",
      desc: "Datang dan nikmati penanganan profesional dari tim kami.",
    },
    {
      number: "04",
      icon: FaGift,
      title: "Nikmati Reward",
      desc: "Kumpulkan poin kunjungan dan klaim benefit member eksklusif!",
    },
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      pet: "Luna — Golden Retriever",
      text: "Dokternya sangat sabar dan detail menjelaskan kondisi Luna. Klinik terbaik yang pernah saya kunjungi.",
      rating: 5,
      initials: "BS",
    },
    {
      name: "Siti Aminah",
      pet: "Mochi — Persian Cat",
      text: "Mochi biasanya stres ke dokter hewan, tapi di sini langsung tenang. Lingkungannya sangat nyaman.",
      rating: 5,
      initials: "SA",
    },
    {
      name: "Agus Wijaya",
      pet: "Rocky — Bulldog",
      text: "Benefit member Gold-nya nyata banget — vaksin gratis dan diskon tiap kunjungan. Worth it 100%.",
      rating: 5,
      initials: "AW",
    },
    {
      name: "Dewi Lestari",
      pet: "Coco — Rabbit",
      text: "IGD-nya responsif dan cepat saat kondisi darurat malam hari. Kami sangat berterima kasih.",
      rating: 5,
      initials: "DL",
    },
  ];

  const faqs = [
    {
      q: "Apa itu program loyalty member Paws & Care?",
      a: "Program gratis untuk mengapresiasi Anda yang rutin menjaga kesehatan hewan — berupa tier, diskon, dan reward otomatis sesuai jumlah kunjungan.",
    },
    {
      q: "Bagaimana cara menjadi member?",
      a: "Otomatis terdaftar sebagai Bronze setelah membuat akun dan menyelesaikan kunjungan medis pertama.",
    },
    {
      q: "Apakah vaksin gratis berlaku selamanya?",
      a: "Vaksin gratis 1× per tahun khusus member Gold selama status Gold aktif.",
    },
    {
      q: "Bagaimana sistem naik tingkatan (tier up)?",
      a: "Sistem otomatis memperbarui tier Anda segera setelah akumulasi kunjungan memenuhi syarat tier berikutnya.",
    },
  ];

  return (
    <div
      className="min-h-screen font-sans antialiased overflow-x-hidden"
      style={{ background: tokens.bg, color: tokens.text }}
    >
      {/* ── Ambient Background Blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-20 blur-[120px]"
          style={{ background: tokens.violet }}
        />
        <div
          className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] rounded-full opacity-10 blur-[100px]"
          style={{ background: tokens.cyan }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: tokens.gold }}
        />
      </div>

      {/* ════════════════════════════════════════ */}
      {/* AREA TOP: NAVBAR & HERO */}
      {/* ════════════════════════════════════════ */}

      {/* ─── NAVBAR ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[999] w-full border-b transition-all duration-300"
        style={{
          background: scrolled ? "#0F0F2E" : "rgba(15,15,46,0.85)",
          borderColor: scrolled
            ? "rgba(124,58,237,0.3)"
            : "rgba(124,58,237,0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          padding: scrolled ? "10px 24px" : "14px 24px",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s ease",
          minHeight: "70px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container mx-auto flex justify-between items-center max-w-7xl px-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-xl blur-md opacity-80"
                style={{ background: tokens.violet }}
              />
              <div
                className="relative p-2.5 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                }}
              >
                <FaPaw className="text-white text-xl" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight text-white hidden sm:block">
              Paws<span style={{ color: "#A78BFA" }}>&</span>Care
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: "Beranda", id: "home" },
              { label: "Layanan", id: "services" },
              { label: "Keunggulan", id: "why-us" },
              { label: "Member", id: "member-benefits" },
              { label: "Testimoni", id: "testimonials" },
              { label: "FAQ", id: "faq" },
            ].map((m, i) => (
              <button
                key={i}
                onClick={m.id === "home" ? scrollToTop : () => scrollTo(m.id)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer text-white/80 hover:text-white hover:bg-white/10"
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => navigate("/login")}
              className="text-white/80 hover:text-white text-sm font-semibold transition-colors cursor-pointer px-4 py-2 rounded-xl hover:bg-white/10"
            >
              Login
            </button>
            <GradientButton
              onClick={() => navigate("/register")}
              className="text-sm px-5 py-2.5"
              icon={FaRocket}
            >
              Daftar
            </GradientButton>
            <button
              onClick={() => navigate("/member")}
              className="text-[#A78BFA] hover:text-white text-sm font-bold transition-all cursor-pointer px-4 py-2 rounded-xl hover:bg-purple-500/10 border border-purple-500/20"
            >
              Member Area
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section
        id="home"
        ref={(el) => registerRef(el, "home")}
        className="relative z-10 min-h-[90vh] flex items-center px-6 pt-28 pb-16 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.08), transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.05), transparent 60%)
          `,
        }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <Badge color="violet">
                <FaMagic /> Klinik Hewan Premium 2026
              </Badge>

              <div className="relative">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[150px] opacity-30 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)",
                  }}
                />
                <div className="relative z-10 space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1]">
                    Kesehatan Pet Prioritas Kami
                  </h1>
                </div>
              </div>

              <p
                className="text-lg leading-relaxed max-w-lg"
                style={{ color: tokens.textMuted }}
              >
                Tim dokter bersertifikat, fasilitas modern steril, dan program
                loyalty member yang memberikan reward nyata setiap kunjungan.
              </p>

              <div className="flex flex-wrap gap-4">
                <GradientButton
                  onClick={() => navigate("/register")}
                  icon={FaRocket}
                >
                  Mulai Sekarang — Gratis
                </GradientButton>
                <button
                  onClick={() => scrollTo("promos")}
                  className="group px-8 py-4 rounded-2xl font-bold text-white/70 hover:text-white transition-all duration-300 border hover:border-violet-500/30"
                  style={{
                    borderColor: tokens.border,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    Lihat Promo
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-3">
                  {["#7C3AED", "#A78BFA", "#EC4899", "#06B6D4"].map(
                    (color, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#07071A] flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: color }}
                      >
                        {["A", "B", "C", "D"][i]}
                      </div>
                    )
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <p className="text-sm" style={{ color: tokens.textMuted }}>
                    <span className="text-white font-bold">4.9</span> dari 500+
                    ulasan
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div
                  className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20"
                  style={{ background: tokens.violet }}
                />
                <div
                  className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
                  style={{ background: tokens.cyan }}
                />

                <div
                  className="relative bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-pink-500/10 rounded-3xl p-12 border border-white/10 backdrop-blur-xl shadow-2xl"
                  style={{
                    boxShadow:
                      "0 0 100px rgba(124,58,237,0.1), inset 0 0 100px rgba(124,58,237,0.05)",
                  }}
                >
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-8">
                      <div
                        className="absolute inset-0 rounded-full animate-pulse"
                        style={{
                          background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                          opacity: 0.3,
                        }}
                      />
                      <div
                        className="relative w-full h-full rounded-full flex items-center justify-center"
                        style={{
                          background:
                            "linear-gradient(135deg, #7C3AED, #A855F7, #EC4899)",
                          boxShadow: "0 0 80px rgba(124,58,237,0.3)",
                        }}
                      >
                        <FaPaw className="text-white text-7xl opacity-90" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium text-white/60">
                        Lebih dari
                      </p>
                      <p className="text-5xl font-black text-white">
                        10,000+
                      </p>
                      <p className="text-sm font-medium text-white/60">
                        Hewan dipercayakan
                      </p>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                      {[
                        { value: "98%", label: "Kepuasan" },
                        { value: "24/7", label: "Layanan" },
                        { value: "⭐ 4.9", label: "Rating" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="py-3 px-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5"
                        >
                          <p className="text-xl font-black text-white">
                            {item.value}
                          </p>
                          <p className="text-xs text-white/50">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS (STATS) ─── */}
      <section className="relative z-10 px-6 -mt-8 mb-16">
        <div className="container mx-auto max-w-7xl">
          <div
            className="rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.border}`,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {[
              {
                icon: FaPaw,
                value: totalPets.toLocaleString(),
                label: "Pasien Terdaftar",
                color: tokens.violetLight,
              },
              {
                icon: FaUserMd,
                value: totalVets,
                label: "Dokter Spesialis",
                color: tokens.cyan,
              },
              {
                icon: FaUsers,
                value: totalOwners.toLocaleString(),
                label: "Member Aktif",
                color: tokens.gold,
              },
              {
                icon: FaStar,
                value: "4.9★",
                label: "Rating Kepuasan",
                color: tokens.rose,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-3">
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${stat.color}20`,
                    border: `1px solid ${stat.color}30`,
                  }}
                >
                  <stat.icon style={{ color: stat.color, fontSize: "1.5rem" }} />
                </div>
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm font-medium" style={{ color: tokens.textMuted }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* AREA MIDDLE: FEATURES & TRUST */}
      {/* ════════════════════════════════════════ */}

      {/* ─── PROMOS ─── */}
      <section
        id="promos"
        ref={(el) => registerRef(el, "promos")}
        className={`relative z-10 py-20 px-6 ${animCls("promos")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="rose">
              <FaFire /> Penawaran Eksklusif
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Promo Bulan Ini
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: tokens.textMuted }}>
              Voucher dan potongan harga terbatas — klaim sebelum kehabisan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos.map((promo) => (
              <div
                key={promo.id}
                className="group relative rounded-3xl p-7 border cursor-pointer transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${promo.accent}18, ${promo.accent}08)`,
                  borderColor: `${promo.accent}30`,
                }}
                onMouseEnter={() => setActivePromo(promo.id)}
                onMouseLeave={() => setActivePromo(null)}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${promo.accent}20, transparent 70%)`,
                  }}
                />

                <div className="absolute top-5 right-5">
                  <span
                    className="text-[10px] font-black px-2.5 py-1 rounded-full border"
                    style={{
                      background: `${promo.accent}25`,
                      borderColor: `${promo.accent}50`,
                      color: promo.accent,
                    }}
                  >
                    {promo.badge}
                  </span>
                </div>

                <div className="relative z-10">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{
                      background: `${promo.accent}20`,
                      border: `1px solid ${promo.accent}40`,
                    }}
                  >
                    <promo.icon
                      style={{ color: promo.accent, fontSize: "1.4rem" }}
                    />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 pr-20 leading-tight">
                    {promo.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: tokens.textMuted }}
                  >
                    {promo.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-semibold flex items-center gap-1.5"
                      style={{ color: tokens.textFaint }}
                    >
                      <FaClock style={{ fontSize: "0.6rem" }} />{" "}
                      {promo.deadline}
                    </span>
                    <button
                      onClick={() =>
                        navigate("/member", {
                          state: { promoName: promo.title },
                        })
                      }
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-900/40 text-center block cursor-pointer"
                    >
                      Klaim Terbatas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section
        id="services"
        ref={(el) => registerRef(el, "services")}
        className={`relative z-10 py-20 px-6 ${animCls("services")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="cyan">Layanan Klinis</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Penanganan Komprehensif
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: tokens.textMuted }}>
              Fasilitas medis premium dengan standar diagnostik modern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <GlassCard key={i} className="p-7 group">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{
                    background: `${s.accent}18`,
                    border: `1px solid ${s.accent}30`,
                  }}
                >
                  <s.icon style={{ color: s.accent, fontSize: "1.5rem" }} />
                </div>
                <div
                  className="h-0.5 w-10 rounded-full mb-5 transition-all group-hover:w-16"
                  style={{ background: s.accent }}
                />
                <h3 className="font-extrabold text-white text-lg mb-2">
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: tokens.textMuted }}
                >
                  {s.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section
        id="why-us"
        ref={(el) => registerRef(el, "why-us")}
        className={`relative z-10 py-20 px-6 ${animCls("why-us")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <Badge color="violet">Keunggulan Kami</Badge>
              <h2 className="text-4xl sm:text-5xl font-black mt-5 mb-6 text-white tracking-tight leading-tight">
                Mengapa Memilih
                <br />
                <span style={{ color: tokens.violetLight }}>Paws & Care?</span>
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: tokens.textMuted }}
              >
                Kami membangun klinik bukan hanya sebagai fasilitas medis,
                melainkan sebagai mitra jangka panjang dalam menjaga kualitas
                hidup hewan kesayangan Anda.
              </p>
              <GradientButton
                onClick={() => navigate("/register")}
                icon={FaArrowRight}
              >
                Mulai Perjalanan
              </GradientButton>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((r, i) => (
                <GlassCard key={i} className="p-6 group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }}
                  >
                    <r.icon
                      style={{ color: tokens.violetLight, fontSize: "1.1rem" }}
                    />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">
                    {r.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: tokens.textMuted }}
                  >
                    {r.desc}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STEPS / HOW IT WORKS ─── */}
      <section
        id="steps"
        ref={(el) => registerRef(el, "steps")}
        className={`relative z-10 py-20 px-6 ${animCls("steps")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="cyan">Cara Bergabung</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Mudah & Cepat
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: tokens.textMuted }}>
              Dari pendaftaran hingga menikmati reward — semua simpel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div
              className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)",
              }}
            />

            {steps.map((step, i) => (
              <GlassCard key={i} className="p-7 text-center group relative">
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-black px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                    color: "white",
                  }}
                >
                  {step.number}
                </div>

                <div
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 mt-3 transition-transform group-hover:scale-110"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.15))",
                    border: "1px solid rgba(124,58,237,0.3)",
                  }}
                >
                  <step.icon
                    style={{ color: tokens.violetLight, fontSize: "1.4rem" }}
                  />
                </div>
                <h3 className="font-extrabold text-white text-lg mb-2">
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: tokens.textMuted }}
                >
                  {step.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MEMBER BENEFITS ─── */}
      <section
        id="member-benefits"
        ref={(el) => registerRef(el, "member-benefits")}
        className={`relative z-10 py-20 px-6 ${animCls("member-benefits")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="gold">
              <FaCrown /> Program Loyalitas
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Tier Member Eksklusif
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: tokens.textMuted }}>
              Setiap kunjungan membawa Anda lebih dekat ke reward yang lebih besar.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { label: "Gold", count: goldMembers, color: "#F59E0B" },
              { label: "Silver", count: silverMembers, color: "#94A3B8" },
              { label: "Bronze", count: bronzeMembers, color: "#D97706" },
              { label: "New", count: newMembers, color: "#7C3AED" },
            ].map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border"
                style={{
                  borderColor: `${m.color}30`,
                  background: `${m.color}10`,
                }}
              >
                <span className="text-2xl font-black text-white">
                  {m.count}
                </span>
                <span className="text-sm font-bold" style={{ color: m.color }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberTiers.map((tier, i) => (
              <div
                key={i}
                className="relative group rounded-3xl p-8 border transition-all duration-500 hover:-translate-y-3 flex flex-col justify-between h-full"
                style={{
                  background: `radial-gradient(ellipse at top, ${tier.glow}, transparent 60%), rgba(255,255,255,0.03)`,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <div
                    className={`bg-gradient-to-r ${tier.gradient} rounded-2xl p-4 text-slate-900 text-center mb-7 shadow-xl`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <tier.icon className="text-2xl" />
                      <span className="text-xl font-black">{tier.tier}</span>
                    </div>
                    <span className="text-[11px] font-bold bg-black/20 px-3 py-0.5 rounded-full">
                      {tier.req}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {tier.benefits.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm font-medium"
                        style={{ color: tokens.textMuted }}
                      >
                        <FaCheckCircle className="text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button
                    onClick={() => navigate("/member")}
                    className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all border border-white/10 hover:border-purple-500 hover:bg-purple-600/20 text-white block text-center"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    Mulai Bergabung
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section
        id="testimonials"
        ref={(el) => registerRef(el, "testimonials")}
        className={`relative z-10 py-20 px-6 ${animCls("testimonials")}`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="violet">Testimoni</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Kata Mereka
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: tokens.textMuted }}>
              Ulasan nyata dari member yang rutin bersama kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <GlassCard key={i} className="p-6 flex flex-col group">
                <FaQuoteLeft
                  className="text-xl mb-4"
                  style={{ color: tokens.violetLight, opacity: 0.5 }}
                />
                <p
                  className="text-sm leading-relaxed flex-grow mb-6"
                  style={{ color: tokens.textMuted }}
                >
                  "{t.text}"
                </p>
                <div
                  className="flex items-center gap-3 pt-4 border-t"
                  style={{ borderColor: tokens.border }}
                >
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-sm font-black text-white"
                    style={{
                      background: `linear-gradient(135deg, #7C3AED, #9333EA)`,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-white text-sm leading-tight">
                      {t.name}
                    </p>
                    <p
                      className="text-[11px] font-semibold mt-0.5"
                      style={{ color: tokens.violetLight }}
                    >
                      {t.pet}
                    </p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <FaStar
                          key={j}
                          style={{ color: tokens.gold, fontSize: "9px" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* AREA BOTTOM: CTA & FOOTER */}
      {/* ════════════════════════════════════════ */}

      {/* ─── FAQ ─── */}
      <section
        id="faq"
        ref={(el) => registerRef(el, "faq")}
        className={`relative z-10 py-20 px-6 ${animCls("faq")}`}
      >
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16 space-y-4">
            <Badge color="cyan">FAQ</Badge>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Pertanyaan Umum
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="p-6 hover:border-violet-500/30">
                <h3 className="font-extrabold text-white text-base sm:text-lg flex items-start gap-3 mb-3">
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(124,58,237,0.3)",
                      color: tokens.violetLight,
                    }}
                  >
                    Q
                  </span>
                  {faq.q}
                </h3>
                <p
                  className="text-sm leading-relaxed pl-9"
                  style={{ color: tokens.textMuted }}
                >
                  {faq.a}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative z-10 py-8 px-6 mb-16">
        <div className="container mx-auto max-w-4xl">
          <div
            className="relative rounded-3xl p-12 sm:p-16 text-center overflow-hidden border"
            style={{
              borderColor: "rgba(124,58,237,0.3)",
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(124,58,237,0.15), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(124,58,237,0.25)",
                    border: "1px solid rgba(124,58,237,0.4)",
                  }}
                >
                  <FaInfinity
                    style={{ color: tokens.violetLight, fontSize: "1.5rem" }}
                  />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
                Mulai Hari Ini.
                <br />
                Tanpa Biaya Pendaftaran.
              </h2>
              <p
                className="text-base mb-10 max-w-md mx-auto"
                style={{ color: tokens.textMuted }}
              >
                Rekam medis digital, reminder vaksin, dan akses benefit member —
                semua tersedia segera setelah daftar.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <GradientButton
                  onClick={() => navigate("/register")}
                  icon={FaRocket}
                >
                  Daftar Sekarang
                </GradientButton>
                <button
                  onClick={() => navigate("/login")}
                  className="font-bold px-8 py-4 rounded-2xl cursor-pointer transition-all border"
                  style={{
                    borderColor: tokens.border,
                    color: tokens.textMuted,
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  Sudah Punya Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        className="relative z-10 px-6 py-16 border-t"
        style={{ borderColor: tokens.border, background: "rgba(7,7,26,0.9)" }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
            <div>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 mb-5 cursor-pointer group"
              >
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #9333EA)",
                  }}
                >
                  <FaPaw className="text-white" />
                </div>
                <span className="text-lg font-black text-white">
                  Paws & Care
                </span>
              </button>
              <p className="leading-relaxed" style={{ color: tokens.textFaint }}>
                Klinik kesehatan hewan peliharaan modern dengan layanan terpadu
                dan program loyalty.
              </p>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-widest mb-5">
                Kontak
              </h4>
              <div className="space-y-3" style={{ color: tokens.textFaint }}>
                <p className="flex items-start gap-2.5">
                  <FaMapMarkerAlt
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: tokens.violetLight }}
                  />{" "}
                  Jl. Merdeka No.123, Jakarta
                </p>
                <p className="flex items-center gap-2.5">
                  <FaPhone style={{ color: tokens.violetLight }} /> (021)
                  1234-5678
                </p>
                <p className="flex items-center gap-2.5">
                  <FaEnvelope style={{ color: tokens.violetLight }} />{" "}
                  info@pawscare.com
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-widest mb-5">
                Jam Operasional
              </h4>
              <div
                className="space-y-2.5 text-sm"
                style={{ color: tokens.textFaint }}
              >
                <div className="flex justify-between">
                  <span>Senin – Jumat</span>
                  <span className="text-white font-semibold">
                    08:00 – 20:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span className="text-white font-semibold">
                    08:00 – 17:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu / Libur</span>
                  <span className="font-semibold" style={{ color: "#F43F5E" }}>
                    Tutup
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-black text-white text-xs uppercase tracking-widest mb-5">
                Ikuti Kami
              </h4>
              <div className="flex gap-3 mb-6">
                {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all hover:scale-110 hover:-translate-y-1"
                      style={{
                        borderColor: tokens.border,
                        background: "rgba(255,255,255,0.04)",
                        color: tokens.textMuted,
                      }}
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
              <p className="text-xs" style={{ color: tokens.textFaint }}>
                © 2026 Paws & Care. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── SCROLL TO TOP ─── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll ke atas"
          className="fixed bottom-7 right-7 w-12 h-12 rounded-2xl flex items-center justify-center z-50 cursor-pointer transition-all hover:scale-110 hover:-translate-y-1 border"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #9333EA)",
            borderColor: "rgba(124,58,237,0.5)",
            boxShadow: "0 0 24px rgba(124,58,237,0.5)",
          }}
        >
          <FaArrowUp className="text-white" />
        </button>
      )}
    </div>
  );
}