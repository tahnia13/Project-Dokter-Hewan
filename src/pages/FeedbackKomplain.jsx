import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaStar, 
  FaMeh, 
  FaFrown, 
  FaThumbsUp, 
  FaClock, 
  FaChartBar,
  FaFilter,
  FaPlusCircle,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaCommentAlt,
  FaHeart
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Container from "./Components/Container";
import InputField from "./Components/InputField";
import TextArea from "./Components/TextArea";
import Loading from "./Components/Loading";

const reviewsData = [
  { id: "RVW-001", name: "Budi Santoso", rating: 4, comment: "Pelayanan dokternya jelas, pemilik merasa tenang saat konsultasi.", time: "Hari ini" },
  { id: "RVW-002", name: "Rina Saputra", rating: 5, comment: "Proses pendaftaran cepat dan dokter sangat ramah.", time: "Kemarin" },
  { id: "RVW-003", name: "Dewi Wijaya", rating: 3, comment: "Lokasi klinik nyaman, tapi menunggu agak lama.", time: "2 hari lalu" },
];

const ticketStatuses = [
  { status: "Semua Status" },
  { status: "Pending" },
  { status: "Resolved" },
];

const complaintsData = [
  {
    id: "CUST-002-CMP-1",
    name: "Dewi Lestari",
    status: "Pending",
    message: "Pernah meminta revisi invoice karena metode pembayaran belum tercatat di sistem kasir.",
    updated: "1 jam lalu",
  },
  {
    id: "CUST-005-CMP-2",
    name: "Budi Santoso",
    status: "Resolved",
    message: "Ingin konfirmasi jadwal vaksinasi ulang untuk kucingnya karena sistem sempat drop.",
    updated: "Kemarin",
  },
  {
    id: "CUST-009-CMP-3",
    name: "Rina Kartika",
    status: "Pending",
    message: "Proses pembayaran belum muncul dalam sistem, minta verifikasi mutasi bank manual.",
    updated: "2 hari lalu",
  },
];

const sentimentData = [
  { label: "Positif", value: 88, color: "bg-emerald-500", icon: <FaThumbsUp className="text-emerald-500" /> },
  { label: "Netral", value: 8, color: "bg-amber-400", icon: <FaMeh className="text-amber-500" /> },
  { label: "Negatif", value: 4, color: "bg-rose-500", icon: <FaFrown className="text-rose-500" /> },
];

const starDistribution = [
  { star: 5, count: 12, percentage: 60 },
  { star: 4, count: 5, percentage: 25 },
  { star: 3, count: 3, percentage: 15 },
  { star: 2, count: 0, percentage: 0 },
  { star: 1, count: 0, percentage: 0 },
];

