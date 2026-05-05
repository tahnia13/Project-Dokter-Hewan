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
    if (location.pathname === "/veterinarians") return "Dokter Hewan";
    if (location.pathname === "/add-veterinarian") return "Tambah Dokter";
    return "Dashboard";
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#CCC3FF]/30 p-4 mb-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-[#432C81] flex items-center gap-2 font-nunito">
            {getTitle()}
            <span className="text-[10px] bg-[#CCC3FF]/30 text-[#432C81] px-2 py-0.5 rounded-full flex items-center gap-1 font-inter">
              <FaPaw className="text-[8px]" /> Paws & Care
            </span>
          </h1>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5 font-inter">{subtitle}</p>}
          <div className="flex items-center gap-1 mt-1 text-xs font-inter">
            <Link to="/" className="text-gray-500 hover:text-[#432C81] flex items-center gap-0.5">
              <FaHome className="text-[10px]" /> Home
            </Link>
            {(breadcrumb || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-gray-300">/</span>
                <span className={idx === (breadcrumb?.length || 0) - 1 ? "text-[#432C81] font-semibold" : "text-gray-500"}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}