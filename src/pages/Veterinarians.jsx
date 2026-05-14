import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaPlus, FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt, FaIdCard, FaEdit, FaTrash, FaEye, FaStethoscope } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialVeterinarians } from "../data/clinicData";

export default function Veterinarians() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [veterinarians, setVeterinarians] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-100 text-green-600 border-green-200" 
      : "bg-yellow-100 text-yellow-600 border-yellow-200";
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus dokter "${name}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        const newVets = veterinarians.filter(v => v.id !== id);
        setVeterinarians(newVets);
        setIsDeleting(false);
        alert(`✅ Dokter ${name} berhasil dihapus!`);
      }, 500);
    }
  };

  const filtered = veterinarians.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.license.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data dokter..." />;
  if (isDeleting) return <LoadingSpinner fullScreen text="Menghapus data dokter..." />;

  return (
    <div id="veterinarians-page">
      <PageHeader title="Dokter Hewan" breadcrumb={["Dashboard", "Veterinarian List"]}>
        <button 
          onClick={() => navigate("/add-veterinarian")} 
          className="bg-gradient-primary text-white px-6 py-2 rounded-lg hover:shadow-md transition-all active:scale-95 flex items-center gap-2 font-inter"
        >
          <FaPlus size={14} /> Tambah Dokter
        </button>
      </PageHeader>

      <div className="p-5">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#CCC3FF]/30">
          
          <div className="p-6 border-b border-[#CCC3FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#432C81] font-nunito">Daftar Dokter Hewan</h2>
              <p className="text-gray-400 text-sm font-inter">Kelola tenaga medis profesional</p>
            </div>
            <div className="relative w-full md:w-80">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari nama, spesialisasi, atau STR..." 
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
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Nama Dokter</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Spesialisasi</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Kontak</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">STR</th>
                  <th className="p-4 font-bold text-[#432C81] font-nunito">Status</th>
                  <th className="p-4 font-bold text-center text-[#432C81] font-nunito">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCC3FF]/20">
                {filtered.map((vet) => (
                  <tr key={vet.id} className="hover:bg-[#F5F3FF] transition-colors">
                    <td className="p-4 text-[#432C81] font-mono font-bold text-sm">
                      {vet.id}
                    </td>
                    <td className="p-4">
                      <Link to={`/veterinarians/${vet.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="bg-[#CCC3FF]/30 p-2 rounded-lg">
                          <FaUserMd className="text-[#432C81]" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-800 hover:text-[#432C81] transition-colors">{vet.name}</span>
                          <span className="text-gray-400 text-xs block">Bergabung: {vet.joinDate}</span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <FaStethoscope size={12} className="text-[#432C81]" />
                        <span>{vet.specialization}</span>
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
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(vet.status)}`}>
                        {vet.status === "Active" ? "Aktif" : "Cuti"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <Link to={`/veterinarians/${vet.id}`} className="text-blue-500 hover:text-blue-700 transition-colors" title="Detail">
                          <FaEye size={18} />
                        </Link>
                        <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Edit">
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(vet.id, vet.name)}
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

          {filtered.length === 0 && (
            <div className="p-20 text-center">
              <FaUserMd className="text-[#CCC3FF] text-6xl mx-auto mb-4" />
              <p className="text-gray-400 font-medium">Tidak ada dokter ditemukan.</p>
            </div>
          )}

          <div className="px-6 py-4 border-t border-[#CCC3FF]/30 flex justify-between items-center">
            <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {veterinarians.length} dokter</p>
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