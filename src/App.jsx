import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./lib/RequireAuth";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import React, { Suspense } from "react";

function App() {
  // ========== PUBLIC PAGE (GUEST) ==========
  const LandingPage = React.lazy(() => import("./pages/LandingPage"));
  
  // ========== NEW: MEMBER PAGE ==========
  const MemberPage = React.lazy(() => import("./pages/MemberPage")); // Halaman Member Baru

  // ========== MAIN PAGES (ADMIN) ==========
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Pets = React.lazy(() => import("./pages/Pets"))
  const FormPet = React.lazy(() => import("./pages/FormPet"))
  const Appointments = React.lazy(() => import("./pages/Appointments"))
  const FormAppointment = React.lazy(() => import("./pages/FormAppointment"))
  const PetOwners = React.lazy(() => import("./pages/PetOwners"))
  const FormPetOwner = React.lazy(() => import("./pages/FormPetOwner"))
  const Veterinarians = React.lazy(() => import("./pages/Veterinarians"))
  const FormVeterinarian = React.lazy(() => import("./pages/FormVeterinarian"))
  const CustomerCRM = React.lazy(() => import("./pages/CustomerCRM"))
  const CampaignPromo = React.lazy(() => import("./pages/CampaignPromo"))
  const FeedbackKomplain = React.lazy(() => import("./pages/FeedbackKomplain"))
  const ComponentShowcase = React.lazy(() => import("./pages/ComponentShowcase"));
  const CreateUser = React.lazy(() => import("./pages/auth/CreateUser"));

  // ========== DETAIL PAGES ==========
  const PetDetail = React.lazy(() => import("./pages/PetDetail"))
  const AppointmentDetail = React.lazy(() => import("./pages/AppointmentDetail"))
  const PetOwnerDetail = React.lazy(() => import("./pages/PetOwnerDetail"))
  const VeterinarianDetail = React.lazy(() => import("./pages/VeterinarianDetail"))
  
  // ========== AUTH & ERROR PAGES ==========
  const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const NotFound = React.lazy(() => import("./pages/NotFound"))
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ============================================ */}
        {/* ========== PUBLIC ROUTES (GUEST) ========== */}
        {/* ============================================ */}
        
        {/* Landing Page - Halaman Utama untuk Guest (tanpa login) */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Halaman Dashboard Member (Bebas dari MainLayout Admin) */}
        <Route path="/member" element={<MemberPage />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* ============================================ */}
        {/* ========== PROTECTED ROUTES (ADMIN) ========== */}
        {/* ============================================ */}
        <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
          {/* Dashboard - pindah ke /dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Main Routes */}
          <Route path="/pets" element={<Pets />} />
          <Route path="/add-pet" element={<FormPet />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<FormAppointment />} />
          <Route path="/pet-owners" element={<PetOwners />} />
          <Route path="/add-pet-owner" element={<FormPetOwner />} />
          <Route path="/customer-crm" element={<CustomerCRM />} />
          <Route path="/campaign-promo" element={<CampaignPromo />} />
          <Route path="/feedback-komplain" element={<FeedbackKomplain />} />
          <Route path="/veterinarians" element={<Veterinarians />} />
          <Route path="/add-veterinarian" element={<FormVeterinarian />} />
          <Route path="/showcase" element={<ComponentShowcase />} />
          <Route path="/create-user" element={<React.Suspense fallback={<Loading />}><CreateUser /></React.Suspense>} />
          
          {/* Dynamic Detail Routes */}
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/appointments/:id" element={<AppointmentDetail />} />
          <Route path="/pet-owners/:id" element={<PetOwnerDetail />} />
          <Route path="/veterinarians/:id" element={<VeterinarianDetail />} />
      
          {/* Error Routes */}
          <Route path="/error-400" element={<ErrorPage kodeError="400" deskripsiError="Bad Request" />} />
          <Route path="/error-401" element={<ErrorPage kodeError="401" deskripsiError="Unauthorized" />} />
          <Route path="/error-403" element={<ErrorPage kodeError="403" deskripsiError="Forbidden" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
} 

export default App;