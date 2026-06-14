import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, FaPlus, FaBullhorn, FaWhatsapp, 
  FaEnvelope, FaSms, FaCheckCircle, FaExclamationCircle,
  FaPaperPlane, FaHistory, FaChartLine, FaUsers, FaCoins
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Card from "./Components/Card";
import Container from "./Components/Container";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import ProgressBar from "./Components/ProgressBar";
import Loading from "./Components/Loading";
import { initialPetOwners } from "../data/clinicData";

const campaigns = [
  { id: "CMP-001", channel: "Instagram Ads", title: "PetCare Summer Festival", budget: 4500000, reach: 12000, conversion: 8.5, status: "Aktif" },
  { id: "CMP-002", channel: "WhatsApp Broadcast", title: "Vaksinasi Gratis Rabies", budget: 2000000, reach: 5000, conversion: 18.2, status: "Aktif" },
  { id: "CMP-003", channel: "Instagram Ads", title: "Liburan Tenang Bersama PetCare", budget: 3500000, reach: 8500, conversion: 6.4, status: "Aktif" },
  { id: "CMP-004", channel: "Email Newsletter", title: "Bulan Kesehatan Gigi Hewan", budget: 1500000, reach: 4000, conversion: 11, status: "Selesai" },
];

const templateOptions = [
  { value: "diskon-vaksin", label: "Diskon Vaksin Tahunan", text: "Halo {nama}! Dapatkan diskon 20% untuk Vaksinasi Tahunan anabul kesayangan Anda selama bulan ini. Yuk, jadwalkan kunjungan sekarang!" },
  { value: "promo-grooming", label: "Promo Grooming Gajian", text: "Spesial Gajian! {nama}, nikmati promo istimewa Paket Grooming Sehat Wangi hanya dengan Rp 75.000. Kuota terbatas harian!" },
  { value: "undangan-event", label: "Undangan Event Anabul", text: "Hai {nama}! Hadiri PetCare Summer Festival minggu ini. Banyak kompetisi seru dan free check-up untuk anabul Anda!" },
  { value: "kupon-comeback", label: "Kupon Comeback (Dorman)", text: "Kami rindu Anda & Anabul! {nama}, gunakan kode kupon [PETBACK] untuk mendapatkan gratis konsultasi dokter pada kunjungan berikutnya." },
];

const targetSegments = [
  { value: "all-customers", label: "Semua Customer" },
  { value: "regular", label: "Customer Reguler" },
  { value: "new", label: "Customer Baru" },
  { value: "dormant", label: "Customer Dorman" },
];

