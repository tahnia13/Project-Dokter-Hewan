import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaw,
  FaEye,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaAddressCard,
  FaIdCard,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Table from "./Components/Table";
import InputField from "./Components/InputField";
import Card from "./Components/Card";
import Container from "./Components/Container";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import Loading from "./Components/Loading";
import { translatePetType } from "../lib/utils";
import { initialPetOwners, initialPets } from "../data/clinicData";

export default function PetOwners() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const renderCountRef = useRef(0);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const pets = initialPets;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOwners(initialPetOwners);
      setIsLoading(false);
      searchInputRef.current?.focus();
      setStatusMessage("Pencarian siap digunakan");
      setResultCount(initialPetOwners.length);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    renderCountRef.current += 1;
    const filtered = owners.filter(
      (owner) =>
        owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        owner.phone.includes(searchTerm),
    );
    setResultCount(filtered.length);
    setStatusMessage(`Diperbarui: ${new Date().toLocaleTimeString()} WIB`);
  }, [searchTerm, owners]);

  const getOwnerPets = (ownerId) => {
    const ownerPets = pets.filter((pet) => pet.ownerId === ownerId);
    return ownerPets
      .map((pet) => `${pet.name} (${translatePetType(pet.type)})`)
      .join(", ");
  };

  const getPetCount = (ownerId) => {
    return pets.filter((pet) => pet.ownerId === ownerId).length;
  };

  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data pemilik "${name}"? Semua data yang tertaut akan disesuaikan.`,
      )
    ) {
      const newOwners = owners.filter((o) => o.id !== id);
      setOwners(newOwners);
      setToastMessage(
        `✅ Data pemilik ${name} berhasil dihapus dari basis data.`,
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const filteredOwners = owners.filter(
    (owner) =>
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.phone.includes(searchTerm),
  );

  const headers = [
    "ID",
    "Nama Pemilik",
    "Informasi Kontak",
    "Alamat Domisili",
    "Hewan Peliharaan",
    "Kunjungan",
    "Aksi",
  ];

  if (isLoading)
    return <Loading fullScreen text="Sinkronisasi data pemilik hewan..." />;

  return (
    <div
      id="petowners-page"
      className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased"
    >
      {/* Page Header */}
      <div className="mb-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <PageHeader
          title="Manajemen Pemilik Hewan (Client)"
          breadcrumb={["Klien", "Daftar Pemilik"]}
        >
          <button
            className="btn bg-[#432C81] hover:bg-[#342264] text-white font-semibold text-sm rounded-xl px-5 border-none shadow-md shadow-purple-200 flex items-center gap-2 transition-all duration-200"
            onClick={() => navigate("/add-pet-owner")}
          >
            <FaPlus size={12} /> Registrasi Pemilik Baru
          </button>
        </PageHeader>
      </div>

      <Container>
        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Total Klien Terdaftar
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-[#432C81]">
                {owners.length}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                Pemilik akun aktif
              </p>
            </div>
            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-[#432C81]">
              <FaUsers size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Total Pasien Hewan
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-emerald-600">
                {pets.length}
              </p>
              <p className="text-[11px] text-emerald-600/80 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                Terdata di Sistem
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-500">
              <FaPaw size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Rasio Kepemilikan
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-amber-500">
                {(pets.length / owners.length).toFixed(1)}
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Rata-rata hewan per klien
              </p>
            </div>
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-500">
              <FaChartLine size={22} />
            </div>
          </div>
        </div>

        {/* Card Search & Filter */}
        <div className="transform hover:scale-[1.002] transition-all duration-300 mb-6">
          <Card title="Pusat Pencarian Data Klien">
            <div className="space-y-3">
              <InputField
                ref={searchInputRef}
                label=""
                name="search"
                placeholder="Masukkan nama pemilik, alamat email, atau nomor telepon untuk mencari..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    Ditemukan: {resultCount} Klien
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono font-medium">
                  {statusMessage}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Table Data Display */}
        <div className="mt-6 transform hover:scale-[1.001] transition-all duration-300">
          <Card title="Database Master Pemilik Hewan">
            <div className="overflow-x-auto -mx-5 -my-3">
              <Table headers={headers}>
                {filteredOwners.length > 0 ? (
                  filteredOwners.map((owner) => (
                    <tr
                      key={owner.id}
                      className="hover:bg-purple-50/40 transition-colors duration-150 cursor-pointer border-b border-slate-100"
                      onClick={() => handleViewDetail(owner)}
                    >
                      <td className="px-5 py-4 text-[#432C81] font-mono font-bold text-xs tracking-wider">
                        {owner.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100/60 p-2 rounded-xl text-[#432C81] border border-purple-200/30">
                            <FaUser size={13} />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 tracking-tight block">
                              {owner.name}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                              <FaCalendarAlt size={10} /> Registrasi:{" "}
                              {owner.joinDate}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold">
                        <span className="text-slate-700 block font-bold flex items-center gap-1">
                          <FaPhone size={10} className="text-slate-400" />{" "}
                          {owner.phone}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block flex items-center gap-1">
                          <FaEnvelope size={10} className="text-slate-400" />{" "}
                          {owner.email}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600 max-w-[200px]">
                        <span className="flex items-center gap-1.5 line-clamp-2">
                          <FaMapMarkerAlt
                            size={12}
                            className="text-red-400 shrink-0"
                          />
                          {owner.address}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-slate-600 max-w-[220px]">
                        <div className="flex items-start gap-1.5">
                          <FaPaw
                            size={12}
                            className="text-[#432C81] mt-0.5 shrink-0"
                          />
                          <span
                            className="truncate block italic"
                            title={getOwnerPets(owner.id)}
                          >
                            {getOwnerPets(owner.id) || (
                              <span className="text-slate-300 font-normal">
                                Belum ada hewan
                              </span>
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex items-center gap-1.5">
                          <Badge type="info">{owner.totalVisits}</Badge>
                          <span className="text-xs font-semibold text-purple-700">
                            Kunjungan
                          </span>
                        </div>
                      </td>
                      <td
                        className="px-5 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-2 justify-start">
                          <button
                            onClick={() => handleViewDetail(owner)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-150"
                            title="Lihat Profil Lengkap"
                          >
                            <FaEye size={13} />
                          </button>
                          <button
                            className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-150"
                            title="Ubah Data Klien"
                          >
                            <FaEdit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(owner.id, owner.name)}
                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-150"
                            title="Hapus Akun Klien"
                          >
                            <FaTrash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-slate-400 font-medium text-sm"
                    >
                      🔍 Tidak ada data pemilik hewan yang cocok dengan filter
                      pencarian Anda.
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal Detail Profil Klien */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="📋 Dokumen Kartu Profil Klien"
      >
        {selectedOwner && (
          <div className="space-y-4 text-slate-700 bg-white p-1">
            {/* Header Profil */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xl text-[#432C81]">
                <FaAddressCard />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight">
                  {selectedOwner.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono font-bold tracking-wide mt-0.5">
                  ID REGISTRASI: {selectedOwner.id}
                </p>
              </div>
            </div>

            {/* Grid Informasi Medis & Kontak */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-medium">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaPhone className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Nomor Telepon / WA
                  </p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedOwner.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaEnvelope className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Alamat Email Klien
                  </p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedOwner.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                <FaMapMarkerAlt className="text-red-400 text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Alamat Lengkap Rumah
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5 leading-relaxed">
                    {selectedOwner.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaCalendarAlt className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Tanggal Bergabung
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedOwner.joinDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaIdCard className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Intensitas Kunjungan
                  </p>
                  <div className="mt-0.5">
                    <Badge type="info">
                      {selectedOwner.totalVisits} Sesi Kedatangan
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Seksi List Hewan */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 flex items-center gap-1">
                  <FaPaw size={10} /> Daftar Hewan Peliharaan Terpaut (
                  {getPetCount(selectedOwner.id)} Ekor)
                </p>
                <p className="text-slate-700 bg-white border border-slate-100 rounded-lg p-2.5 font-bold leading-relaxed text-[11px] text-[#432C81]">
                  {getOwnerPets(selectedOwner.id) ||
                    "⚠️ Belum ada data hewan peliharaan yang didaftarkan di bawah akun pemilik ini."}
                </p>
              </div>
            </div>

            {/* Tombol Footer */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-xl text-xs h-9 min-h-fit px-5 font-bold transition-colors"
              >
                Tutup Dokumen Klien
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Feedback */}
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
