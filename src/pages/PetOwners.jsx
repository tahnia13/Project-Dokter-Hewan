import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaPlus, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaw, FaEye, FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
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
import { initialPetOwners, initialPets } from "../data/clinicData";

export default function PetOwners() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const pets = initialPets;

  useEffect(() => {
    setTimeout(() => {
      setOwners(initialPetOwners);
      setIsLoading(false);
    }, 500);
  }, []);

  const getOwnerPets = (ownerId) => {
    const ownerPets = pets.filter(pet => pet.ownerId === ownerId);
    return ownerPets.map(pet => `${pet.name} (${pet.type})`).join(", ");
  };

  const getPetCount = (ownerId) => {
    return pets.filter(pet => pet.ownerId === ownerId).length;
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus pemilik "${name}"?`)) {
      const newOwners = owners.filter(o => o.id !== id);
      setOwners(newOwners);
      setToastMessage(`✅ Pemilik ${name} berhasil dihapus!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (owner) => {
    setSelectedOwner(owner);
    setIsModalOpen(true);
  };

  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    owner.phone.includes(searchTerm)
  );

  const headers = ["ID", "Nama Pemilik", "Kontak", "Alamat", "Hewan", "Kunjungan", "Aksi"];

  if (isLoading) return <Loading fullScreen text="Memuat data pemilik..." />;

  return (
    <div id="petowners-page">
      <PageHeader title="Pemilik Hewan" breadcrumb={["Dashboard", "Pet Owner List"]}>
        <Button type="primary" onClick={() => navigate("/add-pet-owner")}>
          <FaPlus size={14} /> Tambah Pemilik
        </Button>
      </PageHeader>

      <Container>
        {/* Card Search */}
        <Card title="Cari Pemilik">
          <InputField 
            label="" 
            name="search" 
            placeholder="Cari nama, email, atau telepon..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={FaSearch}
          />
        </Card>

        {/* Table Data Display */}
        <div className="mt-6">
          <Card title="Daftar Pemilik Hewan">
            <Table headers={headers}>
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-[#F5F3FF] transition-colors cursor-pointer" onClick={() => handleViewDetail(owner)}>
                  <td className="p-4 text-[#432C81] font-mono font-bold text-sm">{owner.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                        <FaUser className="text-[#432C81]" />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">{owner.name}</span>
                        <span className="text-gray-400 text-xs block">Bergabung: {owner.joinDate}</span>
                      </div>
                    </div>
                   </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-700">{owner.phone}</div>
                    <div className="text-gray-400 text-xs">{owner.email}</div>
                   </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <FaMapMarkerAlt size={12} className="text-gray-400" />
                      <span className="truncate max-w-[180px]">{owner.address}</span>
                    </div>
                   </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaPaw size={12} className="text-[#432C81]" />
                      <span className="text-sm">{getOwnerPets(owner.id) || "-"}</span>
                    </div>
                   </td>
                  <td className="p-4">
                    <Badge type="info">{owner.totalVisits} Kali</Badge>
                   </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center gap-3">
                      <Link to={`/pet-owners/${owner.id}`} className="text-blue-500 hover:text-blue-700" title="Detail">
                        <FaEye size={18} />
                      </Link>
                      <button className="text-amber-500 hover:text-amber-700" title="Edit">
                        <FaEdit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(owner.id, owner.name)}
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
          <Card title="Total Pemilik" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{owners.length}</p>
            <p className="text-sm text-gray-500">pemilik terdaftar</p>
          </Card>
          <Card title="Total Hewan" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{pets.length}</p>
            <p className="text-sm text-gray-500">hewan peliharaan</p>
          </Card>
          <Card title="Rata-rata Hewan/Pemilik" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{(pets.length / owners.length).toFixed(1)}</p>
            <p className="text-sm text-gray-500">hewan per pemilik</p>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Pemilik">
        {selectedOwner && (
          <div className="space-y-3">
            <p><strong>ID:</strong> {selectedOwner.id}</p>
            <p><strong>Nama:</strong> {selectedOwner.name}</p>
            <p><strong>Telepon:</strong> {selectedOwner.phone}</p>
            <p><strong>Email:</strong> {selectedOwner.email}</p>
            <p><strong>Alamat:</strong> {selectedOwner.address}</p>
            <p><strong>Bergabung:</strong> {selectedOwner.joinDate}</p>
            <p><strong>Total Kunjungan:</strong> <Badge type="info">{selectedOwner.totalVisits} Kali</Badge></p>
            <p><strong>Hewan:</strong> {getOwnerPets(selectedOwner.id) || "-"}</p>
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