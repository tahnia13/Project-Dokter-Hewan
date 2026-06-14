import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaIdCard,
  FaEdit,
  FaTrash,
  FaEye,
  FaStethoscope,
  FaCheckCircle,
  FaBriefcaseMedical,
  FaAward,
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
import { initialVeterinarians } from "../data/clinicData";

export default function Veterinarians() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [veterinarians, setVeterinarians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [resultCount, setResultCount] = useState(0);
  const renderCountRef = useRef(0);
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
      searchInputRef.current?.focus();
      setStatusMessage("Sistem pencarian aktif");
      setResultCount(initialVeterinarians.length);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    renderCountRef.current += 1;
    const filteredVets = veterinarians.filter(
      (v) =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.license.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setResultCount(filteredVets.length);
    setStatusMessage(`Pembaruan: ${new Date().toLocaleTimeString()} WIB`);
  }, [searchTerm, veterinarians]);

  const handleDelete = (id, name) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data praktisi "${name}"? Tindakan ini akan memengaruhi jadwal shift aktif.`,
      )
    ) {
      const newVets = veterinarians.filter((v) => v.id !== id);
      setVeterinarians(newVets);
      setToastMessage(
        `✅ Data registrasi ${name} telah dinonaktifkan dari sistem.`,
      );
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const filtered = veterinarians.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.license.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const headers = [
    "ID Staff",
    "Nama Praktisi",
    "Bidang Spesialisasi",
    "Informasi Kontak",
    "No. STR / Lisensi",
    "Status Tugas",
    "Aksi",
  ];

  const getStatusBadge = (status) => {
    return status === "Active" ? (
      <div className="flex items-center gap-1.5 overflow-visible">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
        <Badge type="success">Aktif Praktik</Badge>
      </div>
    ) : (
      <div className="flex items-center gap-1.5 overflow-visible">
        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
        <Badge type="warning">Cuti / Izin</Badge>
      </div>
    );
  };

  if (isLoading)
    return (
      <Loading fullScreen text="Sinkronisasi database kredensial medis..." />
    );

  return (
    <div
      id="veterinarians-page"
      className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased"
    >
      {/* Page Header */}
      <div className="mb-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <PageHeader
          title="Manajemen Kredensial Dokter"
          breadcrumb={["Staf Medis", "Daftar Dokter"]}
        >
          <button
            className="btn bg-[#432C81] hover:bg-[#342264] text-white font-semibold text-sm rounded-xl px-5 border-none shadow-md shadow-purple-200 flex items-center gap-2 transition-all duration-200"
            onClick={() => navigate("/add-veterinarian")}
          >
            <FaPlus size={12} /> Daftarkan Dokter Baru
          </button>
        </PageHeader>
      </div>

      <Container>
        {/* Top Medical Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Total Tenaga Medis
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-[#432C81]">
                {veterinarians.length}
              </p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                Praktisi terverifikasi
              </p>
            </div>
            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-[#432C81]">
              <FaUserMd size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Dokter Standby
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-emerald-600">
                {veterinarians.filter((v) => v.status === "Active").length}
              </p>
              <p className="text-[11px] text-emerald-600/80 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                Siap Melayani
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-500">
              <FaCheckCircle size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Kluster Keahlian
              </p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-amber-500">
                {
                  [...new Set(veterinarians.map((v) => v.specialization))]
                    .length
                }
              </p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Cabang spesialisasi
              </p>
            </div>
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-500">
              <FaBriefcaseMedical size={22} />
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <div className="transform hover:scale-[1.002] transition-all duration-300 mb-6">
          <Card title="Pencarian Cepat Kredensial Dokter">
            <div className="space-y-3">
              <InputField
                ref={searchInputRef}
                label=""
                name="search"
                placeholder="Cari berdasarkan nama dokter, bidang spesialisasi, atau nomor STR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    Ditemukan: {resultCount} Personel
                  </span>
                  <div className="hidden sm:flex flex-wrap gap-1 items-center ml-2 border-l pl-3 border-slate-200">
                    <span className="text-[10px] text-slate-400 mr-1">
                      Fokus Bidang:
                    </span>
                    {[...new Set(veterinarians.map((v) => v.specialization))]
                      .slice(0, 3)
                      .map((spec, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-50 text-[#432C81] text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100"
                        >
                          {spec}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-mono font-medium">
                  {statusMessage}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Database Table Display */}
        <div className="mt-6 transform hover:scale-[1.001] transition-all duration-300">
          <Card title="Database Registrasi Dokter Aktif">
            <div className="overflow-x-auto -mx-5 -my-3">
              <Table headers={headers}>
                {filtered.length > 0 ? (
                  filtered.map((vet) => (
                    <tr
                      key={vet.id}
                      className="hover:bg-purple-50/40 transition-colors duration-150 cursor-pointer border-b border-slate-100"
                      onClick={() => handleViewDetail(vet)}
                    >
                      <td className="px-5 py-4 text-[#432C81] font-mono font-bold text-xs tracking-wider">
                        {vet.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100/60 p-2 rounded-xl text-[#432C81] border border-purple-200/30">
                            <FaUserMd size={14} />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 tracking-tight block">
                              {vet.name}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                              <FaCalendarAlt size={10} /> Terdaftar:{" "}
                              {vet.joinDate}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/40 w-fit">
                          <FaStethoscope size={11} className="text-[#432C81]" />
                          <span>{vet.specialization}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold">
                        <span className="text-slate-700 block font-bold flex items-center gap-1">
                          <FaPhone size={10} className="text-slate-400" />{" "}
                          {vet.phone}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block flex items-center gap-1">
                          <FaEnvelope size={10} className="text-slate-400" />{" "}
                          {vet.email}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-bold tracking-tight">
                          {vet.license}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {getStatusBadge(vet.status)}
                      </td>
                      <td
                        className="px-5 py-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex gap-2 justify-start">
                          <button
                            onClick={() => handleViewDetail(vet)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-150"
                            title="Detail Dokumen"
                          >
                            <FaEye size={13} />
                          </button>
                          <button
                            className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-150"
                            title="Ubah Profil Dokter"
                          >
                            <FaEdit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(vet.id, vet.name)}
                            className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-150"
                            title="Hapus Dari Sistem"
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
                      🔍 Tidak ditemukan data dokter hewan yang sesuai dengan
                      kriteria pencarian.
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal Detail Profil Medis */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="📋 Berkas Kredensial Praktisi Medis"
      >
        {selectedVet && (
          <div className="space-y-4 text-slate-700 bg-white p-1">
            {/* Header Kredensial */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xl text-[#432C81]">
                <FaAward />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight">
                  {selectedVet.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono font-bold tracking-wide mt-0.5">
                  ID INTERNAL STAFF: {selectedVet.id}
                </p>
              </div>
            </div>

            {/* Grid Informasi Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-medium">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaStethoscope className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Kluster Keahlian Utama
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5 text-purple-700">
                    {selectedVet.specialization}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaIdCard className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Nomor STR Resmi
                  </p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5 tracking-tight">
                    {selectedVet.license}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaPhone className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Kontak Telepon Staf
                  </p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedVet.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaEnvelope className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Alamat Email Institusi
                  </p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">
                    {selectedVet.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaCalendarAlt className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Tanggal Registrasi Kontrak
                  </p>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedVet.joinDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaCheckCircle className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Status Penugasan
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(selectedVet.status)}
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Footer */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-xl text-xs h-9 min-h-fit px-5 font-bold transition-colors"
              >
                Tutup Dokumen Kredensial
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
