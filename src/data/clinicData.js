// Data awal Pets (12 data)
export const initialPets = [
  { id: "PET-10001", name: "Luna", type: "Dog", breed: "Golden Retriever", age: 3, gender: "Female", weight: "25 kg", ownerId: "OWN-001", lastVisit: "2026-04-15", healthStatus: "Healthy", vaccinations: ["Rabies", "DHPP"] },
  { id: "PET-10002", name: "Mochi", type: "Cat", breed: "Persian", age: 2, gender: "Male", weight: "4 kg", ownerId: "OWN-002", lastVisit: "2026-04-20", healthStatus: "Healthy", vaccinations: ["FVRCP", "Rabies"] },
  { id: "PET-10003", name: "Rocky", type: "Dog", breed: "Bulldog", age: 4, gender: "Male", weight: "28 kg", ownerId: "OWN-003", lastVisit: "2026-04-10", healthStatus: "Under Treatment", vaccinations: ["Rabies"] },
  { id: "PET-10004", name: "Coco", type: "Rabbit", breed: "Holland Lop", age: 1, gender: "Female", weight: "1.5 kg", ownerId: "OWN-004", lastVisit: "2026-04-25", healthStatus: "Healthy", vaccinations: ["RHDV"] },
  { id: "PET-10005", name: "Max", type: "Dog", breed: "Beagle", age: 5, gender: "Male", weight: "15 kg", ownerId: "OWN-005", lastVisit: "2026-04-05", healthStatus: "Recovering", vaccinations: ["Rabies", "DHPP"] },
  { id: "PET-10006", name: "Bella", type: "Cat", breed: "Maine Coon", age: 2, gender: "Female", weight: "5 kg", ownerId: "OWN-006", lastVisit: "2026-04-18", healthStatus: "Vaccinated", vaccinations: ["FVRCP", "Rabies"] },
  { id: "PET-10007", name: "Charlie", type: "Dog", breed: "Poodle", age: 3, gender: "Male", weight: "8 kg", ownerId: "OWN-007", lastVisit: "2026-04-12", healthStatus: "Healthy", vaccinations: ["Rabies", "DHPP"] },
  { id: "PET-10008", name: "Lucy", type: "Cat", breed: "Siamese", age: 4, gender: "Female", weight: "3.5 kg", ownerId: "OWN-008", lastVisit: "2026-04-22", healthStatus: "Healthy", vaccinations: ["FVRCP", "Rabies"] },
  { id: "PET-10009", name: "Simba", type: "Cat", breed: "Bengal", age: 2, gender: "Male", weight: "6 kg", ownerId: "OWN-009", lastVisit: "2026-04-28", healthStatus: "Vaccinated", vaccinations: ["FVRCP", "Rabies"] },
  { id: "PET-10010", name: "Nala", type: "Cat", breed: "Bengal", age: 1, gender: "Female", weight: "4 kg", ownerId: "OWN-009", lastVisit: "2026-04-28", healthStatus: "Vaccinated", vaccinations: ["FVRCP", "Rabies"] },
  { id: "PET-10011", name: "Oscar", type: "Dog", breed: "German Shepherd", age: 6, gender: "Male", weight: "35 kg", ownerId: "OWN-010", lastVisit: "2026-04-08", healthStatus: "Under Treatment", vaccinations: ["Rabies", "DHPP"] },
  { id: "PET-10012", name: "Milo", type: "Cat", breed: "British Shorthair", age: 3, gender: "Male", weight: "5.5 kg", ownerId: "OWN-011", lastVisit: "2026-04-30", healthStatus: "Healthy", vaccinations: ["FVRCP", "Rabies"] },
];

// Data awal Appointments (12 data)
export const initialAppointments = [
  { id: "APT-001", petId: "PET-10001", veterinarian: "Dr. Sarah Wijaya", date: "2026-05-04", time: "09:00", status: "Scheduled", symptoms: "Routine checkup" },
  { id: "APT-002", petId: "PET-10002", veterinarian: "Dr. Budi Santoso", date: "2026-05-04", time: "10:30", status: "Scheduled", symptoms: "Vaccination" },
  { id: "APT-003", petId: "PET-10003", veterinarian: "Dr. Anita Permata", date: "2026-05-04", time: "13:00", status: "In Progress", symptoms: "Limping on left leg" },
  { id: "APT-004", petId: "PET-10004", veterinarian: "Dr. Rina Anggraini", date: "2026-05-04", time: "14:30", status: "Scheduled", symptoms: "Dental check" },
  { id: "APT-005", petId: "PET-10005", veterinarian: "Dr. Andi Prakoso", date: "2026-05-03", time: "11:00", status: "Completed", symptoms: "Follow-up" },
  { id: "APT-006", petId: "PET-10006", veterinarian: "Dr. Sarah Wijaya", date: "2026-05-03", time: "15:00", status: "Completed", symptoms: "Skin allergy" },
  { id: "APT-007", petId: "PET-10007", veterinarian: "Dr. Budi Santoso", date: "2026-05-02", time: "09:30", status: "Cancelled", symptoms: "Annual checkup" },
  { id: "APT-008", petId: "PET-10008", veterinarian: "Dr. Anita Permata", date: "2026-05-02", time: "14:00", status: "Completed", symptoms: "Eye infection" },
  { id: "APT-009", petId: "PET-10009", veterinarian: "Dr. Rina Anggraini", date: "2026-05-05", time: "10:00", status: "Scheduled", symptoms: "Vaccination booster" },
  { id: "APT-010", petId: "PET-10010", veterinarian: "Dr. Andi Prakoso", date: "2026-05-05", time: "11:00", status: "Scheduled", symptoms: "First checkup" },
  { id: "APT-011", petId: "PET-10011", veterinarian: "Dr. Sarah Wijaya", date: "2026-05-05", time: "13:30", status: "Scheduled", symptoms: "Ear infection" },
  { id: "APT-012", petId: "PET-10012", veterinarian: "Dr. Budi Santoso", date: "2026-05-05", time: "15:00", status: "Scheduled", symptoms: "Weight check" },
];

