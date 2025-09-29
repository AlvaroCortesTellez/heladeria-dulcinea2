import React from "react";
import Navbar from "../components/common/Navbar";
import ProductosList from "../components/productos/ProductosList";

const Home = () => {
  return (
    <>
      <Navbar />
      <header className="bg-secondary text-white text-center p-5" style={{ backgroundImage: "url(/cabecera.png)", backgroundSize: "cover" }}>
        <h1>Heladería Dulcinea</h1>
      </header>
      <main className="container my-4">
        <h2>Productos Disponibles</h2>
        <ProductosList />
      </main>
    </>
  );
};

export default Home;