export default function CampaignPromo() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all-customers");
  const [activeChannel, setActiveChannel] = useState("whatsapp");
  const [message, setMessage] = useState("");
  const [alertConfig, setAlertConfig] = useState({ show: false, text: "", type: "" });
  
  // State Baru: Menyimpan log pengiriman broadcast secara real-time
  const [broadcastLogs, setBroadcastLogs] = useState([
    { id: "BC-901", time: "10:30", channel: "whatsapp", segment: "Customer Reguler", totalSent: 12, status: "Sukses" }
  ]);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const owners = initialPetOwners || [];
  const budgetTotal = campaigns.reduce((sum, item) => sum + item.budget, 0);
  const totalReach = campaigns.reduce((sum, item) => sum + item.reach, 0);
  const avgConversion = campaigns.reduce((sum, item) => sum + item.conversion, 0) / campaigns.length;

  const segmentCounts = {
    "all-customers": owners.length,
    regular: owners.filter((owner) => owner.totalVisits >= 5).length,
    new: owners.filter((owner) => owner.totalVisits > 1 && owner.totalVisits <= 3).length,
    dormant: owners.filter((owner) => owner.totalVisits <= 1).length,
  };

  const segmentOptions = targetSegments.map((segment) => ({
    value: segment.value,
    label: `${segment.label} (${segmentCounts[segment.value] ?? owners.length} Pemilik)`,
  }));

  const campaignList = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (value, text) => {
    setSelectedTemplate(value);
    setMessage(text);
  };

  // FUNGSI UTAMA: Tombol dipencet dan data BETULAN MASUK ke log tracker bawah
  const handleSendBroadcast = () => {
    if (!message.trim()) {
      setAlertConfig({
        show: true,
        text: "Tuliskan isi promosi atau pilih template cepat terlebih dahulu.",
        type: "error"
      });
      return;
    }
    
    const currentSegmentLabel = targetSegments.find(s => s.value === selectedSegment)?.label || "Semua Customer";
    const totalTarget = segmentCounts[selectedSegment] ?? owners.length;
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Object baru dimasukkan ke state log
    const newLog = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      time: timeString,
      channel: activeChannel,
      segment: currentSegmentLabel,
      totalSent: totalTarget,
      status: "Sukses"
    };

    setBroadcastLogs([newLog, ...broadcastLogs]); // Masuk ke list teratas

    setAlertConfig({
      show: true,
      text: `Berhasil! Pesan disiarkan ke ${totalTarget} tujuan via ${activeChannel.toUpperCase()}.`,
      type: "success"
    });

    // Reset input teks setelah sukses dikirim
    setMessage("");
    setSelectedTemplate("");
    setTimeout(() => setAlertConfig({ show: false, text: "", type: "" }), 4000);
  };

  if (isLoading) return <Loading fullScreen text="Membuka Ruang Kerja Marketer..." />;

  return (
    <div id="campaign-promo-page" className="min-h-screen bg-[#F1F5F9] pb-16 font-sans antialiased">
      {/* Header Elegan */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm mb-6">
        <PageHeader title="⚡ Promo Campaign Workspace" breadcrumb={["CRM Pemasaran", "Campaign Promo & Hub"]}>
          <Button type="primary" onClick={() => navigate("/add-campaign")} className="bg-[#432C81] hover:bg-[#322061] transition-all transform hover:scale-105"> 
            <FaPlus size={12} className="mr-2" /> Desain Iklan Baru
          </Button>
        </PageHeader>
      </div>

      <Container>
        {/* NEW GRAPHIC STATS CARD STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-[#432C81] to-[#6344C7] text-white p-5 rounded-2xl shadow-md transform hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-purple-200">Active Campaigns</p>
                <p className="text-4xl font-black mt-2">{campaigns.length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl"><FaBullhorn size={20} /></div>
            </div>
            <p className="text-xs text-purple-100 mt-4 font-light">3 Sedang Berjalan • 1 Selesai</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm transform hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Alokasi Dana</p>
                <p className="text-2xl font-extrabold text-[#1E293B] mt-2">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(budgetTotal)}
                </p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><FaCoins size={20} /></div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "72%" }}></div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm transform hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimasi Jangkauan</p>
                <p className="text-3xl font-extrabold text-[#1E293B] mt-2">{totalReach.toLocaleString("id-ID")}</p>
              </div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl"><FaUsers size={20} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-4">👥 Target audiens aktif klinik</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm transform hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rata-Rata Konversi</p>
                <p className="text-3xl font-extrabold text-emerald-600 mt-2">{avgConversion.toFixed(1)}%</p>
              </div>
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl"><FaChartLine size={20} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-4">📈 Di atas rata-rata industri (+2.4%)</p>
          </div>
        </div>

        {/* MAIN PANEL */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6 items-start">
          
          {/* SEKSI KIRI: MONITOR CAMPAIGN */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">Live Ads Monitor</h3>
                  <p className="text-xs text-slate-500">Pantau performa konversi ads yang sedang dipublikasikan</p>
                </div>
                <div className="w-full sm:w-64">
                  <InputField
                    ref={searchInputRef}
                    name="search"
                    placeholder="Filter judul / media..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={FaSearch}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 max-h-[520px] overflow-y-auto pr-1">
                {campaignList.length > 0 ? (
                  campaignList.map((campaign) => (
                    <div key={campaign.id} className="group bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-[#432C81] p-4 rounded-xl transition-all duration-200 hover:shadow-md">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-white border text-slate-600 tracking-wide uppercase">
                            {campaign.channel}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800 mt-2 group-hover:text-[#432C81] transition-colors">{campaign.title}</h4>
                        </div>
                        <Badge type={campaign.status === "Aktif" ? "success" : "info"}>{campaign.status}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-white p-2.5 rounded-lg border border-slate-100">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Budget</span>
                          <span className="font-semibold text-slate-700">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(campaign.budget)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Reach</span>
                          <span className="font-semibold text-slate-700">{campaign.reach.toLocaleString("id-ID")} org</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <ProgressBar percentage={campaign.conversion} label="Rasio Konversi" showPercentage={true} size="sm" color="info" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    Campaign tidak ditemukan.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEKSI KANAN: BROADCAST ENGINE */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#432C81]"></div>
              
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
                  <FaPaperPlane className="text-[#432C81] text-sm" /> Smart Omnichannel Broadcast
                </h3>
                <p className="text-xs text-slate-500">Kirim promosi personal ke ratusan data target dalam satu klik</p>
              </div>

              <div className="space-y-5">
                {/* PILIHAN SALURAN MEDIA DENGAN STYLE BARU */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Saluran Distribusi</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      type="button"
                      onClick={() => setActiveChannel("whatsapp")}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${activeChannel === "whatsapp" ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-400/20" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      <FaWhatsapp size={18} className={activeChannel === "whatsapp" ? "text-emerald-500" : "text-slate-400"} /> WhatsApp
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveChannel("email")}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${activeChannel === "email" ? "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-400/20" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      <FaEnvelope size={16} className={activeChannel === "email" ? "text-rose-500" : "text-slate-400"} /> Email Blast
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveChannel("sms")}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${activeChannel === "sms" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-400/20" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      <FaSms size={18} className={activeChannel === "sms" ? "text-blue-500" : "text-slate-400"} /> SMS Massal
                    </button>
                  </div>
                </div>

                {/* SEGMENTASI */}
                <SelectField
                  label="Target Penerima Segmentasi"
                  name="segment"
                  options={segmentOptions}
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                />

                {/* TEMPLATE CEPAT */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Pilih Draf Template</label>
                  <div className="grid grid-cols-2 gap-2">
                    {templateOptions.map((template) => (
                      <button
                        key={template.value}
                        type="button"
                        onClick={() => handleSelectTemplate(template.value, template.text)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all truncate ${selectedTemplate === template.value ? "border-[#432C81] bg-purple-50/50 text-[#432C81] font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                      >
                        ✨ {template.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TEXTAREA INPUT */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Konten Isi Pesan</label>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">Shortcode: {'{nama}'}</span>
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setSelectedTemplate(""); 
                    }}
                    placeholder="Ketik isi pesan atau pilih draf template di atas..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#432C81] focus:ring-4 focus:ring-[#432C81]/10 outline-none transition-all placeholder:text-slate-400 leading-relaxed font-mono"
                  />
                </div>

                {/* NOTIFIKASI */}
                {alertConfig.show && (
                  <div className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold ${
                    alertConfig.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}>
                    {alertConfig.type === "success" ? <FaCheckCircle className="text-emerald-500 shrink-0" /> : <FaExclamationCircle className="text-rose-500 shrink-0" />}
                    <span>{alertConfig.text}</span>
                  </div>
                )}

                {/* TOMBOL AKSI */}
                <div className="flex gap-2.5 pt-1">
                  <div className="flex-1">
                    <button 
                      type="button" 
                      onClick={handleSendBroadcast} 
                      className="w-full bg-[#432C81] hover:bg-[#342163] text-white rounded-xl py-3 text-xs font-bold tracking-wider transition-all shadow-md active:scale-[0.99] flex justify-center items-center gap-2"
                    >
                      <FaPaperPlane size={11} /> Kirim Broadcast Sekarang
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setMessage(""); setSelectedTemplate(""); }} 
                    className="px-4 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-xs font-medium"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* LIVE DELIVERY LOG TRACKER (TEMPAT DATA BETULAN MASUK) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaHistory className="text-slate-400" /> Live Delivery Status Tracker
              </h4>
              <div className="divide-y divide-slate-100 max-h-[160px] overflow-y-auto text-[11px]">
                {broadcastLogs.map((log) => (
                  <div key={log.id} className="py-2.5 flex justify-between items-center bg-slate-50/50 px-2 rounded-lg mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono">{log.time}</span>
                      <span className={`p-1 rounded-md ${log.channel === "whatsapp" ? "bg-emerald-100 text-emerald-700" : log.channel === "email" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}`}>
                        {log.channel === "whatsapp" ? <FaWhatsapp size={12} /> : log.channel === "email" ? <FaEnvelope size={12} /> : <FaSms size={12} />}
                      </span>
                      <div>
                        <span className="font-bold text-slate-700 block">{log.segment}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.id} • {log.totalSent} Penerima</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {log.status}
                    </span>
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