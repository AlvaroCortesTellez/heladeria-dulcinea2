// src/pages/Home.jsx
import React from "react";
import ProductosList from "../components/productos/ProductosList";
import { useAuth } from "../components/auth/AuthProvider";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-4">
      <h2>Bienvenido a la Heladería</h2>

      {user ? (
        <p>
          Usuario: <strong>{user.email}</strong> <br />
          Rol: <strong>{user.user_metadata?.rol || "cliente"}</strong>
        </p>
      ) : (
        <p>Estás navegando como <strong>Público</strong></p>
      )}

      <ProductosList />
    </div>
  );
};

export default Home;
