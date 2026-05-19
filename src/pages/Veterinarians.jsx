import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaPlus, FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaIdCard, FaEdit, FaTrash, FaEye, FaStethoscope } from "react-icons/fa";
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
  const [selectedVet, setSelectedVet] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus dokter "${name}"?`)) {
      const newVets = veterinarians.filter(v => v.id !== id);
      setVeterinarians(newVets);
      setToastMessage(`✅ Dokter ${name} berhasil dihapus!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const filtered = veterinarians.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const headers = ["ID", "Nama Dokter", "Spesialisasi", "Kontak", "STR", "Status", "Aksi"];

  const getStatusBadge = (status) => {
    return status === "Active" ? <Badge type="success">Aktif</Badge> : <Badge type="warning">Cuti</Badge>;
  };

  if (isLoading) return <Loading fullScreen text="Memuat data dokter..." />;

  return (
    <div id="veterinarians-page">
      <PageHeader title="Dokter Hewan" breadcrumb={["Dashboard", "Veterinarian List"]}>
        <Button type="primary" onClick={() => navigate("/add-veterinarian")}>
          <FaPlus size={14} /> Tambah Dokter
        </Button>
      </PageHeader>

      <Container>
        {/* Card Search */}
        <Card title="Cari Dokter">
          <InputField 
            label="" 
            name="search" 
            placeholder="Cari nama, spesialisasi, atau STR..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={FaSearch}
          />
        </Card>

        {/* Table Data Display */}
        <div className="mt-6">
          <Card title="Daftar Dokter Hewan">
            <Table headers={headers}>
              {filtered.map((vet) => (
                <tr key={vet.id} className="hover:bg-[#F5F3FF] transition-colors cursor-pointer" onClick={() => handleViewDetail(vet)}>
                  <td className="p-4 text-[#432C81] font-mono font-bold text-sm">{vet.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                        <FaUserMd className="text-[#432C81]" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{vet.name}</span>
                        <span className="text-gray-400 text-xs block">Bergabung: {vet.joinDate}</span>
                      </div>
                    </div>
                   </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaStethoscope size={12} className="text-[#432C81]" />
                      <span className="text-sm text-gray-700">{vet.specialization}</span>
                    </div>
                   </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{vet.phone}</div>
                    <div className="text-gray-400 text-xs truncate max-w-[150px]">{vet.email}</div>
                   </td>
                  <td className="p-4">
                    <span className="font-mono text-sm text-gray-600">{vet.license}</span>
                   </td>
                  <td className="p-4">
                    {getStatusBadge(vet.status)}
                   </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center gap-3">
                      <Link to={`/veterinarians/${vet.id}`} className="text-blue-500 hover:text-blue-700" title="Detail">
                        <FaEye size={18} />
                      </Link>
                      <button className="text-amber-500 hover:text-amber-700" title="Edit">
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(vet.id, vet.name)}
                        className="text-red-500 hover:text-red-700" 
                        title="Hapus"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                   </td>
                 </tr>
              ))}
            </Table>
          </Card>
        </div>

        {/* Statistik Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card title="Total Dokter" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{veterinarians.length}</p>
            <p className="text-sm text-gray-500">dokter terdaftar</p>
          </Card>
          <Card title="Dokter Aktif" className="text-center">
            <p className="text-3xl font-bold text-green-600">{veterinarians.filter(v => v.status === "Active").length}</p>
            <p className="text-sm text-gray-500">sedang bertugas</p>
          </Card>
          <Card title="Spesialisasi" className="text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {[...new Set(veterinarians.map(v => v.specialization))].map((spec, idx) => (
                <Badge key={idx} type="info">{spec}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Dokter">
        {selectedVet && (
          <div className="space-y-3">
            <p><strong>ID:</strong> {selectedVet.id}</p>
            <p><strong>Nama:</strong> {selectedVet.name}</p>
            <p><strong>Spesialisasi:</strong> {selectedVet.specialization}</p>
            <p><strong>Nomor STR:</strong> {selectedVet.license}</p>
            <p><strong>Telepon:</strong> {selectedVet.phone}</p>
            <p><strong>Email:</strong> {selectedVet.email}</p>
            <p><strong>Bergabung:</strong> {selectedVet.joinDate}</p>
            <p><strong>Status:</strong> {getStatusBadge(selectedVet.status)}</p>
            <div className="flex gap-3 mt-4">
              <Button type="primary" onClick={() => setIsModalOpen(false)} className="flex-1">Tutup</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}