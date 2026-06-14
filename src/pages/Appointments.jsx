import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaSearch, 
  FaCalendarPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaPaw, 
  FaClock, 
  FaUserMd, 
  FaFilter, 
  FaCheckCircle, 
  FaSpinner, 
  FaTimesCircle, 
  FaCalendarAlt, 
  FaNotesMedical, 
  FaPhoneAlt,
  FaUser
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import Button from "./Components/Button";
import Badge from "./Components/Badge";
import Table from "./Components/Table";
import InputField from "./Components/InputField";
import SelectField from "./Components/SelectField";
import TextArea from "./Components/TextArea";
import Alert from "./Components/Alert";
import Modal from "./Components/Modal";
import Toast from "./Components/Toast";
import Loading from "./Components/Loading";
import Container from "./Components/Container";
import Card from "./Components/Card";
import ProgressBar from "./Components/ProgressBar";
import { translateAppointmentStatus, translatePetType } from "../lib/utils";
import { initialAppointments, initialPets, initialPetOwners, getOwnerName, getOwnerPhone } from "../data/clinicData";

export default function Appointments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInputRef = useRef(null);
  const [focusMessage, setFocusMessage] = useState("Kolom pencarian siap digunakan.");
  const [effectMessage, setEffectMessage] = useState("");
  const renderCountRef = useRef(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({ petId: "", veterinarian: "", date: "", time: "", symptoms: "" });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  
  const pets = initialPets;
  const owners = initialPetOwners;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppointments(initialAppointments);
      setIsLoading(false);
      searchInputRef.current?.focus();
      setEffectMessage("Sistem sinkronisasi otomatis aktif.");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    renderCountRef.current += 1;
  }, [searchTerm, filterStatus]);

  const handleFocusSearch = () => {
    searchInputRef.current?.focus();
    setFocusMessage("Kolom pencarian berhasil difokuskan.");
    setTimeout(() => setFocusMessage("Kolom pencarian siap digunakan."), 3000);
  };

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Tidak Diketahui";
  };

  const getPetType = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? translatePetType(pet.type) : "Tidak Dikenal";
  };

  const handleDelete = (id, petName) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus jadwal janji temu untuk "${petName}"?`)) {
      const newAppointments = appointments.filter(a => a.id !== id);
      setAppointments(newAppointments);
      setToastMessage(`✅ Janji temu untuk ${petName} berhasil dihapus dari sistem.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (apt) => {
    setSelectedAppointment(apt);
    setIsModalOpen(true);
  };

  const handleAddAppointment = () => {
    setIsFormModalOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitAppointment = (e) => {
    e.preventDefault();
    const newId = `APT-${String(appointments.length + 1).padStart(3, "0")}`;
    const newAppointment = {
      id: newId,
      petId: formData.petId,
      veterinarian: formData.veterinarian,
      date: formData.date,
      time: formData.time,
      status: "Scheduled",
      symptoms: formData.symptoms
    };
    setAppointments([...appointments, newAppointment]);
    setShowAlert(true);
    setFormData({ petId: "", veterinarian: "", date: "", time: "", symptoms: "" });
    setIsFormModalOpen(false);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filtered = appointments.filter(a => 
    (getPetName(a.petId).toLowerCase().includes(searchTerm.toLowerCase()) || 
     getOwnerName(a.petId, owners).toLowerCase().includes(searchTerm.toLowerCase())) && 
    (filterStatus === "all" || a.status === filterStatus)
  );

  const headers = ["ID", "Pasien Hewan", "Pemilik", "Dokter Spesialis", "Tanggal & Waktu", "Status", "Aksi"];
  
  const statusOptions = [
    { value: "all", label: "Semua Status Janji Temu" },
    { value: "Scheduled", label: "Dijadwalkan (Antrean)" },
    { value: "In Progress", label: "Sedang Berlangsung" },
    { value: "Completed", label: "Selesai Diperiksa" },
    { value: "Cancelled", label: "Dibatalkan Pasien" }
  ];

  const petOptions = pets.map(pet => ({ value: pet.id, label: `${pet.name} (${translatePetType(pet.type)} - ${pet.breed})` }));
  const veterinarianOptions = [
    { value: "Dr. Sarah Wijaya", label: "Dr. Sarah Wijaya" },
    { value: "Dr. Budi Santoso", label: "Dr. Budi Santoso" },
    { value: "Dr. Anita Permata", label: "Dr. Anita Permata" },
  ];
  const timeOptions = [
    { value: "09:00", label: "09:00 WIB" },
    { value: "10:30", label: "10:30 WIB" },
    { value: "13:00", label: "13:00 WIB" },
    { value: "14:30", label: "14:30 WIB" },
  ];

  const getBadgeType = (status) => {
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "danger";
    if (status === "In Progress") return "warning";
    return "primary";
  };

  const totalScheduled = appointments.filter(a => a.status === "Scheduled").length;
  const totalInProgress = appointments.filter(a => a.status === "In Progress").length;
  const totalCompleted = appointments.filter(a => a.status === "Completed").length;
  const totalCancelled = appointments.filter(a => a.status === "Cancelled").length;
  const activeVeterinarians = new Set(appointments.map((a) => a.veterinarian)).size;
  const upcomingAppointments = appointments
    .filter(a => new Date(`${a.date}T${a.time}`) >= new Date())
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
  const nextAppointment = upcomingAppointments[0];

  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const todayCompleted = appointments.filter(a => a.date === today && a.status === "Completed").length;
  const todayInProgress = appointments.filter(a => a.date === today && a.status === "In Progress").length;
  const completionRate = todayAppointments > 0 ? (todayCompleted / todayAppointments) * 100 : 0;

  if (isLoading) return <Loading fullScreen text="Sinkronisasi sistem jadwal..." />;

  return (
    <div id="appointments-page" className="p-6 bg-slate-50/50 min-h-screen font-inter antialiased">
      {/* Page Header */}
      <div className="mb-6 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <PageHeader title="Sistem Manajemen Janji Temu" breadcrumb={["Janji Temu", "Penjadwalan Utama"]}>
          <button 
            className="btn bg-[#432C81] hover:bg-[#342264] text-white font-semibold text-sm rounded-xl px-5 border-none shadow-md shadow-purple-200 flex items-center gap-2 transition-all duration-200"
            onClick={handleAddAppointment}
          >
            <FaCalendarPlus size={12} /> Buat Janji Temu Baru
          </button>
        </PageHeader>
      </div>

      <Container>
        {/* 4 Top Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Total Reservasi</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-[#432C81]">{appointments.length}</p>
              <p className="text-[11px] text-slate-400 font-medium mt-1">{activeVeterinarians} Dokter Standby</p>
            </div>
            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-[#432C81]">
              <FaCalendarAlt size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Selesai Diperiksa</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-emerald-600">{totalCompleted}</p>
              <p className="text-[11px] text-emerald-600/80 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md mt-1 inline-block">Sesi Clear</p>
            </div>
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-500">
              <FaCheckCircle size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Sedang Berjalan</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-amber-500">{totalInProgress}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Di ruang konsultasi</p>
            </div>
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-100 text-amber-500">
              <FaSpinner size={22} className="animate-spin" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transform hover:-translate-y-1 transition-transform duration-200">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Total Batal</p>
              <p className="text-3xl font-extrabold tracking-tight mt-1 text-red-500">{totalCancelled}</p>
              <p className="text-[11px] text-red-400 font-medium mt-1">Perlu review follow-up</p>
            </div>
            <div className="p-3.5 bg-red-50 rounded-xl border border-red-100 text-red-500">
              <FaTimesCircle size={22} />
            </div>
          </div>
        </div>

        {/* Progress Tracker Section */}
        <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/40 rounded-2xl p-5 border border-purple-100 shadow-inner mb-6 transform hover:scale-[1.002] transition-transform duration-300">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Rasio Kinerja Sesi Hari Ini</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Memantau beban kerja antrean dari {todayAppointments} agenda aktif</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-3xl font-black text-[#432C81]">{completionRate.toFixed(0)}%</span>
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tingkat Penyelesaian</p>
            </div>
          </div>
          
          <ProgressBar 
            percentage={completionRate}
            label="Kinerja Hari Ini"
            showPercentage={false}
            size="lg"
            color="primary"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Tuntas</p>
                <p className="text-lg font-bold text-emerald-600 mt-0.5">{todayCompleted} Pasien</p>
              </div>
              <span className="text-emerald-500 text-lg">✓</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-amber-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Berjalan</p>
                <p className="text-lg font-bold text-amber-500 mt-0.5">{todayInProgress} Sesi</p>
              </div>
              <span className="text-amber-500 text-lg animate-pulse">⏳</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-blue-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Sisa Antrean</p>
                <p className="text-lg font-bold text-blue-600 mt-0.5">{todayAppointments - todayCompleted - todayInProgress} Antrean</p>
              </div>
              <span className="text-blue-500 text-lg">📋</span>
            </div>
          </div>
        </div>

        {/* Highlight Agenda Next & Today */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col justify-between transform hover:scale-[1.002] transition-transform duration-300">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">Pasien Antrean Berikutnya</p>
              {nextAppointment ? (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                    <p className="text-base font-extrabold text-slate-800 tracking-tight">
                      {getPetName(nextAppointment.petId)}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                    <FaUserMd size={12} className="text-[#432C81]" /> {nextAppointment.veterinarian}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono font-bold mt-2 bg-white px-2 py-1 rounded-md border border-slate-100 w-fit flex items-center gap-1">
                    <FaClock size={11} /> {nextAppointment.date} • {nextAppointment.time} WIB
                  </p>
                </div>
              ) : (
                <p className="text-xs font-medium text-slate-400 py-4">Tidak ada agenda janji temu mendatang.</p>
              )}
            </div>
            {nextAppointment && (
              <div className="mt-3">
                <Badge type={getBadgeType(nextAppointment.status)}>{translateAppointmentStatus(nextAppointment.status)}</Badge>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#432C81] to-[#6D47B8] text-white p-5 shadow-lg shadow-purple-900/10 flex flex-col justify-between transform hover:scale-[1.002] transition-transform duration-300">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 mb-2">Ringkasan Agenda Hari Ini</p>
              <p className="text-5xl font-black tracking-tight mt-1">{todayAppointments}</p>
              <p className="text-xs text-white/80 font-medium mt-1">Total janji temu masuk sistem khusus hari ini.</p>
            </div>
            <p className="text-[11px] font-semibold text-purple-100 mt-4 border-t border-white/10 pt-3">
              🎯 Selesai: <span className="font-bold text-white">{todayCompleted}</span> • Sedang Berjalan: <span className="font-bold text-white">{todayInProgress}</span>
            </p>
          </div>
        </div>

        {/* Alert Feedback */}
        {showAlert && (
          <div className="mb-6">
            <Alert type="success" message="Janji temu baru berhasil dimasukkan ke sistem rekam medis!" onClose={() => setShowAlert(false)} />
          </div>
        )}

        {/* Card Filter & Search Panel */}
        <div className="transform hover:scale-[1.002] transition-all duration-300 mb-6">
          <Card title="Pusat Penyaringan Data Antrean">
            <div className="flex flex-col lg:flex-row gap-5 items-end">
              <div className="flex-1 w-full">
                <InputField 
                  ref={searchInputRef}
                  label="Kata Kunci Pencarian" 
                  name="search" 
                  placeholder="Ketik nama pasien hewan atau nama pemilik di sini..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={FaSearch}
                />
                <div className="flex items-center justify-between flex-wrap gap-2 mt-2.5">
                  <button 
                    onClick={handleFocusSearch}
                    className="text-[11px] font-bold text-[#432C81] bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-100 transition-colors"
                  >
                    ⚡ Reset Fokus Kolom
                  </button>
                  <div className="text-[11px] text-slate-400 font-medium font-mono text-right">
                    <span>{focusMessage}</span> • <span>{effectMessage}</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-72">
                <SelectField 
                  label="Saring Berdasarkan Status" 
                  name="status" 
                  options={statusOptions} 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  icon={FaFilter}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Data Display - Table */}
        <div className="mt-6 transform hover:scale-[1.001] transition-all duration-300">
          <Card title="Daftar Log Janji Temu Aktif">
            <div className="overflow-x-auto -mx-5 -my-3">
              <Table headers={headers}>
                {filtered.length > 0 ? (
                  filtered.map((apt) => (
                    <tr 
                      key={apt.id} 
                      className="hover:bg-purple-50/40 transition-colors duration-150 cursor-pointer border-b border-slate-100" 
                      onClick={() => handleViewDetail(apt)}
                    >
                      <td className="px-5 py-4 text-[#432C81] font-mono font-bold text-xs tracking-wider">{apt.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100/60 p-2 rounded-xl text-[#432C81] border border-purple-200/30">
                            <FaPaw size={13} />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-800 tracking-tight block">{getPetName(apt.petId)}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{getPetType(apt.petId)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-700">{getOwnerName(apt.petId, owners)}</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        <span className="flex items-center gap-1.5"><FaUserMd size={13} className="text-slate-400" /> {apt.veterinarian}</span>
                      </td>
                      <td className="px-5 py-4 text-xs font-semibold text-slate-600">
                        <span className="text-slate-700 block font-bold">{apt.date}</span>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 inline-flex items-center gap-1"><FaClock size={10} /> {apt.time} WIB</span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge type={getBadgeType(apt.status)}>{translateAppointmentStatus(apt.status)}</Badge>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          <button onClick={() => handleViewDetail(apt)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-150" title="Lihat Detail"><FaEye size={13} /></button>
                          <button className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all duration-150" title="Ubah Jadwal"><FaEdit size={13} /></button>
                          <button onClick={() => handleDelete(apt.id, getPetName(apt.petId))} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-150" title="Hapus"><FaTrash size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400 font-medium text-sm">
                      🔍 Tidak ada log janji temu yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="📋 Dokumen Detail Janji Temu">
        {selectedAppointment && (
          <div className="space-y-4 text-slate-700 bg-white p-1">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xl text-[#432C81]">
                <FaNotesMedical />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-800 tracking-tight leading-tight">ID Reservasi: {selectedAppointment.id}</h4>
                <p className="text-[11px] text-slate-400 font-semibold tracking-wide">Status Sesi: {translateAppointmentStatus(selectedAppointment.status)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-medium">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaPaw className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Nama Pasien Hewan</p>
                  <p className="font-bold text-slate-800 mt-0.5">{getPetName(selectedAppointment.petId)} ({getPetType(selectedAppointment.petId)})</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaUser className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Pemilik (Owner)</p>
                  <p className="font-bold text-slate-800 mt-0.5">{getOwnerName(selectedAppointment.petId, owners)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaUserMd className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Dokter Penanggung Jawab</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.veterinarian}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <FaClock className="text-[#432C81] text-base shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Jadwal Periksa</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAppointment.date} • {selectedAppointment.time} WIB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                <FaPhoneAlt className="text-[#432C81] text-sm shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Kontak Darurat Pemilik</p>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{getOwnerPhone(selectedAppointment.petId, owners) || "Tidak Tersedia"}</p>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 sm:col-span-2">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Gejala Klinis / Keluhan Awal</p>
                <p className="text-slate-700 bg-white border border-slate-100 rounded-lg p-2 font-medium leading-relaxed italic text-[11px]">
                  "{selectedAppointment.symptoms || "Pemeriksaan kesehatan rutin atau vaksinasi berkala."}"
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 border-none rounded-xl text-xs h-9 min-h-fit px-5 font-bold transition-colors"
              >
                Tutup Dokumen
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Form */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title="➕ Daftarkan Jadwal Janji Temu Baru" size="lg">
        <form onSubmit={handleSubmitAppointment} className="space-y-4 p-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField label="Pilih Pasien Hewan Terdaftar" name="petId" options={petOptions} value={formData.petId} onChange={handleFormChange} required />
            <SelectField label="Pilih Dokter Spesialis" name="veterinarian" options={veterinarianOptions} value={formData.veterinarian} onChange={handleFormChange} required />
            <InputField label="Tanggal Kedatangan" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
            <SelectField label="Alokasi Slot Waktu Periksa" name="time" options={timeOptions} value={formData.time} onChange={handleFormChange} required />
          </div>
          <TextArea label="Deskripsi Singkat Gejala / Keluhan" name="symptoms" placeholder="Contoh: Hewan lemas, muntah sejak semalam, nafsu makan menurun drastis..." value={formData.symptoms} onChange={handleFormChange} />
          
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => setIsFormModalOpen(false)} 
              className="btn bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl h-10 min-h-fit border-none px-4 transition-colors"
            >
              Batalkan
            </button>
            <button 
              type="submit" 
              className="btn bg-[#432C81] hover:bg-[#342264] text-white font-bold text-xs rounded-xl h-10 min-h-fit border-none px-5 transition-colors"
            >
              Simpan & Daftarkan Antrean
            </button>
          </div>
        </form>
      </Modal>

      {/* Toast Feedback */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}