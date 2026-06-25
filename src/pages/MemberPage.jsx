import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaPaw, FaCrown, FaCalendarAlt, FaArrowLeft, FaSignOutAlt, 
  FaIdCard, FaUserPlus, FaSearch, FaCheckCircle, FaPhone, FaTag, FaGift
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { initialPets, initialAppointments, initialPetOwners } from "../data/clinicData";

export default function MemberPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State untuk data pemilik, hewan, dan reservasi medis
  const [ownersList, setOwnersList] = useState(initialPetOwners || []);
  const [petsList, setPetsList] = useState(initialPets || []);
  const [appointmentsList, setAppointmentsList] = useState(initialAppointments || []);
  
  // State Pencarian & Pemilihan Pemilik Hewan
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");

  // State Promo dari Landing Page
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");

  // State Form Pendaftaran Member Baru
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    petName: "",
    species: "Kucing",
    breed: ""
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Tangkap data promo yang dikirim saat tombol klaim di Landing Page ditekan
  useEffect(() => {
    if (location.state?.promoName) {
      setSelectedPromo(location.state.promoName);
    }
  }, [location.state]);

  // Filter daftar pemilik berdasarkan keyword pencarian
  const filteredOwners = ownersList.filter(owner => 
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  // SINKRONISASI OTOMATIS: Mengubah data terpilih saat user mengetik di kolom pencarian
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (filteredOwners.length > 0) {
        setSelectedOwnerId(filteredOwners[0].id);
      } else {
        setSelectedOwnerId(""); 
      }
    }
  }, [searchQuery, ownersList]);

  // Fungsi untuk mereset filter kembali ke tampilan default bawaan
  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedOwnerId("");
  };

  // Penentuan ID Aktif (Jika kosong, tampilkan data Budi Santoso / OWN-001 secara default)
  const isDefaultView = !selectedOwnerId;
  const currentOwnerId = isDefaultView ? "OWN-001" : selectedOwnerId;

  // Ambil data aktif berdasarkan ID yang sedang berlaku
  const activeOwner = ownersList.find(o => o.id === currentOwnerId);
  const activePets = petsList.filter(p => p.ownerId === currentOwnerId);

  // Saring janji temu berdasarkan list ID anabul yang aktif
  const activePetIds = activePets.map(pet => pet.id);
  const activeAppointments = appointmentsList.filter(app => activePetIds.includes(app.petId));

  // Fungsi Menghitung Tier Berdasarkan Kunjungan
  const getTierDetails = (visits) => {
    if (visits >= 10) return { name: "Gold Tier", color: "from-amber-400 to-amber-600 text-amber-400 border-amber-500/30" };
    if (visits >= 5) return { name: "Silver Tier", color: "from-slate-400 to-slate-600 text-slate-300 border-slate-600" };
    return { name: "Bronze Tier", color: "from-orange-500 to-orange-700 text-orange-400 border-orange-800/40" };
  };

  // Fungsi Simulasi Klaim Promo ke Akun Terpilih
  const handleClaimPromo = () => {
    if (!activeOwner) return;

    const updatedOwners = ownersList.map(owner => {
      if (owner.id === activeOwner.id) {
        return { ...owner, totalVisits: owner.totalVisits + 1 };
      }
      return owner;
    });

    setOwnersList(updatedOwners);
    setPromoMessage(`Berhasil mengklaim "${selectedPromo}" untuk member ${activeOwner.name}! Poin keaktifan bertambah!`);
    setSelectedPromo(null);

    setTimeout(() => {
      setPromoMessage("");
    }, 5000);
  };

  // Fungsi Submit Pendaftaran Member Baru
  const handleRegisterMember = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.petName) return;

    const newOwnerId = `owner-${Date.now()}`;
    const newPetId = `pet-${Date.now()}`;

    const newOwner = {
      id: newOwnerId,
      name: formData.name,
      phone: formData.phone,
      totalVisits: 0
    };

    const newPet = {
      id: newPetId,
      ownerId: newOwnerId,
      name: formData.petName,
      species: formData.species,
      breed: formData.breed || "Campuran"
    };

    setOwnersList([newOwner, ...ownersList]);
    setPetsList([newPet, ...petsList]);
    
    setSearchQuery("");
    setSelectedOwnerId(newOwnerId); 
    setRegSuccess(true);
    
    setFormData({ name: "", phone: "", petName: "", species: "Kucing", breed: "" });
    setTimeout(() => setRegSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans p-6 selection:bg-purple-600 selection:text-white">
      <div className="container mx-auto max-w-6xl">
        
        {/* ==================== BANNER INFORMASI PROMO DARI LANDING PAGE ==================== */}
        {selectedPromo && (
          <div className="mb-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-md shadow-xl animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-3 rounded-xl text-white">
                <FaTag className="text-lg animate-bounce" />
              </div>
              <div>
                <h4 className="text-white font-black text-sm">Promo Terpilih Dari Beranda</h4>
                <p className="text-xs text-purple-300">Anda bermaksud mengklaim: <span className="text-white font-bold underline">{selectedPromo}</span></p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={handleClaimPromo}
                disabled={!activeOwner}
                className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FaGift /> Terapkan ke Member Aktif
              </button>
              <button 
                onClick={() => setSelectedPromo(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-400 font-medium px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* NOTIFIKASI SUKSES KLAIM */}
        {promoMessage && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <FaCheckCircle className="text-sm" /> {promoMessage}
          </div>
        )}

        {/* ==================== HEADER ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-all cursor-pointer"
          >
            <FaArrowLeft /> Kembali ke Beranda
          </button>
          <div className="flex items-center gap-3">
            <span className="text-right">
              <p className="text-white font-black text-sm">Portal Loyalis</p>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Paws & Care Ecosystem</p>
            </span>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl text-[#6366F1]">
              <FaIdCard className="text-xl" />
            </div>
          </div>
        </div>

        {/* ==================== MAIN CONTENT GRID ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: FORM REGISTRASI */}
          <div className="space-y-8 lg:col-span-1">
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
              <h3 className="text-white font-black text-base mb-1 flex items-center gap-2">
                <FaUserPlus className="text-purple-400" /> Daftar Member Baru
              </h3>
              <p className="text-slate-500 text-xs mb-6">Dapatkan akses rekam medis digital dan keuntungan benefit eksklusif.</p>
              
              {regSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2">
                  <FaCheckCircle /> Registrasi Berhasil! Kartu Anda telah diterbitkan.
                </div>
              )}

              <form onSubmit={handleRegisterMember} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Nama Lengkap Pemilik</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Budi Santoso" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Nomor Telepon / WA</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Contoh: 0812345678" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="border-t border-slate-800 my-2 pt-2"></div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Nama Hewan Peliharaan</label>
                  <input 
                    type="text" 
                    required
                    value={formData.petName}
                    onChange={(e) => setFormData({...formData, petName: e.target.value})}
                    placeholder="Contoh: Milo" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Jenis</label>
                    <select 
                      value={formData.species}
                      onChange={(e) => setFormData({...formData, species: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                    >
                      <option value="Kucing">Kucing</option>
                      <option value="Anjing">Anjing</option>
                      <option value="Kelinci">Kelinci</option>
                      <option value="Burung">Burung</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Ras / Breed</label>
                    <input 
                      type="text" 
                      value={formData.breed}
                      onChange={(e) => setFormData({...formData, breed: e.target.value})}
                      placeholder="Persia, dll" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-purple-900/20 mt-2 cursor-pointer"
                >
                  Dapatkan Kartu Member
                </button>
              </form>
            </div>
          </div>

          {/* KOLOM KANAN: PENCARIAN & DISPLAY KARTU */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PANEL SEARCH & DROPDOWN */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:max-w-xs">
                <FaSearch className="absolute left-4 top-3.5 text-slate-500 text-xs" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik nama pemilik / nomor HP..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 font-bold whitespace-nowrap">Hasil Filter:</label>
                  <select 
                    value={selectedOwnerId}
                    onChange={(e) => setSelectedOwnerId(e.target.value)}
                    className="w-full md:w-56 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                  >
                    <option value="" disabled={searchQuery === ""}>
                      {searchQuery === "" ? "Daftar Member Aktif" : "Pilih Member Terfilter"}
                    </option>
                    {filteredOwners.map(owner => (
                      <option key={owner.id} value={owner.id}>{owner.name} ({owner.phone})</option>
                    ))}
                    {filteredOwners.length === 0 && searchQuery !== "" && <option value="">Data tidak ditemukan</option>}
                  </select>
                </div>

                {/* TOMBOL RESET FILTER: Hanya muncul saat sedang melakukan filter pencarian */}
                {!isDefaultView && (
                  <button
                    onClick={handleResetFilter}
                    className="text-[10px] bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-2.5 py-2 rounded-xl transition-all font-black uppercase whitespace-nowrap cursor-pointer"
                  >
                    ✕ Reset
                  </button>
                )}
              </div>
            </div>

            {/* HASIL DATA MEMBER */}
            {activeOwner ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* TAMPILAN VISUAL KARTU MEMBER */}
                <div className={`md:col-span-1 bg-gradient-to-br ${getTierDetails(activeOwner.totalVisits).color} p-6 rounded-[2rem] border shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]`}>
                  <div className="absolute -right-4 -top-4 text-white/5 text-7xl rotate-12">
                    <FaCrown />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-slate-950/40 px-2.5 py-1 rounded-full text-white">
                        {getTierDetails(activeOwner.totalVisits).name}
                      </span>
                      <FaPaw className="text-white text-base" />
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight truncate">{activeOwner.name}</h2>
                    <p className="text-[10px] text-white/70 font-semibold mt-1 flex items-center gap-1">
                      <FaPhone className="text-[8px]" /> {activeOwner.phone}
                    </p>
                  </div>

                  <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl mt-4">
                    <div className="flex justify-between text-[10px] text-white/80 font-bold">
                      <span>Total Kunjungan:</span>
                      <span className="text-white font-black">{activeOwner.totalVisits}x</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-white/80 font-bold mt-1">
                      <span>Poin Keaktifan:</span>
                      <span className="text-emerald-300 font-black">{activeOwner.totalVisits * 150} pts</span>
                    </div>
                  </div>
                </div>

                {/* PASIEN HEWAN YANG TERHUBUNG */}
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-white font-black text-sm flex items-center gap-2">
                    <FaPaw className="text-purple-400" /> Pasien Terhubung ({activePets.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activePets.map(pet => (
                      <div key={pet.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-bold text-purple-400 bg-purple-500/5 px-2 py-0.5 rounded-md border border-purple-500/10">
                              {pet.species}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          </div>
                          <h5 className="font-extrabold text-white text-sm">{pet.name}</h5>
                          <p className="text-[11px] text-slate-500 font-medium truncate">Ras: {pet.breed}</p>
                        </div>
                      </div>
                    ))}
                    {activePets.length === 0 && (
                      <div className="col-span-2 bg-slate-900/40 p-6 border border-slate-800/60 border-dashed rounded-2xl text-center text-xs text-slate-500">
                        Belum ada hewan peliharaan terdaftar untuk pemilik ini.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl text-slate-500 text-sm">
                Nama pemilik atau nomor HP tidak ditemukan. Silakan daftarkan member baru di kolom sebelah kiri.
              </div>
            )}

            {/* PANEL RESERVASI DINAMIS */}
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem]">
              <h3 className="text-white font-black text-sm mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-rose-400" /> 
                  Reservasi Medis Aktif
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono">
                  {activeAppointments.length} Agenda
                </span>
              </h3>
              
              {activeAppointments.length > 0 ? (
                <div className="space-y-3">
                  {activeAppointments.map((app) => {
                    const petName = petsList.find(p => p.id === app.petId)?.name || "Anabul";
                    return (
                      <div key={app.id} className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl flex justify-between items-center animate-fade-in">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-black text-white">{petName}</p>
                            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-mono">{app.id}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{app.service || "Check-up Medis"}</p>
                          <p className="text-[10px] text-purple-400 font-bold mt-1">{app.date} • {app.time} WIB</p>
                        </div>
                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          app.status === "Selesai" || app.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {app.status === "Scheduled" ? "Terjadwal" : app.status || "Pending"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                  <p className="text-xs text-slate-500 font-medium">Semua janji temu check-up selesai atau belum teragendakan.</p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ==================== FOOTER ==================== */}
        <div className="mt-16 pt-6 border-t border-slate-900 flex justify-between items-center text-xs text-slate-600">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider hover:bg-rose-500/10 px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <FaSignOutAlt /> Keluar Dashboard
          </button>
          <p>© 2026 Paws & Care Core.</p>
        </div>

      </div>
    </div>
  );
}