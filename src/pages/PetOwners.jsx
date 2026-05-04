import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaw, FaEye, FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPetOwners, initialPets } from "../data/clinicData";

export default function PetOwners() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [owners, setOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const pets = initialPets;

  useEffect(() => {
    setTimeout(() => {
      setOwners(initialPetOwners);
      setIsLoading(false);
    }, 500);
  }, []);

  const getOwnerPets = (ownerId) => {
    return pets.filter(pet => pet.ownerId === ownerId).map(pet => `${pet.name} (${pet.type})`).join(", ");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus pemilik "${name}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newOwners = owners.filter(o => o.id !== id);
        setOwners(newOwners);
        initialPetOwners.length = 0;
        initialPetOwners.push(...newOwners);
        setIsDeleting(false);
        alert(`✅ Pemilik ${name} berhasil dihapus!`);
      }, 500);
    }
  };

  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    owner.phone.includes(searchTerm)
  );

if (isLoading) return <LoadingSpinner fullScreen text="Memuat data pemilik..." />;
if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data pemilik..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Pemilik Hewan" subtitle={`${owners.length} Pemilik Terdaftar`} breadcrumb={["Dashboard", "Pemilik"]}>
        <button onClick={() => navigate("/add-pet-owner")} className="btn-primary inline-flex items-center gap-2"><FaPlus /> Tambah Pemilik</button>
      </PageHeader>

      <div className="card p-5"><div className="relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" /><input type="text" placeholder="Cari nama, email, atau telepon..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-11" /></div></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOwners.map((owner) => (
          <div key={owner.id} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 border-b border-pink-100"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="bg-white rounded-full p-3 shadow-sm"><FaUser className="text-pink-500 text-xl" /></div><div><h3 className="font-bold text-pink-800 text-lg">{owner.name}</h3><p className="text-xs text-pink-400">{owner.id}</p></div></div><div className="text-right"><p className="text-xs text-pink-500">Member since</p><p className="text-sm font-semibold text-pink-700">{owner.joinDate}</p></div></div></div>
            <div className="p-5 space-y-3"><div className="flex justify-between text-sm"><span className="text-pink-500"><FaPhone className="inline mr-1" /> Telepon:</span><span className="font-medium text-pink-800">{owner.phone}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaEnvelope className="inline mr-1" /> Email:</span><span className="font-medium text-pink-800 text-sm">{owner.email}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaMapMarkerAlt className="inline mr-1" /> Alamat:</span><span className="font-medium text-pink-800 text-sm">{owner.address}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaPaw className="inline mr-1" /> Hewan:</span><span className="font-medium text-pink-800 text-sm">{getOwnerPets(owner.id) || "-"}</span></div><div className="flex justify-between text-sm"><span className="text-pink-500"><FaCalendarAlt className="inline mr-1" /> Total Kunjungan:</span><span className="font-bold text-pink-600 text-lg">{owner.totalVisits}</span></div></div>
            <div className="px-5 py-3 bg-pink-50 border-t border-pink-100 flex gap-2"><button className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"><FaEye size={12} /> Detail</button><button className="p-2 border border-pink-200 rounded-lg text-pink-600 hover:bg-pink-100"><FaEdit /></button><button onClick={() => handleDelete(owner.id, owner.name)} className="p-2 border border-pink-200 rounded-lg text-red-500 hover:bg-red-50"><FaTrash /></button></div>
          </div>
        ))}
      </div>

      {filteredOwners.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-12 text-center"><FaUser className="text-6xl text-pink-300 mx-auto mb-4" /><h3 className="text-xl font-semibold text-pink-600">Tidak ada data pemilik</h3><p className="text-pink-400 mt-2">Belum ada pemilik yang terdaftar</p><button onClick={() => navigate("/add-pet-owner")} className="mt-4 btn-primary inline-flex items-center gap-2"><FaPlus /> Tambah Pemilik</button></div>
      )}
    </div>
  );
}