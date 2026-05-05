import { FaArrowRight, FaHeartbeat } from "react-icons/fa";

export default function QuickActionCard({ title, description, buttonText, icon: Icon, onClick }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-[#F5F3FF] p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-[#CCC3FF]/30">
      <div className="absolute inset-0 bg-gradient-to-r from-[#432C81] to-[#58315A] opacity-0 group-hover:opacity-5 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="rounded-lg bg-gradient-primary p-2.5 text-white shadow-md group-hover:scale-110 transition-transform">
            {Icon ? <Icon className="text-lg" /> : <FaHeartbeat className="text-lg" />}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-800 font-nunito">{title}</h3>
            <p className="text-xs text-gray-500 font-inter">{description}</p>
          </div>
        </div>
        <button onClick={onClick} className="w-full rounded-lg bg-gradient-primary px-3 py-2 text-sm font-semibold text-white hover:shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-inter">
          {buttonText} <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}