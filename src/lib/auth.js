// src/lib/auth.js
import { supabase } from "./supabase";

/**
 * 1. FUNGSI LOGIN USER + AMBIL ROLE (SINKRON DATA & SESSION)
 * Memverifikasi kredensial ke cloud auth, menarik role dari profiles, dan membuat session.
 */
export async function loginUser(email, password) {
  try {
    // 1. Validasi email dan password ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    const userAuth = authData.user;

    // 2. Ambil data pelengkap (nama & role) dari tabel profiles cloud
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("name, role")
      .eq("id", userAuth.id)
      .single();

    if (profileError) throw profileError;

    // 3. Gabungkan data auth dan profile menjadi satu objek session
    const userData = {
      id: userAuth.id,
      email: userAuth.email,
      name: profileData.name,
      role: profileData.role, // Data role (admin/vet/user) otomatis terbawa
    };

    // 4. MASUKKAN KE KEY YANG BENAR: "current_user" agar dashboard langsung mendeteksi login
    localStorage.setItem("current_user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    alert(`Gagal Masuk: ${error.message}`);
    return null;
  }
}

/**
 * 2. FUNGSI PENDAFTARAN / REGISTRASI USER BARU
 * Dipakai bersama oleh Halaman Pendaftaran Umum & Halaman Admin Kelola User
 */
export const registerUser = async ({
  name,
  email,
  password,
  role = "user",
}) => {
  try {
    // Daftarkan email & password ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData?.user) {
      // Masukkan informasi pelengkap (nama & role) ke tabel custom public.profiles
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          name: name,
          email: email,
          role: role,
        },
      ]);

      if (profileError) throw profileError;
      return authData.user;
    }
  } catch (error) {
    console.error("Registration Error:", error.message);
    alert("Gagal mendaftarkan akun: " + error.message);
    return null;
  }
};

/**
 * 3. READ: AMBIL ALL PROFILES USER
 * Dipakai oleh Halaman Admin untuk menampilkan daftar user aktif di Grid Card
 */
export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Gagal mengambil data user:", error.message);
    return [];
  }
}

/**
 * 4. DELETE: HAPUS PROFIL USER
 * Dipakai oleh Admin untuk mencabut hak akses user tertentu
 */
export async function deleteUser(id) {
  try {
    const { error } = await supabase.from("profiles").delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    alert(`Gagal menghapus user: ${error.message}`);
    return false;
  }
}

/**
 * 5. FUNGSI LOGOUT & BERSIHKAN SESSION (Penyelesaian Kunci Header.jsx)
 * Menghapus token di cloud Supabase dan membersihkan storage client browser secara bersih
 */
export const clearSession = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.warn("Supabase signout warning:", error.message);
  } finally {
    // Bersihkan semua data sesi agar sistem kembali mengunci halaman ke rute /login
    localStorage.removeItem("current_user");
    localStorage.clear();
  }
};

/**
 * 6. FUNGSI MENGAMBIL DATA SESI LOKAL AKTIF (Penyelesaian Kunci Header.jsx)
 * Dipakai oleh Header.jsx dan Router Guard untuk membaca siapa user yang aktif saat ini
 */
export const getSession = () => {
  try {
    const userJson = localStorage.getItem("current_user");
    if (!userJson) return null;
    return JSON.parse(userJson);
  } catch (error) {
    console.error("Gagal membaca session lokal:", error);
    return null;
  }
};

/**
 * 7. FUNGSI OPTIONAL: CHECK REAL-TIME CLOUD USER
 * Digunakan sebagai cadangan pengecekan jika sinkronisasi local storage kosong
 */
export const getCurrentUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) return getSession();

    const { data: profile } = await supabase
      .from("profiles")
      .select("name, role")
      .eq("id", user.id)
      .single();

    return {
      id: user.id,
      email: user.email,
      name: profile?.name || "User",
      role: profile?.role || "user",
    };
  } catch (e) {
    return getSession();
  }
};