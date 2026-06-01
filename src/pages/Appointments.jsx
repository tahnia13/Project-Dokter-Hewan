import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaCalendarPlus, FaEye, FaEdit, FaTrash, FaPaw, FaClock, FaUserMd, FaFilter } from "react-icons/fa";
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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState({ petId: "", veterinarian: "", date: "", time: "", symptoms: "" });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  
  const pets = initialPets;
  const owners = initialPetOwners;

  useEffect(() => {
    setTimeout(() => {
      setAppointments(initialAppointments);
      setIsLoading(false);
    }, 500);
  }, []);

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Unknown";
  };

  const getPetType = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.type : "Unknown";
  };

  const handleDelete = (id, petName) => {
    if (window.confirm(`Hapus janji temu untuk "${petName}"?`)) {
      const newAppointments = appointments.filter(a => a.id !== id);
      setAppointments(newAppointments);
      setToastMessage(`✅ Janji temu untuk ${petName} berhasil dihapus!`);
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

  const headers = ["ID", "Hewan", "Pemilik", "Dokter", "Tanggal & Waktu", "Status", "Aksi"];
  
  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "Scheduled", label: "Dijadwalkan" },
    { value: "In Progress", label: "Berlangsung" },
    { value: "Completed", label: "Selesai" },
    { value: "Cancelled", label: "Dibatalkan" }
  ];

  const petOptions = pets.map(pet => ({ value: pet.id, label: `${pet.name} (${pet.type} - ${pet.breed})` }));
  const veterinarianOptions = [
    { value: "Dr. Sarah Wijaya", label: "Dr. Sarah Wijaya" },
    { value: "Dr. Budi Santoso", label: "Dr. Budi Santoso" },
    { value: "Dr. Anita Permata", label: "Dr. Anita Permata" },
  ];
  const timeOptions = [
    { value: "09:00", label: "09:00" },
    { value: "10:30", label: "10:30" },
    { value: "13:00", label: "13:00" },
    { value: "14:30", label: "14:30" },
  ];

  const getBadgeType = (status) => {
    if (status === "Completed") return "success";
    if (status === "Cancelled") return "danger";
    if (status === "In Progress") return "warning";
    return "primary";
  };

  // ========== HITUNG PROGRESS UNTUK HARI INI ==========
  const today = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const todayCompleted = appointments.filter(a => a.date === today && a.status === "Completed").length;
  const todayInProgress = appointments.filter(a => a.date === today && a.status === "In Progress").length;
  const completionRate = todayAppointments > 0 ? (todayCompleted / todayAppointments) * 100 : 0;
  // ====================================================

  if (isLoading) return <Loading fullScreen text="Memuat data janji temu..." />;

  return (
    <div id="appointments-page">
      <PageHeader title="Janji Temu" breadcrumb={["Dashboard", "Appointment List"]}>
        <Button type="primary" onClick={handleAddAppointment}>
          <FaCalendarPlus size={14} /> Janji Temu Baru
        </Button>
      </PageHeader>

      <Container>
        {/* ========== DAISYUI PROGRESS BAR ========== */}
        <div className="bg-white rounded-xl p-5 border border-[#CCC3FF]/30 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">Progress Janji Temu Hari Ini</h3>
              <p className="text-xs text-gray-500">{todayAppointments} janji temu terjadwal</p>
            </div>
            <span className="text-2xl font-bold text-[#432C81]">{completionRate.toFixed(0)}%</span>
          </div>
          <progress 
            className="progress progress-primary w-full h-3" 
            value={completionRate} 
            max="100"
            style={{ accentColor: "#432C81" }}
          ></progress>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>✅ Selesai: {todayCompleted}</span>
            <span>⏳ Berlangsung: {todayInProgress}</span>
            <span>📋 Tertunda: {todayAppointments - todayCompleted - todayInProgress}</span>
          </div>
        </div>
        {/* ========================================= */}

        {/* Alert Feedback */}
        {showAlert && (
          <Alert type="success" message="Janji temu berhasil ditambahkan!" onClose={() => setShowAlert(false)} />
        )}

        {/* Card Filter */}
        <Card title="Filter Data">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputField 
                label="Cari" 
                name="search" 
                placeholder="Cari hewan atau pemilik..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FaSearch}
              />
            </div>
            <div className="w-full md:w-64">
              <SelectField 
                label="Filter Status" 
                name="status" 
                options={statusOptions} 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                icon={FaFilter}
              />
            </div>
          </div>
        </Card>

        {/* Data Display - Table */}
        <div className="mt-6">
          <Card title="Daftar Janji Temu">
            <Table headers={headers}>
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#F5F3FF] transition-colors cursor-pointer" onClick={() => handleViewDetail(apt)}>
                  <td className="p-4 text-[#432C81] font-mono font-bold text-sm">{apt.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#CCC3FF]/30 p-2 rounded-lg"><FaPaw className="text-[#432C81]" /></div>
                      <div><span className="font-medium">{getPetName(apt.petId)}</span><span className="text-gray-400 text-xs block">({getPetType(apt.petId)})</span></div>
                    </div>
                  </td>
                  <td className="p-4">{getOwnerName(apt.petId, owners)}</td>
                  <td className="p-4">{apt.veterinarian}</td>
                  <td className="p-4">{apt.date}<br/><span className="text-xs text-gray-400"><FaClock className="inline" /> {apt.time}</span></td>
                  <td className="p-4"><Badge type={getBadgeType(apt.status)}>{apt.status}</Badge></td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-3">
                      <Link to={`/appointments/${apt.id}`} className="text-blue-500"><FaEye /></Link>
                      <button className="text-amber-500"><FaEdit /></button>
                      <button onClick={() => handleDelete(apt.id, getPetName(apt.petId))} className="text-red-500"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Janji Temu">
        {selectedAppointment && (
          <div className="space-y-3">
            <p><strong>ID:</strong> {selectedAppointment.id}</p>
            <p><strong>Hewan:</strong> {getPetName(selectedAppointment.petId)}</p>
            <p><strong>Dokter:</strong> {selectedAppointment.veterinarian}</p>
            <p><strong>Tanggal:</strong> {selectedAppointment.date}</p>
            <p><strong>Waktu:</strong> {selectedAppointment.time}</p>
            <p><strong>Status:</strong> <Badge type={getBadgeType(selectedAppointment.status)}>{selectedAppointment.status}</Badge></p>
            <Button type="primary" onClick={() => setIsModalOpen(false)} className="w-full">Tutup</Button>
          </div>
        )}
      </Modal>

      {/* Modal Form - Form Component */}
      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title="Tambah Janji Temu" size="lg">
        <form onSubmit={handleSubmitAppointment}>
          <SelectField label="Pilih Pasien" name="petId" options={petOptions} value={formData.petId} onChange={handleFormChange} required />
          <SelectField label="Pilih Dokter" name="veterinarian" options={veterinarianOptions} value={formData.veterinarian} onChange={handleFormChange} required />
          <InputField label="Tanggal" type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          <SelectField label="Waktu" name="time" options={timeOptions} value={formData.time} onChange={handleFormChange} required />
          <TextArea label="Keluhan" name="symptoms" placeholder="Deskripsikan keluhan..." value={formData.symptoms} onChange={handleFormChange} />
          <div className="flex gap-3 mt-4">
            <Button type="success">Simpan</Button>
            <Button type="secondary" onClick={() => setIsFormModalOpen(false)}>Batal</Button>
          </div>
        </form>
      </Modal>

      {/* Toast Feedback */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}