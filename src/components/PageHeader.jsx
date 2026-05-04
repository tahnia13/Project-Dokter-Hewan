import { FaHome, FaPaw } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function PageHeader({ title, breadcrumb, children, subtitle }) {
  const location = useLocation();
  const getTitle = () => {
    if (title) return title;
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/pets") return "Data Pasien";
    if (location.pathname === "/add-pet") return "Tambah Pasien";
    if (location.pathname === "/appointments") return "Janji Temu";
    if (location.pathname === "/add-appointment") return "Tambah Janji Temu";
    if (location.pathname === "/pet-owners") return "Pemilik Hewan";
    if (location.pathname === "/add-pet-owner") return "Tambah Pemilik";
    return "Dashboard";
  };
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-pink-800 flex items-center gap-2">{getTitle()}<span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full flex items-center gap-1"><FaPaw className="text-[10px]" /> Paws & Care</span></h1>
          {subtitle && <p className="text-sm text-pink-500 mt-1">{subtitle}</p>}
          <div className="flex items-center gap-2 mt-2 text-sm"><Link to="/" className="text-pink-500 hover:text-pink-700 flex items-center gap-1"><FaHome className="text-xs" /> Home</Link>{(breadcrumb || []).map((item, idx) => (<div key={idx} className="flex items-center gap-2"><span className="text-pink-300">/</span><span className={idx === (breadcrumb?.length || 0) - 1 ? "text-pink-600 font-semibold" : "text-pink-500"}>{item}</span></div>))}</div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}