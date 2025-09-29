// src/components/auth/Login.jsx
import React, { useState } from "react";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("📝 Formulario login enviado:", { email, password: "••••••" });

    try {
      await login(email, password);
      console.log("✅ Usuario autenticado correctamente");
    } catch (err) {
      console.error("❌ Error en Login.jsx:", err);
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column">
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control my-2"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control my-2"
        required
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
