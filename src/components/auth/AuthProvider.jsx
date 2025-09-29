// src/components/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Log inicial de configuración
    console.log("✅ Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("✅ Supabase Anon Key:", import.meta.env.VITE_SUPABASE_ANON_KEY?.slice(0, 10) + "...");

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("❌ Error obteniendo sesión:", error.message);
      }
      if (data?.session) {
        console.log("➡️ Sesión encontrada en useEffect:", data.session);
        setUser(data.session.user);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔄 Cambio en estado de auth:", _event, session);
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    console.log("🔑 Intentando login con:", email, "(password oculto)");

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Error en login:", error.message, error);
      throw error;
    }

    console.log("✅ Login exitoso:", data);
    setUser(data.user);
  };

  const logout = async () => {
    console.log("🚪 Cerrando sesión...");
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
