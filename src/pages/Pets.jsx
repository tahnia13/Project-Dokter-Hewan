import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaPlus, FaDog, FaCat, FaPaw, FaEdit, FaTrash, FaEye, FaHeartbeat } from "react-icons/fa";
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
import { initialPets, initialPetOwners, getOwnerName } from "../data/clinicData";

export default function Pets() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([]);
  const [owners] = useState(initialPetOwners);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  // ========== TAMBAHKAN STATE UNTUK FILTER TABS ==========
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setIsLoading(false);
    }, 500);
  }, []);

  const getPetIcon = (type) => {
    if (type === "Dog") return <FaDog className="text-[#432C81]" />;
    if (type === "Cat") return <FaCat className="text-[#432C81]" />;
    return <FaPaw className="text-[#432C81]" />;
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus pasien "${name}"?`)) {
      const newPets = pets.filter(pet => pet.id !== id);
      setPets(newPets);
      setToastMessage(`✅ Pasien ${name} berhasil dihapus!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleViewDetail = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    getOwnerName(pet.id, owners).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter berdasarkan jenis hewan
  const allPets = filteredPets;
  const dogsPets = filteredPets.filter(pet => pet.type === "Dog");
  const catsPets = filteredPets.filter(pet => pet.type === "Cat");

  const headers = ["Patient ID", "Pet Name", "Type & Breed", "Owner", "Status", "Actions"];
  
  const getBadgeType = (status) => {
    if (status === "Healthy") return "success";
    if (status === "Under Treatment") return "warning";
    return "info";
  };

  // Fungsi render tabel
  const renderPetTable = (petList) => (
    <Table headers={headers}>
      {petList.map((pet) => (
        <tr key={pet.id} className="hover:bg-[#F5F3FF] transition-colors cursor-pointer" onClick={() => handleViewDetail(pet)}>
          <td className="p-4 text-[#432C81] font-mono text-sm">{pet.id}</td>
          <td className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">{getPetIcon(pet.type)}</div>
              <div><span className="font-bold">{pet.name}</span><br/><span className="text-xs text-gray-400">{pet.gender}, {pet.age} thn</span></div>
            </div>
          </td>
          <td className="p-4">{pet.type} | {pet.breed}</td>
          <td className="p-4">{getOwnerName(pet.id, owners)}</td>
          <td className="p-4"><Badge type={getBadgeType(pet.healthStatus)}>{pet.healthStatus}</Badge></td>
          <td className="p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-3">
              <Link to={`/pets/${pet.id}`} className="text-blue-500"><FaEye /></Link>
              <button className="text-amber-500"><FaEdit /></button>
              <button onClick={() => handleDelete(pet.id, pet.name)} className="text-red-500"><FaTrash /></button>
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );

  if (isLoading) return <Loading fullScreen text="Memuat data pasien..." />;

  return (
    <div id="pets-page">
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Pet List"]}>
        <Button type="primary" onClick={() => navigate("/add-pet")}>
          <FaPlus size={14} /> Tambah Pasien
        </Button>
      </PageHeader>

      <Container>
        {/* Card Search */}
        <Card title="Cari Pasien">
          <InputField 
            label="" 
            name="search" 
            placeholder="Cari nama hewan atau pemilik..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={FaSearch}
          />
        </Card>

        {/* ========== DAISYUI TABS ========== */}
        <div className="mt-6">
          <Card title="Daftar Pasien Hewan">
            <div role="tablist" className="tabs tabs-bordered mb-4">
              <button 
                role="tab" 
                className={`tab ${filterType === "all" ? "tab-active text-[#432C81]" : "text-gray-500"}`}
                onClick={() => setFilterType("all")}
              >
                📋 Semua Pasien ({allPets.length})
              </button>
              <button 
                role="tab" 
                className={`tab ${filterType === "dogs" ? "tab-active text-[#432C81]" : "text-gray-500"}`}
                onClick={() => setFilterType("dogs")}
              >
                🐕 Anjing ({dogsPets.length})
              </button>
              <button 
                role="tab" 
                className={`tab ${filterType === "cats" ? "tab-active text-[#432C81]" : "text-gray-500"}`}
                onClick={() => setFilterType("cats")}
              >
                🐈 Kucing ({catsPets.length})
              </button>
            </div>

            {filterType === "all" && renderPetTable(allPets)}
            {filterType === "dogs" && renderPetTable(dogsPets)}
            {filterType === "cats" && renderPetTable(catsPets)}
          </Card>
        </div>
        {/* =============================== */}

        {/* Statistik Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card title="Total Pasien" className="text-center">
            <p className="text-3xl font-bold text-[#432C81]">{pets.length}</p>
            <p className="text-sm text-gray-500">hewan terdaftar</p>
          </Card>
          <Card title="Jenis Hewan" className="text-center">
            <div className="flex justify-center gap-4">
              <div><FaDog className="text-blue-500 mx-auto" /><span className="text-sm">{pets.filter(p => p.type === "Dog").length} Anjing</span></div>
              <div><FaCat className="text-orange-500 mx-auto" /><span className="text-sm">{pets.filter(p => p.type === "Cat").length} Kucing</span></div>
            </div>
          </Card>
          <Card title="Status Kesehatan" className="text-center">
            <Badge type="success">Healthy: {pets.filter(p => p.healthStatus === "Healthy").length}</Badge>
            <Badge type="warning" className="ml-2">Perawatan: {pets.filter(p => p.healthStatus === "Under Treatment").length}</Badge>
          </Card>
        </div>
      </Container>

      {/* Modal Detail */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Detail Pasien">
        {selectedPet && (
          <div className="space-y-3">
            <p><strong>ID:</strong> {selectedPet.id}</p>
            <p><strong>Nama:</strong> {selectedPet.name}</p>
            <p><strong>Jenis:</strong> {selectedPet.type}</p>
            <p><strong>Ras:</strong> {selectedPet.breed}</p>
            <p><strong>Umur:</strong> {selectedPet.age} tahun</p>
            <p><strong>Status:</strong> <Badge type={getBadgeType(selectedPet.healthStatus)}>{selectedPet.healthStatus}</Badge></p>
            <Button type="primary" onClick={() => setIsModalOpen(false)} className="w-full">Tutup</Button>
          </div>
        )}
      </Modal>

      {/* Toast */}
      {showToast && <Toast message={toastMessage} type="success" onClose={() => setShowToast(false)} />}
    </div>
  );
}