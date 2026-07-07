// src/lib/auth.js
import { supabase } from "./supabase";

/**
 * 1. FUNGSI LOGIN - Mengembalikan role dari DATABASE
 */
export async function loginUser(email, password) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;

    const userAuth = authData.user;

    // Ambil data profile dari database
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("name, role")
      .eq("id", userAuth.id);

    if (profileError) throw profileError;

    // Jika profile tidak ada, buat baru dengan role 'user'
    if (!profileData || profileData.length === 0) {
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            id: userAuth.id,
            name: userAuth.email?.split('@')[0] || "User",
            email: userAuth.email,
            role: "user",
          },
        ]);

      if (insertError) throw insertError;

      const { data: newProfileData } = await supabase
        .from("profiles")
        .select("name, role")
        .eq("id", userAuth.id);

      const userData = {
        id: userAuth.id,
        email: userAuth.email,
        name: newProfileData[0]?.name || "User",
        role: "user",
      };

      localStorage.setItem("current_user", JSON.stringify(userData));
      return userData;
    }

    // Ambil data profile pertama
    const profile = profileData[0];

    const userData = {
      id: userAuth.id,
      email: userAuth.email,
      name: profile.name,
      role: profile.role, // ← ROLE DARI DATABASE (admin, user, guest)
    };

    localStorage.setItem("current_user", JSON.stringify(userData));
    return userData;

  } catch (error) {
    console.error("Login Error:", error.message);
    alert(`Gagal Masuk: ${error.message}`);
    return null;
  }
}

/**
 * 2. FUNGSI REGISTER
 */
export const registerUser = async ({
  name,
  email,
  password,
  role = "user",
}) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData?.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: authData.user.id,
          name: name,
          email: email,
          role: role,
        },
      ]);

      if (profileError) throw profileError;

      const userData = {
        id: authData.user.id,
        email: email,
        name: name,
        role: role,
      };
      localStorage.setItem("current_user", JSON.stringify(userData));

      return authData.user;
    }
  } catch (error) {
    console.error("Registration Error:", error.message);
    alert("Gagal mendaftarkan akun: " + error.message);
    return null;
  }
};

/**
 * 3. AMBIL ALL PROFILES
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
 * 4. HAPUS PROFIL
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
 * 5. LOGOUT
 */
export const clearSession = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.warn("Supabase signout warning:", error.message);
  } finally {
    localStorage.removeItem("current_user");
    localStorage.clear();
  }
};

/**
 * 6. GET SESSION
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
 * 7. GET CURRENT USER
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
      .eq("id", user.id);

    if (!profile || profile.length === 0) {
      return {
        id: user.id,
        email: user.email,
        name: user.email?.split('@')[0] || "User",
        role: "user",
      };
    }

    return {
      id: user.id,
      email: user.email,
      name: profile[0]?.name || "User",
      role: profile[0]?.role || "user",
    };
  } catch (e) {
    return getSession();
  }
};

/**
 * 8. GET REDIRECT PATH BERDASARKAN ROLE
 */
export const getRedirectPath = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'user':
      return '/member';
    case 'guest':
      return '/';
    default:
      return '/';
  }
};

/**
 * 9. CEK APAKAH USER LOGIN
 */
export const isAuthenticated = () => {
  const user = getSession();
  return user !== null;
};

/**
 * 10. CEK ROLE USER
 */
export const getUserRole = () => {
  const user = getSession();
  return user?.role || 'guest';
};

/**
 * 11. UPDATE ROLE USER
 */
export const updateUserRole = async (userId, newRole) => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) throw error;

    const currentUser = getSession();
    if (currentUser && currentUser.id === userId) {
      currentUser.role = newRole;
      localStorage.setItem("current_user", JSON.stringify(currentUser));
    }

    return true;
  } catch (error) {
    console.error("Gagal update role:", error.message);
    return false;
  }
};