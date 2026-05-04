import { Outlet } from "react-router-dom";
import { FaHeartbeat, FaPaw, FaShieldAlt } from "react-icons/fa";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-600 to-rose-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="bg-white/20 rounded-full p-8 mb-8 animate-float backdrop-blur-sm shadow-2xl">
            <FaPaw className="text-7xl" />
          </div>
          <h1 className="text-5xl font-bold mb-4 font-poppins">Paws & Care</h1>
          <p className="text-lg opacity-90 mb-8">Professional Veterinary Clinic Management System</p>
          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3"><FaHeartbeat className="text-xl" /><span className="text-sm">500+ Happy Pets Treated</span></div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3"><FaShieldAlt className="text-xl" /><span className="text-sm">12 Professional Veterinarians</span></div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3"><FaPaw className="text-xl" /><span className="text-sm">24/7 Emergency Care</span></div>
          </div>
          <div className="absolute bottom-10 text-xs opacity-60">© 2026 Paws & Care Clinic</div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden flex justify-center mb-4"><div className="bg-gradient-primary rounded-full p-4 shadow-lg"><FaPaw className="text-3xl text-white" /></div></div>
            <h2 className="text-2xl font-bold text-pink-800">Welcome to Paws & Care</h2>
            <p className="text-pink-500 text-sm mt-1">Veterinary Clinic Dashboard</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}