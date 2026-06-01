import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const translateHealthStatus = (status) => {
  switch (status) {
    case "Healthy":
      return "Sehat";
    case "Under Treatment":
      return "Sedang Dirawat";
    case "Recovering":
      return "Memulih";
    case "Vaccinated":
      return "Sudah Divaksinasi";
    default:
      return status;
  }
};

export const translateAppointmentStatus = (status) => {
  switch (status) {
    case "Scheduled":
      return "Dijadwalkan";
    case "Completed":
      return "Selesai";
    case "In Progress":
      return "Sedang Berlangsung";
    case "Cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
};

export const translatePetType = (type) => {
  switch (type) {
    case "Dog":
      return "Anjing";
    case "Cat":
      return "Kucing";
    case "Rabbit":
      return "Kelinci";
    default:
      return type;
  }
};

export const translateGender = (gender) => {
  switch (gender) {
    case "Male":
      return "Jantan";
    case "Female":
      return "Betina";
    default:
      return gender;
  }
};

export const translateDoctorStatus = (status) => {
  switch (status) {
    case "Active":
      return "Aktif";
    case "On Leave":
      return "Cuti";
    default:
      return status;
  }
};
