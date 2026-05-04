import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";
import React, { Suspense } from "react";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"))
  const Pets = React.lazy(() => import("./pages/Pets"))
  const FormPet = React.lazy(() => import("./pages/FormPet"))
  const Appointments = React.lazy(() => import("./pages/Appointments"))
  const FormAppointment = React.lazy(() => import("./pages/FormAppointment"))
  const PetOwners = React.lazy(() => import("./pages/PetOwners"))
  const FormPetOwner = React.lazy(() => import("./pages/FormPetOwner"))
  const Veterinarians = React.lazy(() => import("./pages/Veterinarians"))
  const FormVeterinarian = React.lazy(() => import("./pages/FormVeterinarian"))
  const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
  const Login = React.lazy(() => import("./pages/auth/Login"))
  const Register = React.lazy(() => import("./pages/auth/Register"))
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"))
  const NotFound = React.lazy(() => import("./pages/NotFound"))
  
  return (
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/add-pet" element={<FormPet />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<FormAppointment />} />
          <Route path="/pet-owners" element={<PetOwners />} />
          <Route path="/add-pet-owner" element={<FormPetOwner />} />
          <Route path="/veterinarians" element={<Veterinarians />} />
          <Route path="/add-veterinarian" element={<FormVeterinarian />} />
      
          <Route path="/error-400" element={<ErrorPage kodeError="400" deskripsiError="Bad Request" />} />
          <Route path="/error-401" element={<ErrorPage kodeError="401" deskripsiError="Unauthorized" />} />
          <Route path="/error-403" element={<ErrorPage kodeError="403" deskripsiError="Forbidden" />} />
          <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
  );
} 

export default App;