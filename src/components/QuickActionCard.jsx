import { FaArrowRight, FaHeartbeat } from "react-icons/fa";

export default function QuickActionCard({ title, description, buttonText, icon: Icon, onClick }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-pink-50/50 p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-pink-100">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-5 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-5"><div className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 p-3 text-white shadow-lg group-hover:scale-110 transition-transform">{Icon ? <Icon className="text-xl" /> : <FaHeartbeat className="text-xl" />}</div><div><h3 className="text-lg font-bold text-pink-800">{title}</h3><p className="text-sm text-pink-500">{description}</p></div></div>
        <button onClick={onClick} className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">{buttonText} <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" /></button>
      </div>
    </div>
  );
}