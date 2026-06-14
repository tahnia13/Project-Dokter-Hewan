import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaDog,
  FaCat,
  FaPaw,
  FaEdit,
  FaTrash,
  FaEye,
  FaHeartbeat,
  FaUser,
  FaWeightHanging,
  FaCalendarAlt,
  FaVenusMars,
  FaIdCard,
  FaStethoscope
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Table from "./Components/Table";
import InputField from "./Components/InputField";
import Card from "./Components/Card";
import Container from "./Components/Container";
import Toast from "./Components/Toast";
import Modal from "./Components/Modal";
import Loading from "./Components/Loading";
import {
  initialPets,
  initialPetOwners,
  getOwnerName,
} from "../data/clinicData";
import {
  translateHealthStatus,
  translatePetType,
  translateGender,
} from "../lib/utils";

export default function Pets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([]);
  const [owners] = useState(initialPetOwners);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(initialPets);
      setIsLoading(false);
      searchInputRef.current?.focus();
      setStatusMessage("Sistem pencarian aktif");
      setResultCount(initialPets.length);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ========== LOGIKA PENYARINGAN SINKRON (SEARCH + TABS) ==========
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getOwnerName(pet.id, owners).toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === "dogs") return pet.type === "Dog";
    if (filterType === "cats") return pet.type === "Cat";
    return true;
  });

  useEffect(() => {
    setResultCount(filteredPets.length);
    if (searchTerm) {
      setStatusMessage(`Diperbarui otomatis: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
    }
  }, [searchTerm, filterType, pets]);

  // Perhitungan total konstan untuk label tab pembantu
  const totalAll = pets.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || getOwnerName(p.id, owners).toLowerCase().includes(searchTerm.toLowerCase())).length;
  const totalDogs = pets.filter(p => p.type === "Dog" && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || getOwnerName(p.id, owners).toLowerCase().includes(searchTerm.toLowerCase()))).length;
  const totalCats = pets.filter(p => p.type === "Cat" && (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || getOwnerName(p.id, owners).toLowerCase().includes(searchTerm.toLowerCase()))).length;

  const getPetIcon = (type) => {
    if (type === "Dog") return <FaDog className="text-[#432C81] text-lg" />;
    if (type === "Cat") return <FaCat className="text-[#432C81] text-lg" />;
    return <FaPaw className="text-[#432C81] text-lg" />;
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data pasien "${name}" secara permanen?`)) {
      const newPets = pets.filter((pet) => pet.id !== id);
      setPets(newPets);
      setToastMessage(`✅ Data pasien ${name} berhasil dihapus dari sistem.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const headers = [
    "ID Pasien",
    "Nama Hewan",
    "Jenis & Ras",
    "Pemilik",
    "Status Kesehatan",
    "Aksi",
  ];

  const getBadgeType = (status) => {
    if (status === "Healthy") return "success";
    if (status === "Under Treatment") return "warning";
    return "info";
  };

  const renderPetTable = (petList) => (
    <div className="overflow-x-auto -mx-5 -my-3">
      <Table headers={headers}>
        {petList.length > 0 ? (
          petList.map((pet) => (
            <tr
              key={pet.id}
              className="hover:bg-purple-50/40 transition-colors duration-200 cursor-pointer border-b border-slate-100"
              onClick={() => handleViewDetail(pet)}
            >
              <td className="px-5 py-4 text-[#432C81] font-mono font-bold text-xs tracking-wider">{pet.id}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3.5">
                  <div className="bg-purple-100/60 p-2.5 rounded-xl border border-purple-200/40 shadow-inner">
                    {getPetIcon(pet.type)}
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-800 tracking-tight block group-hover:text-[#432C81]">{pet.name}</span>
                    <span className="text-[11px] text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-md mt-0.5 inline-block">
                      {translateGender(pet.gender)} • {pet.age} Thn
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-700">{translatePetType(pet.type)}</span>
                <span className="text-xs text-slate-400 block mt-0.5 font-mono">{pet.breed}</span>
              </td>
              <td className="px-5 py-4 text-sm font-bold text-slate-700">{getOwnerName(pet.id, owners)}</td>
              <td className="px-5 py-4">
                <Badge type={getBadgeType(pet.healthStatus)}>
                  {translateHealthStatus(pet.healthStatus)}
                </Badge>
              </td>
              <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-2.5">
                  <Link
                    to={`/pets/${pet.id}`}
                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-100 transition-all duration-200"
                    title="Lihat Detail Rekam Medis"
                  >
                    <FaEye size={14} />
                  </Link>
                  <button
                    className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white hover:shadow-md hover:shadow-amber-100 transition-all duration-200"
                    title="Ubah Data"
                  >
                    <FaEdit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(pet.id, pet.name)}
                    className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white hover:shadow-md hover:shadow-red-100 transition-all duration-200"
                    title="Hapus Pasien"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-12 text-slate-400 font-medium text-sm">
              🔍 Tidak ditemukan pasien yang cocok dengan kriteria pencarian Anda.
            </td>
          </tr>
        )}
      </Table>
    </div>
  );

  if (isLoading) return <Loading fullScreen text="Memuat basis data pasien..." />;

  return (
    <div id="pets-page" className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased">
      {/* Header Halaman */}
      <div className="mb-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <PageHeader title="Database Manajemen Pasien" breadcrumb={["Pasien", "Daftar Aktif"]}>
          <button 
            className="btn bg-[#432C81] hover:bg-[#342264] text-white font-semibold text-sm rounded-xl px-5 border-none shadow-md shadow-purple-200 flex items-center gap-2 transition-all duration-200"
            onClick={() => navigate("/add-pet")}
          >
            <FaPlus size={12} /> Tambah Pasien Baru
          </button>
        </PageHeader>
      </div>

      <Container>
        {/* Panel Pencarian Premium */}
        <div className="transform hover:scale-[1.002] transition-all duration-300 mb-6">
          <Card title="Pencarian Cepat & Filter Pasien">
            <div className="relative">
              <InputField
                ref={searchInputRef}
                label=""
                name="search"
                placeholder="Masukkan nama pasien hewan atau nama pemilik di sini..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
            </div>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="text-xs font-bold text-[#432C81] bg-purple-50 border border-purple-100 px-3 py-1 rounded-xl shadow-inner">
                Ditemukan: {resultCount} Pasien
              </span>
              <span className="text-[11px] text-slate-400 font-mono font-medium">{statusMessage}</span>
            </div>
          </Card>
        </div>

        {/* Blok Utama Tabel Konten */}
        <div className="mt-6 transform hover:scale-[1.001] transition-all duration-300">
          <Card title="Daftar Rekam Medis Hewan Peliharaan">
            {/* Navigasi Filter Spesies Gaya DaisyUI Modern */}
            <div role="tablist" className="tabs tabs-bordered mb-5 font-semibold text-sm">
              <button
                role="tab"
                className={`tab pb-3 transition-all duration-200 ${filterType === "all" ? "tab-active border-[#432C81] text-[#432C81] font-bold" : "text-slate-400 border-transparent hover:text-slate-600"}`}
                onClick={() => setFilterType("all")}
              >
                📋 Semua Jenis ({totalAll})
              </button>
              <button
                role="tab"
                className={`tab pb-3 transition-all duration-200 ${filterType === "dogs" ? "tab-active border-[#432C81] text-[#432C81] font-bold" : "text-slate-400 border-transparent hover:text-slate-600"}`}
                onClick={() => setFilterType("dogs")}
              >
                🐕 Spesies Anjing ({totalDogs})
              </button>
              <button
                role="tab"
                className={`tab pb-3 transition-all duration-200 ${filterType === "cats" ? "tab-active border-[#432C81] text-[#432C81] font-bold" : "text-slate-400 border-transparent hover:text-slate-600"}`}
                onClick={() => setFilterType("cats")}
              >
                🐈 Spesies Kucing ({totalCats})
              </button>
            </div>

            {/* Render Konten Berdasarkan Pilihan Tab */}
            {renderPetTable(filteredPets)}
          </Card>
        </div>

        {/* Ringkasan Infografis Kartu Bawah */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#432C81] to-[#6D47B8] text-white p-5 rounded-2xl shadow-lg shadow-purple-900/10 flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">Total Terregistrasi</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1">{pets.length}</p>
              <p className="text-[11px] text-white/70 font-medium mt-1">Ekor hewan di database</p>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <FaPaw size={26} className="text-white/80" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Rasio Distribusi Ras</p>
              <div className="flex gap-4 mt-2.5">
                <div className="flex items-center gap-1.5">
                  <FaDog className="text-blue-500 text-sm" />
                  <span className="text-sm font-bold text-slate-800 font-mono">{pets.filter((p) => p.type === "Dog").length}</span>
                  <span className="text-[10px] font-semibold text-slate-400">Anjing</span>
                </div>
                <div className="flex items-center gap-1.5 border-l border-slate-100 pl-4">
                  <FaCat className="text-orange-500 text-sm" />
                  <span className="text-sm font-bold text-slate-800 font-mono">{pets.filter((p) => p.type === "Cat").length}</span>
                  <span className="text-[10px] font-semibold text-slate-400">Kucing</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <FaHeartbeat size={24} className="text-slate-400" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Kondisi Klinik Saat Ini</p>
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg inline-block w-fit">
                  🟢 Sehat Prima: {pets.filter((p) => p.healthStatus === "Healthy").length} Pasien
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg inline-block w-fit">
                  🟡 Fase Perawatan: {pets.filter((p) => p.healthStatus === "Under Treatment").length} Sesi
                </span>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <FaStethoscope size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </Container>

      {/* Modal Detail Pasien Premium */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="📋 Ringkasan Profil Pasien Klinik"
      >
        {selectedPet && (
          <div className="space-y-5 text-slate-700 bg-white p-1">
            {/* Bagian Atas/Header Modal Pasien */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="bg-purple-50 p-4 rounded-2xl text-2xl border border-purple-100/50 shadow-inner text-[#432C81]">
                {selectedPet.type === "Dog" ? <FaDog /> : selectedPet.type === "Cat" ? <FaCat /> : <FaPaw />}
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-slate-800 tracking-tight leading-tight">{selectedPet.name}</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5 tracking-wide">
                  Ras: {selectedPet.breed} • {translatePetType(selectedPet.type)}
                </p>
              </div>
            </div>

            {/* Grid Detail Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaIdCard className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">ID Registrasi Pasien</p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{selectedPet.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaUser className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Nama Pemilik (Owner)</p>
                  <p className="font-bold text-slate-800 mt-0.5">{getOwnerName(selectedPet.id, owners)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaCalendarAlt className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Umur Pasien</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedPet.age} Tahun</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaVenusMars className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Gender / Jenis Kelamin</p>
                  <p className="font-bold text-slate-800 mt-0.5">{translateGender(selectedPet.gender)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaWeightHanging className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Berat Badan Saat Ini</p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{selectedPet.weight || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100/70">
                <FaHeartbeat className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Status Kesehatan Utama</p>
                  <div className="mt-0.5">
                    <Badge type={getBadgeType(selectedPet.healthStatus)}>
                      {translateHealthStatus(selectedPet.healthStatus)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi Bawah Modal */}
            <div className="pt-4 border-t border-slate-100 flex gap-3">
              <Link 
                to={`/pets/${selectedPet.id}`}
                className="btn bg-[#432C81] hover:bg-[#342264] text-white flex-1 font-semibold text-xs rounded-xl h-10 min-h-fit border-none text-center flex items-center justify-center transition-colors"
              >
                Buka Seluruh Rekam Medis →
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-xl h-10 min-h-fit border-none px-5 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Komponen Feedback Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}