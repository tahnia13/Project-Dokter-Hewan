import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaPaw, 
  FaCalendarCheck, 
  FaUsers, 
  FaHeartbeat, 
  FaDog, 
  FaCat, 
  FaArrowRight, 
  FaChartLine, 
  FaStar, 
  FaUserPlus, 
  FaSyringe, 
  FaVideo, 
  FaComment, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUserMd
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import QuickActionCard from "../components/QuickActionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { initialPets, initialAppointments, initialPetOwners, initialVeterinarians } from "../data/clinicData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [owners, setOwners] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setPets(initialPets);
      setAppointments(initialAppointments);
      setOwners(initialPetOwners);
      setVeterinarians(initialVeterinarians);
      setIsLoading(false);
    }, 500);
  }, []);

  const totalPets = pets.length;
  const totalOwners = owners.length;
  const today = new Date().toISOString().slice(0,10);
  const todayAppointments = appointments.filter(a => a.date === today).length;
  const scheduledAppointments = appointments.filter(a => a.status === "Scheduled").length;
  const dogsCount = pets.filter(p => p.type === "Dog").length;
  const catsCount = pets.filter(p => p.type === "Cat").length;
  const rabbitsCount = pets.filter(p => p.type === "Rabbit").length;
  const todaySchedule = appointments.filter(a => a.date === today).slice(0,4);

  const getPetName = (petId) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : "Unknown";
  };

  // Data Top Doctors dari Veterinarians (Paws & Care)
  const topDoctors = veterinarians.slice(0,4).map((vet, idx) => ({
    name: vet.name,
    specialty: vet.specialization,
    location: "Indonesia",
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    time: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"][idx],
    rating: (4.5 + (idx * 0.1)).toFixed(1),
    avatar: vet.name.split(" ").map(n => n[0]).join(""),
  }));

  // Categories (tetap untuk style)
  const categories = [
    { name: "Video Consultation", price: "$13.77", originalPrice: "$14.37", icon: FaVideo, color: "from-[#432C81] to-[#58315A]" },
    { name: "Chat Consultation", price: "$0.34", originalPrice: "$0.88", icon: FaComment, color: "from-[#FF8989] to-[#ECBB5F]" },
    { name: "Clinic Visit", price: "$13.88", originalPrice: null, icon: FaMapMarkerAlt, color: "from-[#432C81] to-[#CCC3FF]" },
  ];

  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  if (isLoading) return <LoadingSpinner fullScreen text="Memuat data dashboard..." />;

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Selamat datang di Paws & Care Veterinary Clinic" breadcrumb={["Dashboard"]}>
        <button onClick={() => navigate("/add-appointment")} className="btn-primary inline-flex items-center gap-2 text-sm py-2 px-4 font-inter">
          <FaUserPlus size={14} /> Janji Temu Baru
        </button>
      </PageHeader>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#432C81] to-[#58315A] rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-nunito mb-2">Looking for specialist doctor?</h2>
            <p className="text-white/80 text-sm font-inter">Upload a Prescription and Tell Us what you Need. We do the Rest!</p>
            <button className="mt-4 bg-[#ECBB5F] text-[#432C81] px-6 py-2 rounded-xl font-semibold hover:bg-[#FF8989] transition-all font-inter">
              BOOK NOW
            </button>
          </div>
          <div className="bg-white/10 rounded-full p-4">
            <FaUserMd className="text-5xl text-[#ECBB5F]" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-[#CCC3FF]/30 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-r ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white`}>
                <cat.icon className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 font-nunito">{cat.name}</h3>
                <p className="text-sm font-inter">
                  <span className="text-[#432C81] font-bold">{cat.price}</span>
                  {cat.originalPrice && <span className="text-gray-400 line-through ml-1 text-xs">{cat.originalPrice}</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Doctors & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Doctors - Data dari Veterinarians Paws & Care */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-[#CCC3FF]/30">
          <h3 className="font-bold text-lg text-[#432C81] mb-4 font-nunito">Top Doctor's</h3>
          <div className="space-y-3">
            {topDoctors.map((doctor, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-[#CCC3FF]/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-nunito">
                    {doctor.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 font-nunito">{doctor.name}</p>
                    <p className="text-xs text-gray-500 font-inter">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5 font-inter">
                      <FaMapMarkerAlt size={10} /> {doctor.location}
                      <FaCalendarAlt size={10} /> {doctor.date}
                      <FaClock size={10} /> {doctor.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
                    <FaStar className="text-yellow-500 text-xs" />
                    <span className="text-xs font-semibold font-inter">{doctor.rating}</span>
                  </div>
                  <button className="bg-[#432C81] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#58315A] transition-all font-inter">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Calendar */}
        <div className="space-y-5">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#CCC3FF]/30">
              <FaPaw className="text-[#432C81] text-xl mx-auto mb-1" />
              <p className="text-2xl font-bold text-[#432C81] font-nunito">{totalPets}</p>
              <p className="text-xs text-gray-500 font-inter">Total Pasien</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#CCC3FF]/30">
              <FaUsers className="text-[#432C81] text-xl mx-auto mb-1" />
              <p className="text-2xl font-bold text-[#432C81] font-nunito">{totalOwners}</p>
              <p className="text-xs text-gray-500 font-inter">Pemilik</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#CCC3FF]/30">
              <FaCalendarCheck className="text-[#432C81] text-xl mx-auto mb-1" />
              <p className="text-2xl font-bold text-[#432C81] font-nunito">{todayAppointments}</p>
              <p className="text-xs text-gray-500 font-inter">Hari Ini</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#CCC3FF]/30">
              <FaSyringe className="text-[#432C81] text-xl mx-auto mb-1" />
              <p className="text-2xl font-bold text-[#432C81] font-nunito">{appointments.length}</p>
              <p className="text-xs text-gray-500 font-inter">Total Janji</p>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#CCC3FF]/30">
            <h3 className="font-semibold text-gray-800 mb-3 font-nunito">Calendar</h3>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {days.map(day => (
                <div key={day} className="font-semibold text-[#432C81] py-1 font-inter">{day}</div>
              ))}
              {dates.map(date => (
                <div key={date} className={`py-1 rounded-lg cursor-pointer hover:bg-[#CCC3FF]/30 transition-all font-inter ${date === 24 ? 'bg-[#432C81] text-white' : ''}`}>
                  {date}
                </div>
              ))}
            </div>
          </div>

          {/* Available Appointment */}
          <div className="bg-gradient-to-r from-[#FF8989] to-[#ECBB5F] rounded-xl p-4 text-white">
            <div className="flex items-center gap-3">
              <FaUserMd className="text-3xl" />
              <div>
                <p className="font-semibold font-nunito">Dr. Samantha</p>
                <p className="text-xs opacity-90 font-inter">Cardiologist</p>
                <p className="text-xs mt-1 font-inter">19 June 2021, 02:00 pm</p>
              </div>
            </div>
            <button className="w-full mt-3 bg-white/20 hover:bg-white/30 rounded-lg py-2 text-sm font-semibold transition-all font-inter">
              Available Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <QuickActionCard 
          title="Quick Checkup" 
          description="Mulai pemeriksaan pasien baru" 
          buttonText="Begin Checkup" 
          icon={FaHeartbeat} 
          onClick={() => navigate("/add-pet")} 
        />
        <QuickActionCard 
          title="Clinic Occupancy" 
          description={`${scheduledAppointments ? Math.round((todayAppointments/scheduledAppointments)*100) : 0}% tingkat keterisian klinik`} 
          buttonText="View Details" 
          icon={FaChartLine} 
          onClick={() => navigate("/appointments")} 
        />
      </div>
    </div>
  );
}