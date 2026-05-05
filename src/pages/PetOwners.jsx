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
    <div className="space-y-5">
      <PageHeader title="Pemilik Hewan" subtitle={`${owners.length} Pemilik Terdaftar`} breadcrumb={["Dashboard", "Pemilik"]}>
        <button onClick={() => navigate("/add-pet-owner")} className="btn-primary inline-flex items-center gap-1 text-sm py-1.5 px-3"><FaPlus size={12} /> Tambah Pemilik</button>
      </PageHeader>

      <div className="card p-4"><div className="relative"><FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" /><input type="text" placeholder="Cari nama, email, atau telepon..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-primary pl-9" /></div></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOwners.map((owner) => (
          <div key={owner.id} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-[#F5F3FF] to-[#EDE9FE] p-3 border-b border-[#CCC3FF]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-2 shadow-sm"><FaUser className="text-[#432C81] text-sm" /></div>
                  <div><h3 className="font-bold text-[#432C81] text-sm font-nunito">{owner.name}</h3><p className="text-[10px] text-gray-400">{owner.id}</p></div>
                </div>
                <div className="text-right"><p className="text-[9px] text-gray-500">Member since</p><p className="text-[10px] font-semibold text-[#432C81]">{owner.joinDate}</p></div>
              </div>
            </div>
            <div className="p-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-gray-500"><FaPhone className="inline mr-1 text-[10px]" /> Telepon:</span><span className="font-medium text-gray-700">{owner.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaEnvelope className="inline mr-1 text-[10px]" /> Email:</span><span className="font-medium text-gray-600 text-[11px]">{owner.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaMapMarkerAlt className="inline mr-1 text-[10px]" /> Alamat:</span><span className="font-medium text-gray-600 text-[11px]">{owner.address.substring(0, 30)}...</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaPaw className="inline mr-1 text-[10px]" /> Hewan:</span><span className="font-medium text-[#432C81] text-[11px]">{getOwnerPets(owner.id) || "-"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500"><FaCalendarAlt className="inline mr-1 text-[10px]" /> Total Kunjungan:</span><span className="font-bold text-[#432C81] text-sm">{owner.totalVisits}</span></div>
            </div>
            <div className="px-3 py-2 bg-[#F5F3FF] border-t border-[#CCC3FF]/30 flex gap-2">
              <button className="flex-1 btn-primary py-1 text-[10px] flex items-center justify-center gap-1"><FaEye size={10} /> Detail</button>
              <button className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-[#432C81] hover:bg-[#CCC3FF]/20"><FaEdit size={12} /></button>
              <button onClick={() => handleDelete(owner.id, owner.name)} className="p-1.5 border border-[#CCC3FF]/30 rounded-lg text-red-500 hover:bg-red-50"><FaTrash size={12} /></button>
            </div>
          </div>
        ))}
      </div>

      {filteredOwners.length === 0 && !isLoading && !isDeleting && (
        <div className="card p-8 text-center"><FaUser className="text-4xl text-[#CCC3FF] mx-auto mb-2" /><h3 className="text-base font-semibold text-[#432C81] font-nunito">Tidak ada data pemilik</h3><p className="text-xs text-gray-400 mt-1">Belum ada pemilik yang terdaftar</p><button onClick={() => navigate("/add-pet-owner")} className="mt-3 btn-primary inline-flex items-center gap-1 text-xs py-1.5"><FaPlus size={10} /> Tambah Pemilik</button></div>
      )}
    </div>
  );
}