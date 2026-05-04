import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-soft-pink">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <div className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      </div>
      <div className={`transition-all duration-300 ${!isSidebarCollapsed ? "lg:ml-72" : "lg:ml-20"}`}>
        <Header onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <main className="p-4 md:p-6"><Outlet /></main>
        <footer className="bg-white border-t border-pink-100 py-4 px-6 mt-8 text-center">
          <p className="text-xs text-pink-400">© 2026 Paws & Care Veterinary Clinic. All rights reserved.</p>
          <p className="text-[10px] text-pink-300 mt-1">Caring for your beloved pets with love and expertise</p>
        </footer>
      </div>
    </div>
  );
}