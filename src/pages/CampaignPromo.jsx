import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, FaPlus, FaBullhorn, FaWhatsapp, 
  FaEnvelope, FaSms, FaCheckCircle, FaExclamationCircle,
  FaPaperPlane, FaHistory, FaChartLine, FaUsers, FaCoins,
  FaGift, FaCrown, FaStar, FaShieldAlt, FaPercent,
  FaTicketAlt, FaUserMd, FaSyringe
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

// Data Promosi Member
const memberPromotions = [
  { id: "PROMO-001", title: "Vaksinasi Gratis", desc: "Untuk member baru, vaksinasi pertama gratis!", icon: FaSyringe, target: "Member Baru", status: "Aktif" },
  { id: "PROMO-002", title: "Diskon 20%", desc: "Diskon perawatan gigi untuk semua member", icon: FaPercent, target: "Semua Member", status: "Aktif" },
  { id: "PROMO-003", title: "Konsultasi Gratis", desc: "Konsultasi pertama gratis untuk member Bronze", icon: FaUserMd, target: "Member Bronze", status: "Aktif" },
  { id: "PROMO-004", title: "Paket Hemat 3 Bulan", desc: "Paket perawatan 3 bulan dengan harga khusus", icon: FaTicketAlt, target: "Member Gold & Silver", status: "Selesai" },
  { id: "PROMO-005", title: "Hadiah Ulang Tahun", desc: "Hadiah spesial untuk member di bulan ulang tahun", icon: FaGift, target: "Semua Member", status: "Aktif" },
];

// Template Promosi Member
const templateOptions = [
  { value: "vaksin-gratis", label: "🎉 Vaksinasi Gratis Member Baru", text: "Halo {nama}! Selamat bergabung sebagai member Paws & Care! Anda berhak mendapatkan vaksinasi pertama GRATIS. Yuk, jadwalkan kunjungan sekarang!" },
  { value: "diskon-member", label: "💰 Diskon 20% Member", text: "Halo {nama}! Dapatkan diskon 20% untuk semua layanan perawatan gigi hewan kesayangan Anda. Promo berlaku untuk semua member aktif!" },
  { value: "konsultasi-bronze", label: "🩺 Konsultasi Gratis Bronze", text: "Hai {nama}! Sebagai member Bronze, Anda berhak mendapatkan 1x konsultasi gratis. Gunakan kesempatan ini untuk konsultasi kesehatan anabul Anda!" },
  { value: "paket-hemat", label: "📦 Paket Hemat 3 Bulan", text: "Halo {nama}! Nikmati paket perawatan 3 bulan dengan harga spesial. Dapatkan diskon hingga 30% untuk member Gold & Silver!" },
  { value: "ulang-tahun", label: "🎂 Hadiah Ulang Tahun", text: "Selamat ulang tahun, {nama}! Sebagai member setia Paws & Care, kami memberikan hadiah spesial untuk anabul kesayangan Anda. Cek aplikasi sekarang!" },
];

const targetSegments = [
  { value: "all-members", label: "Semua Member" },
  { value: "gold", label: "🥇 Member Gold" },
  { value: "silver", label: "🥈 Member Silver" },
  { value: "bronze", label: "🥉 Member Bronze" },
  { value: "new", label: "Member Baru" },
];

