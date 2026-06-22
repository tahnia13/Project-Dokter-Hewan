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
  FaPaw,
  FaGift,
  FaStar,
  FaTrophy
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

const getMemberBadge = (visits) => {
  if (visits >= 10) return { type: "success", label: "🥇 Gold Member", icon: FaCrown };
  if (visits >= 5) return { type: "warning", label: "🥈 Silver Member", icon: FaStar };
  return { type: "info", label: "🥉 Bronze Member", icon: FaShieldAlt };
};

const getMemberBenefits = (visits) => {
  if (visits >= 10) return ["Vaksinasi Gratis", "Diskon 20%", "Prioritas Booking", "Hadiah Ulang Tahun"];
  if (visits >= 5) return ["Diskon 10%", "Prioritas Booking"];
  return ["Konsultasi Gratis Pertama"];
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
  const goldMembers = owners.filter((o) => getMembershipType(o.totalVisits) === "Gold").length;
  const silverMembers = owners.filter((o) => getMembershipType(o.totalVisits) === "Silver").length;
  const bronzeMembers = owners.filter((o) => getMembershipType(o.totalVisits) === "Bronze").length;
  const complaintCount = initialAppointments.filter((apt) => apt.status === "Cancelled").length;

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
    e.stopPropagation();
    if (!window.confirm(`Apakah Anda yakin ingin menghapus member ${ownerName} dari sistem?`)) return;
    
    setOwners((prev) => prev.filter((owner) => owner.id !== ownerId));
    setToastMessage(`Member ${ownerName} berhasil dihapus.`);
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

  const headers = ["Member", "Kontak", "Tingkatan", "Kunjungan", "Hewan", "Aksi"];

  const statusOptions = [
    { value: "all", label: "Semua Member" },
    { value: "Gold", label: "🥇 Gold Member (10+ kunjungan)" },
    { value: "Silver", label: "🥈 Silver Member (5-9 kunjungan)" },
    { value: "Bronze", label: "🥉 Bronze Member (1-4 kunjungan)" },
  ];

  if (isLoading) return <Loading fullScreen text="Memuat data member..." />;

  return (
    <div id="customer-crm-page" className="min-h-screen bg-[#F8FAFC] pb-16">
      <PageHeader title="👥 Data Member Paws & Care" breadcrumb={["Manajemen", "Data Member"]}>
        <Button type="primary" onClick={() => navigate("/pet-owners")} className="bg-[#432C81] hover:bg-[#322061] transition-all"> 
          <FaPlus size={12} className="mr-2" /> Registrasi Member Baru
        </Button>
      </PageHeader>

      <Container>
        {/* Member Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Member</p>
              <h3 className="text-2xl font-black text-[#432C81] mt-1">{totalCustomers}</h3>
            </div>
            <div className="bg-purple-50 text-[#432C81] p-3 rounded-xl"><FaUser size={18} /></div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-bold text-yellow-100 uppercase tracking-wider">🥇 Gold</p>
              <h3 className="text-2xl font-black mt-1">{goldMembers}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-xl"><FaCrown size={18} /></div>
          </div>

          <div className="bg-gradient-to-r from-gray-300 to-gray-400 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-bold text-gray-200 uppercase tracking-wider">🥈 Silver</p>
              <h3 className="text-2xl font-black mt-1">{silverMembers}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-xl"><FaStar size={18} /></div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-amber-700 border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between text-white">
            <div>
              <p className="text-xs font-bold text-amber-200 uppercase tracking-wider">🥉 Bronze</p>
              <h3 className="text-2xl font-black mt-1">{bronzeMembers}</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-xl"><FaShieldAlt size={18} /></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Komplain</p>
              <h3 className="text-2xl font-black text-rose-600 mt-1">{complaintCount}</h3>
            </div>
            <div className="bg-rose-50 text-rose-500 p-3 rounded-xl"><FaClipboardList size={18} /></div>
          </div>
        </div>

        {/* Keuntungan Member */}
        <div className="bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-2xl p-5 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <FaGift /> Keuntungan Member
              </h3>
              <p className="text-sm opacity-80">Semakin sering berkunjung, semakin banyak keuntungan yang didapat!</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs opacity-80">🥇 Gold</p>
                <p className="text-sm font-bold">Vaksinasi Gratis</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs opacity-80">🥈 Silver</p>
                <p className="text-sm font-bold">Diskon 10%</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs opacity-80">🥉 Bronze</p>
                <p className="text-sm font-bold">Konsultasi Gratis</p>
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
                label="Cari Member"
                name="search"
                placeholder="Cari nama, email, atau telepon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
            </div>
            <div>
              <SelectField
                label="Filter Tingkatan"
                name="membership"
                options={statusOptions}
                value={filterMembership}
                onChange={(e) => setFilterMembership(e.target.value)}
                icon={FaFilter}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Daftar Member</h3>
            <span className="text-xs bg-purple-50 text-[#432C81] px-2.5 py-1 rounded-md font-semibold">{filteredOwners.length} Member</span>
          </div>
          
          <Table headers={headers}>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((owner) => {
                const membership = getMembershipType(owner.totalVisits);
                const memberBadge = getMemberBadge(owner.totalVisits);
                const benefits = getMemberBenefits(owner.totalVisits);
                
                return (
                  <tr key={owner.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer border-b border-slate-100 last:border-0" onClick={() => handleViewDetail(owner)}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-50 p-2.5 rounded-xl text-[#432C81] shrink-0"><FaUser size={14} /></div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{owner.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{owner.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs text-slate-700 flex items-center gap-1"><FaPhone className="text-slate-400 text-[10px]" /> {owner.phone}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><FaEnvelope className="text-slate-400 text-[10px]" /> {owner.email}</div>
                    </td>
                    <td className="p-4">
                      <Badge type={memberBadge.type}>{memberBadge.label}</Badge>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><FaCalendarAlt /> Gabung: {owner.joinDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm">{owner.totalVisits} Kali</div>
                      <div className="text-[10px] text-slate-500">Kunjungan</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <div className="text-xs font-semibold text-slate-700 truncate flex items-center gap-1"><FaPaw className="text-purple-400 text-[11px]" /> {getOwnerPets(owner.id) || "Belum ada hewan"}</div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1"><FaMapMarkerAlt /> {owner.address}</div>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => handleViewDetail(owner)}>
                          <FaEye size={15} />
                        </button>
                        <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" onClick={(e) => handleDelete(e, owner.id, owner.name)}>
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
                  Tidak ada data member yang cocok dengan filter.
                </td>
              </tr>
            )}
          </Table>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
          <Card title="Distribusi Tingkatan Member">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">🥇 Gold</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{goldMembers} <span className="text-xs font-medium text-slate-400">Member</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(goldMembers / Math.max(totalCustomers, 1)) * 100} label="Kontribusi" showPercentage={true} size="sm" color="success" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">✅ 10+ kunjungan</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">🥈 Silver</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{silverMembers} <span className="text-xs font-medium text-slate-400">Member</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(silverMembers / Math.max(totalCustomers, 1)) * 100} label="Kontribusi" showPercentage={true} size="sm" color="info" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">✅ 5-9 kunjungan</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">🥉 Bronze</p>
                <p className="text-3xl font-black text-[#432C81] mt-1">{bronzeMembers} <span className="text-xs font-medium text-slate-400">Member</span></p>
                <div className="mt-3">
                  <ProgressBar percentage={(bronzeMembers / Math.max(totalCustomers, 1)) * 100} label="Kontribusi" showPercentage={true} size="sm" color="warning" />
                </div>
                <p className="text-[10px] text-slate-400 mt-2">✅ 1-4 kunjungan</p>
              </div>
            </div>
          </Card>

          <Card title="🎁 Keuntungan Member">
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3.5 rounded-xl border border-yellow-100">
                <p className="text-xs font-bold text-yellow-800">🥇 Gold Member</p>
                <ul className="text-xs text-yellow-700 mt-1 space-y-0.5">
                  <li>• Vaksinasi Gratis (1x/tahun)</li>
                  <li>• Diskon 20% semua layanan</li>
                  <li>• Prioritas booking</li>
                  <li>• Hadiah ulang tahun pet</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-3.5 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-700">🥈 Silver Member</p>
                <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                  <li>• Diskon 10% semua layanan</li>
                  <li>• Prioritas booking</li>
                </ul>
              </div>
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800">🥉 Bronze Member</p>
                <ul className="text-xs text-amber-700 mt-1 space-y-0.5">
                  <li>• Konsultasi gratis pertama</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="📋 Detail Member">
        {selectedOwner && (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-4 text-xs font-medium">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">Nama</p>
                <p className="text-slate-800 text-sm font-bold mt-0.5">{selectedOwner.name}</p>
              </div>
              <div>
                <p className="text-slate-400 font-bold uppercase text-[10px]">ID Member</p>
                <p className="text-slate-700 font-mono mt-0.5">{selectedOwner.id}</p>
              </div>
              <div className="col-span-2 border-t border-slate-200/60 pt-2">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Alamat</p>
                <p className="text-slate-700 mt-0.5">{selectedOwner.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Telepon</p>
                <p className="text-slate-800 font-semibold mt-1">{selectedOwner.phone}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Email</p>
                <p className="text-slate-800 font-semibold mt-1 truncate">{selectedOwner.email}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Bergabung</p>
                <p className="text-slate-800 font-semibold mt-1">{selectedOwner.joinDate}</p>
              </div>
              <div className="p-3 border rounded-xl bg-white">
                <p className="text-slate-400 font-bold text-[10px] uppercase">Total Kunjungan</p>
                <p className="text-slate-800 font-bold mt-1 text-purple-700">{selectedOwner.totalVisits} Kali</p>
              </div>
            </div>

            <div className="bg-purple-50/50 p-3.5 border border-purple-100 rounded-xl">
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wide">Hewan Peliharaan</p>
              <p className="text-xs font-bold text-[#432C81] mt-1 flex items-center gap-1">
                <FaPaw /> {getOwnerPets(selectedOwner.id) || "Belum ada hewan terdaftar"}
              </p>
            </div>

            <div className="bg-green-50 p-3.5 border border-green-100 rounded-xl">
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wide">🎁 Keuntungan Member</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {getMemberBenefits(selectedOwner.totalVisits).map((benefit, idx) => (
                  <Badge key={idx} type="success">{benefit}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="primary" onClick={() => setIsModalOpen(false)} className="w-full justify-center py-2.5 font-bold">
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}