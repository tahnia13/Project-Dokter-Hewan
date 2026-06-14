import { getUsers } from "./auth";

export function isAdminSession() {
  try {
    const sessionRaw = localStorage.getItem("session");
    if (!sessionRaw) return false;
    const session = JSON.parse(sessionRaw);
    return session?.role === "admin";
  } catch {
    return false;
  }
}

export function listUsers() {
  return getUsers();
}

