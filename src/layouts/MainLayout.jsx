import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-soft">
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>

      <div className={`transition-all duration-300 ease-in-out ${!isSidebarCollapsed ? "lg:ml-80" : "lg:ml-20"}`}>
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        
        <main className="p-6">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
        
        <footer className="bg-white/50 backdrop-blur-sm border-t border-[#CCC3FF]/30 py-4 px-6 mt-8 text-center">
          <p className="text-xs text-gray-400 font-inter">© 2026 Paws & Care Veterinary Clinic. All rights reserved.</p>
          <p className="text-[10px] text-gray-400 mt-1 font-inter">Caring for your beloved pets with love and expertise</p>
        </footer>
      </div>
    </div>
  );
}