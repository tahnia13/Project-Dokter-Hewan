import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEye,
  FaTrash,
  FaFilter,
  FaShieldAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaChartLine,
  FaCrown,
  FaCalendarAlt,
  FaPaw
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Card from "./Components/Card";
import Container from "./Components/Container";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import Table from "./Components/Table";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import Loading from "./Components/Loading";
import ProgressBar from "./Components/ProgressBar";
import { initialPetOwners, initialPets, initialAppointments } from "../data/clinicData";

const getMembershipType = (visits) => {
  if (visits >= 10) return "Gold";
  if (visits >= 5) return "Silver";
  return "Bronze";
};

export default function CustomerCRM() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMembership, setFilterMembership] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const searchInputRef = useRef(null);

  const totalCustomers = owners.length;
  const activeMembers = owners.filter((owner) => owner.totalVisits >= 5).length;
  const complaintCount = initialAppointments.filter((apt) => apt.status === "Cancelled").length;
  const totalTransactions = owners.reduce((total, owner) => total + owner.totalVisits * 175000, 0);
  const transactionText = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalTransactions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOwners(initialPetOwners || []);
      setIsLoading(false);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getOwnerPets = (ownerId) => {
    return initialPets
      .filter((pet) => pet.ownerId === ownerId)
      .map((pet) => pet.name)
      .join(", ");
  };

  const handleDelete = (e, ownerId, ownerName) => {
    e.stopPropagation(); // Mencegah modal terbuka saat tombol hapus diklik
    if (!window.confirm(`Apakah Anda yakin ingin menghapus pelanggan ${ownerName} dari sistem?`)) return;
    
    setOwners((prev) => prev.filter((owner) => owner.id !== ownerId));
    setToastMessage(`Pelanggan ${ownerName} berhasil dihapus dari database.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleViewDetail = (owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const filteredOwners = owners.filter((owner) => {
    const text = `${owner.name} ${owner.email} ${owner.phone}`.toLowerCase();
    const membership = getMembershipType(owner.totalVisits);
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesFilter = filterMembership === "all" || membership === filterMembership;
    return matchesSearch && matchesFilter;
  });

  const headers = ["Biodata Pelanggan", "Informasi Kontak", "Segmentasi", "Nilai Transaksi", "Hewan Peliharaan", "Aksi"];

  const statusOptions = [
    { value: "all", label: "Semua Tingkatan" },
    { value: "Gold", label: "🥇 Member Gold" },
    { value: "Silver", label: "🥈 Member Silver" },
    { value: "Bronze", label: "🥉 Member Bronze" },
  ];

  if (isLoading) return <Loading fullScreen text="Sinkronisasi pangkalan data pelanggan..." />;

  return (
    <div id="customer-crm-page" className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Page Header */}
      <PageHeader title="👥 Customer CRM Analytics" breadcrumb={["Manajemen Bisnis", "Customer CRM"]}>
        <Button type="primary" onClick={() => navigate("/pet-owners")} className="bg-[#432C81] hover:bg-[#322061] transition-all transform hover:scale-105"> 
          <FaPlus size={12} className="mr-2" /> Registrasi Pelanggan Baru
        </Button>
      </PageHeader>

      <Container>
        {/* Top Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Pelanggan</p>
              <h3 className="text-3xl font-black text-[#432C81] mt-1">{totalCustomers}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Entitas terdaftar aktif</p>
            </div>
            <div className="bg-purple-50 text-[#432C81] p-3.5 rounded-xl"><FaUser size={20} /></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loyal Members</p>
              <h3 className="text-3xl font-black text-[#432C81] mt-1">{activeMembers}</h3>
              <p className="text-[11px] text-emerald-600 mt-1 font-medium">✨ Kunjungan &gt;= 5 Kali</p>
            </div>
            <div className="bg-amber-50 text-amber-500 p-3.5 rounded-xl"><FaCrown size={20} /></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Janji Dibatalkan</p>
              <h3 className="text-3xl font-black text-rose-600 mt-1">{complaintCount}</h3>
              <p className="text-[11px] text-slate-400 mt-1">Perlu tindak lanjut CRM</p>
            </div>
            <div className="bg-rose-50 text-rose-500 p-3.5 rounded-xl"><FaClipboardList size={20} /></div>
          </div>

          <div className="bg-gradient-to-br from-[#432C81] to-[#5C3EB3] border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between text-white transform hover:-translate-y-0.5 transition-all">
            <div>
              <p className="text-xs font-semibold text-purple-200 uppercase tracking-wider">Omset Bruto CRM</p>
              <h3 className="text-xl font-black mt-1.5 whitespace-nowrap">{transactionText}</h3>
              <p className="text-[11px] text-purple-100 mt-1 font-light">Estimasi dari riwayat kunjungan</p>
            </div>
            <div className="bg-white/20 text-white p-3.5 rounded-xl"><FaMoneyBillWave size={20} /></div>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#CCC3FF]/30 p-5 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold mb-2">
                <FaChartLine /> Intelegensi Bisnis Mandiri
              </div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">Segmentasi Basis Pelanggan</h2>
              <p className="text-sm text-slate-500">Gunakan filter cerdas di bawah untuk menyaring pelanggan prioritas berdasarkan tingkat loyalitas kunjungan.</p>
            </div>
            <div className="flex gap-4 items-center sm:self-end lg:self-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Pangsa Pasar Terbesar</p>
                <p className="font-bold text-slate-800 text-sm">Cluster Gold & Silver</p>
              </div>
              <div className="rounded-xl bg-[#ECFDF5] px-3.5 py-2 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                <FaShieldAlt /> 94.2% Retensi
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <InputField
                ref={searchInputRef}
                label="Pencarian Global Data"
                name="search"
                placeholder="Ketik nama pemilik, alamat email, atau nomor telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
            </div>
            <div>
              <SelectField
                label="Saring Kelas Kunjungan"
                name="membership"
                options={statusOptions}
                value={filterMembership}
                onChange={(e) => setFilterMembership(e.target.value)}
                icon={FaFilter}
              />
            </div>
          </div>
        </div>

        {/* Main Table Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Arsip Profil Pelanggan Resmi</h3>
            <span className="text-xs bg-purple-50 text-[#432C81] px-2.5 py-1 rounded-md font-semibold">Menampilkan {filteredOwners.length} Baris</span>
          </div>
          
          <Table headers={headers}>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((owner) => {
                const membership = getMembershipType(owner.totalVisits);
                const individualTransaction = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(owner.totalVisits * 175000);
                
                return (
                  <tr key={owner.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer border-b border-slate-100 last:border-0" onClick={() => handleViewDetail(owner)}>
                    {/* Biodata */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-2.5 rounded-xl text-[#432C81] shrink-0"><FaUser size={14} /></div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm group-hover:text-[#432C81]">{owner.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono tracking-wider">{owner.id}</div>
                        </div>
                      </div>
                    </td>
                    {/* Kontak */}
                    <td className="p-4">
                      <div className="text-xs text-slate-700 font-medium flex items-center gap-1"><FaPhone className="text-slate-400 text-[10px]" /> {owner.phone}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FaEnvelope className="text-slate-400 text-[10px]" /> {owner.email}</div>
                    </td>
                    {/* Membership */}
                    <td className="p-4">
                      <Badge type={membership === "Gold" ? "success" : membership === "Silver" ? "warning" : "info"}>
                        {membership === "Gold" ? "🥇 Gold" : membership === "Silver" ? "🥈 Silver" : "🥉 Bronze"}
                      </Badge>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><FaCalendarAlt /> {owner.joinDate}</div>
                    </td>
                    {/* Transaksi */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-xs">{individualTransaction}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{owner.totalVisits} Kunjungan Medis</div>
                    </td>
                    {/* Hewan */}
                    <td className="p-4 max-w-xs">
                      <div className="text-xs font-semibold text-slate-700 truncate flex items-center gap-1"><FaPaw className="text-purple-400 text-[11px]" /> {getOwnerPets(owner.id) || "Belum mendaftarkan hewan"}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1"><FaMapMarkerAlt /> {owner.address}</div>
                    </td>
                    {/* Aksi */}
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => handleViewDetail(owner)} title="Lihat Rekam Medis">
                          <FaEye size={15} />
                        </button>
                        <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" onClick={(e) => handleDelete(e, owner.id, owner.name)} title="Hapus Pelanggan">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-12 text-slate-400 bg-slate-50/50 text-sm font-medium">
                  Matriks data kosong. Tidak ada data pelanggan yang cocok dengan kriteria filter.
                </td>
              </tr>
            )}
          </Table>
        </div>

        {/* Bottom Metrics Breakdown */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
          <Card title="Proporsi Distribusi Tingkatan Tier">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cluster Platinum Gold</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{owners.filter((o) => getMembershipType(o.totalVisits) === "Gold").length} <span className="text-xs font-medium text-slate-400">Jiwa</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(owners.filter((o) => getMembershipType(o.totalVisits) === "Gold").length / Math.max(totalCustomers, 1)) * 100} label="Kepadatan Kontribusi" showPercentage={true} size="sm" color="success" />
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cluster Medium Silver</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{owners.filter((o) => getMembershipType(o.totalVisits) === "Silver").length} <span className="text-xs font-medium text-slate-400">Jiwa</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(owners.filter((o) => getMembershipType(o.totalVisits) === "Silver").length / Math.max(totalCustomers, 1)) * 100} label="Kepadatan Kontribusi" showPercentage={true} size="sm" color="info" />
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cluster Standar Bronze</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{owners.filter((o) => getMembershipType(o.totalVisits) === "Bronze").length} <span className="text-xs font-medium text-slate-400">Jiwa</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(owners.filter((o) => getMembershipType(o.totalVisits) === "Bronze").length / Math.max(totalCustomers, 1)) * 100} label="Kepadatan Kontribusi" showPercentage={true} size="sm" color="warning" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Aktivitas Penjualan & Konversi">
            <div className="space-y-3.5">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-100 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-emerald-800">Tingkat Konversi Promo</p>
                  <p className="text-2xl font-black text-emerald-700 mt-0.5">10.6%</p>
                </div>
                <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-md">Healty</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Estimasi Jangkauan Pasar</p>
                  <p className="text-2xl font-black text-[#432C81] mt-0.5">{(totalCustomers * 900).toLocaleString("id-ID")}</p>
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Multipliers</span>
              </div>
              <div className="bg-[#F8FAFF] p-3.5 rounded-xl border border-blue-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-1">Aktivitas Terkini Antrean</p>
                <p className="text-xs font-bold text-slate-700 truncate">
                  {owners.slice(0, 2).map((owner) => owner.name).join(", ")} &amp; selebihnya telah diperbarui.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>

      {/* Detail Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="📋 Dokumen Profil Pelanggan">
        {selectedOwner && (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs font-medium">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Nama Lengkap</p>
                <p className="text-slate-800 text-sm font-bold mt-0.5">{selectedOwner.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">ID Rekam Pelanggan</p>
                <p className="text-slate-700 font-mono mt-0.5">{selectedOwner.id}</p>
              </div>
              <div className="col-span-2 border-t border-slate-200/60 pt-2">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Alamat Domisili Resmi</p>
                <p className="text-slate-700 mt-0.5">{selectedOwner.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Kontak Seluler</p>
                <p className="text-slate-800 font-semibold mt-1">{selectedOwner.phone}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Alamat Email</p>
                <p className="text-slate-800 font-semibold mt-1 truncate">{selectedOwner.email}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Tanggal Registrasi</p>
                <p className="text-slate-800 font-semibold mt-1">{selectedOwner.joinDate}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Total Frekuensi Kunjungan</p>
                <p className="text-slate-800 font-bold mt-1 text-purple-700">{selectedOwner.totalVisits} Kali Sesi</p>
              </div>
            </div>

            <div className="bg-purple-50/50 p-3.5 border border-purple-100 rounded-xl">
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wide">Hewan Terpelihara Terikat</p>
              <p className="text-xs font-bold text-[#432C81] mt-1 flex items-center gap-1">
                <FaPaw /> {getOwnerPets(selectedOwner.id) || "Belum mendaftarkan hewan peliharaan apa pun"}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="primary" onClick={() => setIsModalOpen(false)} className="w-full justify-center py-2.5 font-bold">
                Selesai &amp; Tutup Berkas
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Dynamic Toast Feedback System */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}