// Data awal Pet Owners (11 data)
export const initialPetOwners = [
  { id: "OWN-001", name: "Budi Santoso", phone: "0812-3456-7890", email: "budi@example.com", address: "Jl. Merdeka No. 123, Jakarta", joinDate: "2024-01-15", totalVisits: 8 },
  { id: "OWN-002", name: "Siti Aminah", phone: "0813-4567-8901", email: "siti@example.com", address: "Jl. Sudirman No. 45, Bandung", joinDate: "2024-02-20", totalVisits: 5 },
  { id: "OWN-003", name: "Agus Wijaya", phone: "0814-5678-9012", email: "agus@example.com", address: "Jl. Gatot Subroto No. 78, Surabaya", joinDate: "2023-11-10", totalVisits: 12 },
  { id: "OWN-004", name: "Dewi Lestari", phone: "0815-6789-0123", email: "dewi@example.com", address: "Jl. Diponegoro No. 56, Semarang", joinDate: "2024-03-05", totalVisits: 3 },
  { id: "OWN-005", name: "Rina Kartika", phone: "0816-7890-1234", email: "rina@example.com", address: "Jl. Ahmad Yani No. 90, Medan", joinDate: "2023-09-18", totalVisits: 15 },
  { id: "OWN-006", name: "Andi Pratama", phone: "0817-8901-2345", email: "andi@example.com", address: "Jl. Pahlawan No. 34, Makassar", joinDate: "2024-01-22", totalVisits: 6 },
  { id: "OWN-007", name: "Maya Sari", phone: "0818-9012-3456", email: "maya@example.com", address: "Jl. Thamrin No. 67, Palembang", joinDate: "2024-02-14", totalVisits: 4 },
  { id: "OWN-008", name: "Dian Permata", phone: "0819-0123-4567", email: "dian@example.com", address: "Jl. Kebon Sirih No. 12, Yogyakarta", joinDate: "2023-12-01", totalVisits: 9 },
  { id: "OWN-009", name: "Rizky Ramadhan", phone: "0820-1234-5678", email: "rizky@example.com", address: "Jl. Veteran No. 89, Malang", joinDate: "2024-01-30", totalVisits: 7 },
  { id: "OWN-010", name: "Linda Wijaya", phone: "0821-2345-6789", email: "linda@example.com", address: "Jl. Cendana No. 23, Bali", joinDate: "2023-10-25", totalVisits: 11 },
  { id: "OWN-011", name: "Eko Prasetyo", phone: "0822-3456-7890", email: "eko@example.com", address: "Jl. Melati No. 45, Lombok", joinDate: "2024-02-28", totalVisits: 2 },
];

// DATA VETERINARIANS (Dokter)
export const initialVeterinarians = [
  { id: "VET-001", name: "Dr. Sarah Wijaya", specialization: "Dokter Umum", license: "STR-2024001", phone: "0812-3456-7890", email: "sarah@petcare.com", joinDate: "2020-01-15", status: "Active", photo: "/img/doctor-1.jpg" },
  { id: "VET-002", name: "Dr. Budi Santoso", specialization: "Bedah", license: "STR-2024002", phone: "0813-4567-8901", email: "budi@petcare.com", joinDate: "2019-03-20", status: "Active", photo: "/img/doctor-2.jpg" },
  { id: "VET-003", name: "Dr. Anita Permata", specialization: "Dokter Gigi", license: "STR-2024003", phone: "0814-5678-9012", email: "anita@petcare.com", joinDate: "2021-06-10", status: "Active", photo: "/img/doctor-3.jpg" },
  { id: "VET-004", name: "Dr. Rina Anggraini", specialization: "Dermatologi", license: "STR-2024004", phone: "0815-6789-0123", email: "rina@petcare.com", joinDate: "2020-11-05", status: "On Leave", photo: "/img/doctor-4.jpg" },
  { id: "VET-005", name: "Dr. Andi Prakoso", specialization: "Kardiologi", license: "STR-2024005", phone: "0816-7890-1234", email: "andi@petcare.com", joinDate: "2018-08-22", status: "Active", photo: "/img/doctor-5.jpg" },
  { id: "VET-006", name: "Dr. Maya Sari", specialization: "Dokter Umum", license: "STR-2024006", phone: "0817-8901-2345", email: "maya@petcare.com", joinDate: "2022-02-14", status: "Active", photo: "/img/doctor-6.jpg" },
];

// Helper function
export const getOwnerName = (petId, owners) => {
  const pet = initialPets.find(p => p.id === petId);
  if (!pet) return "Unknown";
  const owner = owners.find(o => o.id === pet.ownerId);
  return owner ? owner.name : "Unknown";
};

export const getOwnerPhone = (petId, owners) => {
  const pet = initialPets.find(p => p.id === petId);
  if (!pet) return "Unknown";
  const owner = owners.find(o => o.id === pet.ownerId);
  return owner ? owner.phone : "Unknown";
};