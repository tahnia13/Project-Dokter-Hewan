import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div id="petowners-page">
      <PageHeader title="Pemilik Hewan" breadcrumb={["Dashboard", "Pet Owner List"]}>
        <button 
          onClick={() => navigate("/add-pet-owner")} 
          className="bg-gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center gap-2 font-inter"
        >
          <FaPlus size={14} /> Tambah Pemilik
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#CCC3FF]/30">
          
          <div className="p-6 border-b border-[#CCC3FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#432C81] font-nunito">Daftar Pemilik Hewan</h2>
              <p className="text-gray-400 text-sm font-inter">Kelola data pemilik dan riwayat kunjungan</p>
            </div>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari nama, email, atau telepon..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#CCC3FF] rounded-xl focus:ring-2 focus:ring-[#432C81] outline-none transition-all font-inter"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#F5F3FF] text-gray-600 text-sm uppercase border-b border-[#CCC3FF]/30">
                <tr>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">ID</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Nama Pemilik</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Kontak</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Alamat</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Hewan</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Kunjungan</th>
                  <th className="p-4 font-bold text-center text-[#432C81] font-nunito">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCC3FF]/20">
                {filteredOwners.map((owner) => (
                  <tr key={owner.id} className="hover:bg-[#F5F3FF] transition-colors">
                    <td className="p-4 text-[#432C81] font-mono font-bold text-sm">
                      {owner.id}
                    </td>
                    <td className="p-4">
                      <Link to={`/pet-owners/${owner.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                          <FaUser className="text-[#432C81]" />
                        </div>
                        <div>
                          <span className="font-medium text-slate-700 hover:text-[#432C81] transition-colors">{owner.name}</span>
                          <span className="text-gray-400 text-xs block">Bergabung: {owner.joinDate}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-700">{owner.phone}</div>
                      <div className="text-gray-400 text-xs">{owner.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMapMarkerAlt size={12} className="text-gray-400" />
                        <span className="truncate max-w-[200px]">{owner.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <FaPaw size={12} className="text-[#432C81]" />
                        <span>{getOwnerPets(owner.id) || "-"}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-600 border border-blue-200">
                        {owner.totalVisits} Kali
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link to={`/pet-owners/${owner.id}`} className="text-blue-500 hover:text-blue-700 transition-colors" title="Detail">
                          <FaEye size={18} />
                        </Link>
                        <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(owner.id, owner.name)}
                          className="text-red-500 hover:text-red-700 transition-colors" 
                          title="Hapus"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOwners.length === 0 && (
            <div className="p-20 text-center">
              <FaUser className="text-[#CCC3FF] text-6xl mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Tidak ada data pemilik ditemukan.</p>
            </div>
          )}

          <div className="px-6 py-4 border-t border-[#CCC3FF]/30 flex justify-between items-center">
            <p className="text-sm text-gray-500">Menampilkan {filteredOwners.length} dari {owners.length} pemilik</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">Previous</button>
              <button className="px-3 py-1 bg-gradient-primary text-white rounded-lg text-sm shadow-md">1</button>
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">2</button>
              <button className="px-3 py-1 border border-[#CCC3FF] rounded-lg text-sm text-gray-600 hover:bg-[#F5F3FF]">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}