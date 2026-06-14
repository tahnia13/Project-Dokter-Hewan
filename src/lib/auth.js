// src/lib/auth.js
import { supabase } from './supabase';

/**
 * 1. FUNGSI LOGIN USER (Real Supabase Auth)
 * Dipakai oleh Halaman Login untuk masuk ke sistem
 */
export const loginUser = async (email, password) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    // Ambil detail metadata (nama & role) dari tabel profiles berdasarkan ID user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;

    // Struktur data user yang disesuaikan dengan kebutuhan aplikasi Anda
    const loggedInUser = {
      id: authData.user.id,
      email: authData.user.email,
      name: profileData.name,
      role: profileData.role,
    };

    // Simpan ke localStorage agar guard routing dan session tetap terjaga saat refresh
    localStorage.setItem("current_user", JSON.stringify(loggedInUser));
    return loggedInUser;
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Gagal Masuk: " + error.message);
    return null;
  }
};

/**
 * 2. FUNGSI PENDAFTARAN / REGISTRASI USER BARU
 * Dipakai bersama oleh Halaman Pendaftaran Umum & Halaman Admin Kelola User
 */
export const registerUser = async ({ name, email, password, role = 'user' }) => {
  try {
    // Daftarkan email & password ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData?.user) {
      // Masukkan informasi pelengkap (nama & role) ke tabel custom public.profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: authData.user.id, 
            name: name, 
            email: email, 
            role: role 
          }
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
export const getUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Fetch Users Error:", error.message);
    return [];
  }
};

/**
 * 4. DELETE: HAPUS PROFIL USER
 * Dipakai oleh Admin untuk mencabut hak akses user tertentu
 */
export const deleteUser = async (id) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Delete Profil Error:", error.message);
    return false;
  }
};

/**
 * 5. FUNGSI LOGOUT & BERSIHKAN SESSION (Penyelesaian Kunci Header.jsx)
 * Menghapus token di cloud Supabase dan membersihkan storage client browser
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
 * Dipakai oleh Header.jsx untuk membaca siapa user yang sedang aktif saat ini
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
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return getSession();

    const { data: profile } = await supabase
      .from('profiles')
      .select('name, role')
      .eq('id', user.id)
      .single();

    return {
      id: user.id,
      email: user.email,
      name: profile?.name || "User",
      role: profile?.role || "user"
    };
  } catch (e) {
    return getSession();
  }
};