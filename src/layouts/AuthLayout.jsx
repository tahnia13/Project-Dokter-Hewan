import { Outlet } from "react-router-dom";
import { FaHeartbeat, FaPaw, FaShieldAlt, FaDog, FaCat } from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#432C81] to-[#58315A] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-10 animate-float"><FaDog className="text-white/20 text-6xl" /></div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: "1s" }}><FaCat className="text-white/20 text-5xl" /></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="bg-white/20 rounded-full p-8 mb-8 animate-float backdrop-blur-sm shadow-2xl">
            <FaPaw className="text-7xl" />
          </div>
          <h1 className="text-5xl font-bold mb-4 font-nunito">Paws & Care</h1>
          <p className="text-lg opacity-90 mb-8">Professional Veterinary Clinic Management System</p>
          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm"><FaHeartbeat className="text-xl" /><span className="text-sm">500+ Happy Pets Treated</span></div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm"><FaShieldAlt className="text-xl" /><span className="text-sm">12 Professional Veterinarians</span></div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm"><FaPaw className="text-xl" /><span className="text-sm">24/7 Emergency Care</span></div>
          </div>
          <div className="absolute bottom-10 text-xs opacity-60">© 2026 Paws & Care Clinic</div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-4"><div className="bg-gradient-primary rounded-full p-4 shadow-lg"><FaPaw className="text-3xl text-white" /></div></div>
            <h2 className="text-2xl font-bold text-[#432C81] font-nunito">Welcome to Paws & Care</h2>
            <p className="text-gray-500 text-sm mt-1">Veterinary Clinic Dashboard</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}