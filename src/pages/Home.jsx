import React from "react";
import { useAuth } from "../components/auth/AuthProvider";
import ProductosList from "../components/productos/ProductosList";
import IngredientesList from "../components/ingredientes/IngredientesList";
import AdminPanel from "../components/admin/AdminPanel";

const Home = () => {
  const { role, user } = useAuth();

  return (
    <div className="container mt-4">
      {/* Cabecera con nombre y rol */}
      {user ? (
        <h4>
          Bienvenido <strong>{user.email}</strong> 👋 | Rol:{" "}
          <span className="badge bg-info text-dark">{role}</span>
        </h4>
      ) : (
        <h4>
          Bienvenido visitante 👋 |{" "}
          <span className="badge bg-secondary">Público</span>
        </h4>
      )}

      <hr />

      {/* ✅ Todos (incluido público) pueden ver productos */}
      <section>
        <h3>🍨 Lista de Productos</h3>
        <ProductosList />
      </section>

      {/* ✅ Cliente ve opción de compra dentro de ProductoCard */}

      {/* ✅ Empleado y Admin pueden ver ingredientes */}
      {(role === "empleado" || role === "admin") && (
        <section className="mt-4">
          <h3>🥗 Ingredientes</h3>
          <IngredientesList />
        </section>
      )}

      {/* ✅ Solo Admin puede ver panel de inventario y rentabilidad */}
      {role === "admin" && (
        <section className="mt-4">
          <AdminPanel />
        </section>
      )}
    </div>
  );
};

export default Home;
