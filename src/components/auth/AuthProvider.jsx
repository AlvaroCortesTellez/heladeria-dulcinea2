import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("publico"); // por defecto "público"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async (sessionUser) => {
      if (!sessionUser) {
        setRole("publico");
        return;
      }

      // buscamos el rol desde la tabla users
      const { data, error } = await supabase
        .from("users")
        .select("rol, nombre")
        .eq("id", sessionUser.id)
        .single();

      if (error) {
        console.error("❌ Error obteniendo rol:", error.message);
        setRole("publico");
      } else {
        console.log("✅ Rol cargado:", data.rol);
        setRole(data.rol);
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setUser(data.session.user);
        getUserData(data.session.user);
      } else {
        setUser(null);
        setRole("publico");
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        getUserData(session.user);
      } else {
        setRole("publico");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setUser(data.user);
    // cargar rol
    const { data: userData } = await supabase
      .from("users")
      .select("rol")
      .eq("id", data.user.id)
      .single();

    setRole(userData?.rol || "publico");
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
