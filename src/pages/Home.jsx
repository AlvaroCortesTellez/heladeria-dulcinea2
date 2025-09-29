// src/pages/Home.jsx
import React from "react";
import ProductosList from "../components/productos/ProductosList";

const Home = () => (
  <div className="container mt-4">
    <h1>Lista de Productos</h1>
    <ProductosList />
  </div>
);

export default Home;

