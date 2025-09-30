import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("publico");
  const [loading, setLoading] = useState(true);

  // 🔑 función centralizada para obtener rol desde tabla users
  const fetchUserRole = async (userId) => {
    if (!userId) {
      setRole("publico");
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("rol")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("❌ Error obteniendo rol:", error.message);
      setRole("publico");
    } else {
      console.log("✅ Rol cargado:", data.rol);
      setRole(data.rol);
    }
  };

  useEffect(() => {
    // cuando la app inicia, verificamos si hay sesión
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setUser(data.session.user);
        fetchUserRole(data.session.user.id); // 🔑 importante
      } else {
        setUser(null);
        setRole("publico");
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          fetchUserRole(session.user.id); // 🔑 cada vez que cambia la sesión
        } else {
          setRole("publico");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setUser(data.user);
    await fetchUserRole(data.user.id); // 🔑 carga de rol después del login
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("publico");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