export default function FeedbackKomplain() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketFilter, setTicketFilter] = useState("Semua Status");
  const [complaints, setComplaints] = useState(complaintsData);
  const [newTicketName, setNewTicketName] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredReviews = reviewsData.filter((review) =>
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTickets = complaints.filter((ticket) =>
    ticketFilter === "Semua Status" || ticket.status === ticketFilter
  );

  const totalReviews = reviewsData.length;
  const activeComplaints = complaints.filter((ticket) => ticket.status === "Pending").length;
  const completedComplaints = complaints.filter((ticket) => ticket.status === "Resolved").length;
  const avgRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicketName.trim() || !newTicketMessage.trim()) return;
    
    const nextId = `CUST-${String(complaints.length + 1).padStart(3, "0")}-CMP-${complaints.length + 1}`;
    const newTicket = {
      id: nextId,
      name: newTicketName,
      status: "Pending",
      message: newTicketMessage,
      updated: "Baru saja",
    };
    
    setComplaints([newTicket, ...complaints]);
    setNewTicketName("");
    setNewTicketMessage("");
    setShowMessage("✅ Tiket keluhan darurat berhasil dimasukkan.");
    setTimeout(() => setShowMessage(""), 4000);
  };

  const toggleResolveTicket = (id) => {
    setComplaints((prev) =>
      prev.map((ticket) =>
        ticket.id === id ? { ...ticket, status: ticket.status === "Resolved" ? "Pending" : "Resolved" } : ticket
      )
    );
  };

  if (isLoading) return <Loading fullScreen text="Sinkronisasi umpan balik..." />;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24 font-inter antialiased text-slate-800">
      {/* Premium Header Bar */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs mb-8 sticky top-0 z-30 backdrop-blur-md bg-white/90">
        <PageHeader title="Sentimen & Resolusi Komplain" breadcrumb={["CRM", "Feedback Hub"]}>
          <button 
            onClick={() => navigate("/customer-crm")} 
            className="group flex items-center gap-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-sm transition-all duration-300"
          > 
            Data Customer CRM <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </PageHeader>
      </div>

      <Container>
        {/* ROW 1: Kumpulan Kartu Dashboard Berwarna Mewah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden group">
            <div className="absolute -right-3 -bottom-3 text-amber-500/10 text-6xl group-hover:scale-110 transition-transform duration-300"><FaStar /></div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Metrik Kepuasan</p>
            <p className="text-3xl font-black text-slate-900 mt-2 flex items-baseline gap-1">
              {avgRating.toFixed(1)} <span className="text-sm font-medium text-slate-400">/ 5.0</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden group">
            <div className="absolute -right-3 -bottom-3 text-purple-500/10 text-6xl group-hover:scale-110 transition-transform duration-300"><FaCommentAlt /></div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ulasan Masuk</p>
            <p className="text-3xl font-black text-slate-900 mt-2">
              {totalReviews} <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">Klien</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden group">
            <div className="absolute -right-3 -bottom-3 text-rose-500/10 text-6xl group-hover:scale-110 transition-transform duration-300"><FaExclamationCircle /></div>
            <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Keluhan Pending</p>
            <p className="text-3xl font-black text-rose-600 mt-2">
              {activeComplaints} <span className="text-xs font-medium text-slate-400">Kasus</span>
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden group">
            <div className="absolute -right-3 -bottom-3 text-emerald-500/10 text-6xl group-hover:scale-110 transition-transform duration-300"><FaCheckCircle /></div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kasus Selesai</p>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              {completedComplaints} <span className="text-xs font-medium text-slate-400">Selesai</span>
            </p>
          </div>
        </div>

        {/* ROW 2: Bar Indeks Sentimen Modern */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-slate-800 mb-5">
            <FaChartBar className="text-indigo-600" size={14} />
            <h2 className="text-xs font-bold uppercase tracking-wider">Kalkulasi Indeks Sentimen Otomatis</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sentimentData.map((item) => (
              <div key={item.label} className="bg-slate-50/80 p-4 rounded-xl border border-slate-100/80 hover:border-slate-200 transition-colors">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="font-bold text-slate-700 flex items-center gap-2">{item.icon} {item.label}</span>
                  <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded-md shadow-3xs">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-500`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: Struktur Konten Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* KOLOM KIRI (8/12): List Keluhan & Ulasan */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* List Antrean Komplain Berwarna Sesuai Status */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Antrean Keluhan Utama</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Pantau dan ubah resolusi penanganan keluhan pasien klinik.</p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <FaFilter size={11} className="text-slate-400" />
                  <select
                    value={ticketFilter}
                    onChange={(e) => setTicketFilter(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold bg-slate-50 text-slate-600 cursor-pointer focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                  >
                    {ticketStatuses.map((item) => (
                      <option key={item.status} value={item.status}>{item.status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTickets.map((ticket) => {
                  const isResolved = ticket.status === 'Resolved';
                  return (
                    <div 
                      key={ticket.id} 
                      className={`group/card rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 ${
                        isResolved 
                          ? 'border-slate-100 bg-slate-50/30 border-l-4 border-l-emerald-500' 
                          : 'border-slate-200 bg-white border-l-4 border-l-rose-500 shadow-3xs hover:shadow-2xs'
                      }`}
                    >
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                            isResolved ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700 animate-pulse'
                          }`}>
                            {isResolved ? 'Selesai' : 'Pending'}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{ticket.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">#{ticket.id}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">{ticket.message}</p>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                          <FaClock size={9} /> <span>Diperbarui {ticket.updated}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleResolveTicket(ticket.id)}
                        className={`sm:w-32 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 shrink-0 ${
                          isResolved 
                            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' 
                            : 'bg-slate-900 text-white hover:bg-purple-700 shadow-xs'
                        }`}
                      >
                        {isResolved ? 'Buka Kembali' : 'Selesaikan'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* List Feed Review Klien */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <FaHeart className="text-rose-500" size={12} />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Ulasan Kepuasan Klien</h3>
              </div>
              <div className="mb-5">
                <InputField
                  ref={searchInputRef}
                  label=""
                  name="search"
                  placeholder="Cari nama atau keyword ulasan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={FaSearch}
                />
              </div>
              <div className="space-y-3">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{review.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{review.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 italic font-medium">“{review.comment}”</p>
                    </div>
                    <div className="flex gap-0.5 text-amber-400 shrink-0 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-3xs">
                      {[...Array(review.rating)].map((_, i) => <FaStar key={i} size={10} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* KOLOM KANAN (4/12): Form & Distribusi Bintang */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Form Input Tiket Baru Manual */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-5 text-purple-700">
                <FaPlusCircle size={14} />
                <h3 className="text-xs font-bold uppercase tracking-wider">Buat Aduan Manual</h3>
              </div>
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <InputField
                  label="Nama Pemilik Hewan"
                  name="customerName"
                  placeholder="Contoh: Ahmad Subarjo"
                  value={newTicketName}
                  onChange={(e) => setNewTicketName(e.target.value)}
                />
                <TextArea
                  label="Detail Kendala Lapangan"
                  name="message"
                  placeholder="Tulis keluhan atau masalah disini..."
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  rows={3}
                />

                {showMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[11px] font-bold shadow-3xs animate-fade-in">
                    {showMessage}
                  </div>
                )}

                <button type="submit" className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm shadow-purple-200">
                  Submit Aduan Baru
                </button>
              </form>
            </div>

            {/* Distribusi Bintang Grafis */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Distribusi Penilaian</h3>
              <div className="space-y-3">
                {starDistribution.map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-xs">
                    <span className="w-6 font-bold text-slate-500 text-right">{row.star}★</span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" style={{ width: `${row.percentage}%` }} />
                    </div>
                    <span className="w-6 text-right text-slate-400 font-mono font-bold">{row.count}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </Container>
    </div>
  );
}