export default function CampaignPromo() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all-members");
  const [activeChannel, setActiveChannel] = useState("whatsapp");
  const [message, setMessage] = useState("");
  const [alertConfig, setAlertConfig] = useState({ show: false, text: "", type: "" });
  
  const [broadcastLogs, setBroadcastLogs] = useState([
    { id: "BC-901", time: "10:30", channel: "whatsapp", segment: "Semua Member", totalSent: 45, status: "Sukses" },
    { id: "BC-900", time: "09:15", channel: "email", segment: "Member Gold", totalSent: 12, status: "Sukses" },
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
  
  // Segmentasi member berdasarkan kunjungan
  const segmentCounts = {
    "all-members": owners.length,
    gold: owners.filter((owner) => owner.totalVisits >= 10).length,
    silver: owners.filter((owner) => owner.totalVisits >= 5 && owner.totalVisits < 10).length,
    bronze: owners.filter((owner) => owner.totalVisits >= 1 && owner.totalVisits < 5).length,
    new: owners.filter((owner) => owner.totalVisits === 1).length,
  };

  const segmentOptions = targetSegments.map((segment) => ({
    value: segment.value,
    label: `${segment.label} (${segmentCounts[segment.value] ?? 0} Member)`,
  }));

  const filteredPromotions = memberPromotions.filter((promo) =>
    promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (value, text) => {
    setSelectedTemplate(value);
    setMessage(text);
  };

  const handleSendBroadcast = () => {
    if (!message.trim()) {
      setAlertConfig({
        show: true,
        text: "Tuliskan isi promosi atau pilih template terlebih dahulu.",
        type: "error"
      });
      return;
    }
    
    const currentSegmentLabel = targetSegments.find(s => s.value === selectedSegment)?.label || "Semua Member";
    const totalTarget = segmentCounts[selectedSegment] ?? owners.length;
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newLog = {
      id: `BC-${Math.floor(100 + Math.random() * 900)}`,
      time: timeString,
      channel: activeChannel,
      segment: currentSegmentLabel,
      totalSent: totalTarget,
      status: "Sukses"
    };

    setBroadcastLogs([newLog, ...broadcastLogs]);

    setAlertConfig({
      show: true,
      text: `✅ Berhasil! Promosi dikirim ke ${totalTarget} member via ${activeChannel.toUpperCase()}.`,
      type: "success"
    });

    setMessage("");
    setSelectedTemplate("");
    setTimeout(() => setAlertConfig({ show: false, text: "", type: "" }), 4000);
  };

  if (isLoading) return <Loading fullScreen text="Membuka Campaign Center..." />;

  return (
    <div id="campaign-promo-page" className="min-h-screen bg-[#F1F5F9] pb-16">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm mb-6">
        <PageHeader title="🎯 Promo Center - Member Paws & Care" breadcrumb={["CRM Pemasaran", "Promo Member"]}>
          <Button type="primary" onClick={() => navigate("/add-promo")} className="bg-[#432C81] hover:bg-[#322061] transition-all"> 
            <FaPlus size={12} className="mr-2" /> Buat Promo Baru
          </Button>
        </PageHeader>
      </div>

      <Container>
        {/* Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-gradient-to-br from-[#432C81] to-[#6344C7] text-white p-5 rounded-2xl shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-purple-200">Total Promo Aktif</p>
                <p className="text-4xl font-black mt-2">{memberPromotions.filter(p => p.status === "Aktif").length}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl"><FaBullhorn size={20} /></div>
            </div>
            <p className="text-xs text-purple-100 mt-4">{memberPromotions.length} Total Promo</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Member</p>
                <p className="text-3xl font-extrabold text-[#1E293B] mt-2">{owners.length}</p>
              </div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-xl"><FaUsers size={20} /></div>
            </div>
            <div className="flex gap-2 mt-4 text-xs">
              <Badge type="success">🥇 Gold: {segmentCounts.gold}</Badge>
              <Badge type="warning">🥈 Silver: {segmentCounts.silver}</Badge>
              <Badge type="info">🥉 Bronze: {segmentCounts.bronze}</Badge>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Keuntungan Member</p>
                <p className="text-sm font-extrabold text-[#1E293B] mt-2">4 Jenis Promo</p>
              </div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl"><FaGift size={20} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-4">🎁 Vaksinasi • Diskon • Konsultasi • Paket</p>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tingkat Konversi</p>
                <p className="text-3xl font-extrabold text-emerald-600 mt-2">18.2%</p>
              </div>
              <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl"><FaChartLine size={20} /></div>
            </div>
            <p className="text-xs text-slate-500 mt-4">📈 Dari campaign WhatsApp</p>
          </div>
        </div>

        {/* Promo List */}
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#1E293B]">Daftar Promo Member</h3>
                  <p className="text-xs text-slate-500">Promosi spesial untuk member setia</p>
                </div>
                <div className="w-full sm:w-64">
                  <InputField
                    ref={searchInputRef}
                    name="search"
                    placeholder="Cari promo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={FaSearch}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-1">
                {filteredPromotions.length > 0 ? (
                  filteredPromotions.map((promo) => (
                    <div key={promo.id} className="group bg-[#F8FAFC] hover:bg-white border border-slate-200 hover:border-[#432C81] p-4 rounded-xl transition-all hover:shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#432C81]/10 p-2.5 rounded-xl">
                            <promo.icon className="text-[#432C81] text-lg" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#432C81]">{promo.title}</h4>
                            <p className="text-xs text-slate-500">{promo.desc}</p>
                          </div>
                        </div>
                        <Badge type={promo.status === "Aktif" ? "success" : "info"}>{promo.status}</Badge>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400">🎯 Target: {promo.target}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    Tidak ada promo ditemukan.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Broadcast Engine */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#432C81]"></div>
              
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
                  <FaPaperPlane className="text-[#432C81] text-sm" /> Kirim Promo ke Member
                </h3>
                <p className="text-xs text-slate-500">Kirim promosi spesial ke member berdasarkan tingkatan</p>
              </div>

              <div className="space-y-5">
                {/* Channel */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Saluran</label>
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
                      <FaEnvelope size={16} className={activeChannel === "email" ? "text-rose-500" : "text-slate-400"} /> Email
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveChannel("sms")}
                      className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1.5 ${activeChannel === "sms" ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-400/20" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                    >
                      <FaSms size={18} className={activeChannel === "sms" ? "text-blue-500" : "text-slate-400"} /> SMS
                    </button>
                  </div>
                </div>

                {/* Segmentasi Member */}
                <SelectField
                  label="Target Member"
                  name="segment"
                  options={segmentOptions}
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                />

                {/* Template */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Template Promo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {templateOptions.map((template) => (
                      <button
                        key={template.value}
                        type="button"
                        onClick={() => handleSelectTemplate(template.value, template.text)}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-all truncate ${selectedTemplate === template.value ? "border-[#432C81] bg-purple-50/50 text-[#432C81] font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                      >
                        {template.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Isi Pesan</label>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">Gunakan {'{nama}'}</span>
                  </div>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setSelectedTemplate(""); 
                    }}
                    placeholder="Tulis pesan promo atau pilih template di atas..."
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#432C81] focus:ring-4 focus:ring-[#432C81]/10 outline-none transition-all placeholder:text-slate-400 leading-relaxed font-mono"
                  />
                </div>

                {/* Alert */}
                {alertConfig.show && (
                  <div className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold ${
                    alertConfig.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
                  }`}>
                    {alertConfig.type === "success" ? <FaCheckCircle className="text-emerald-500 shrink-0" /> : <FaExclamationCircle className="text-rose-500 shrink-0" />}
                    <span>{alertConfig.text}</span>
                  </div>
                )}

                {/* Tombol */}
                <div className="flex gap-2.5 pt-1">
                  <div className="flex-1">
                    <button 
                      type="button" 
                      onClick={handleSendBroadcast} 
                      className="w-full bg-[#432C81] hover:bg-[#342163] text-white rounded-xl py-3 text-xs font-bold tracking-wider transition-all shadow-md active:scale-[0.99] flex justify-center items-center gap-2"
                    >
                      <FaPaperPlane size={11} /> Kirim ke Member
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

            {/* Log */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FaHistory className="text-slate-400" /> Live Broadcast Log
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
                        <span className="text-[10px] text-slate-400 font-mono">{log.totalSent} Member</span>
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