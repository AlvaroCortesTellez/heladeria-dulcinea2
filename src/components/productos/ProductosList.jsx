// src/components/productos/ProductosList.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select(`
        id,
        nombre,
        precio_publico,
        tipo,
        vaso,
        volumen_onzas,
        producto_ingrediente (
          ingredientes (
            nombre,
            calorias,
            precio
          )
        )
      `);

    if (error) {
      console.error("❌ Error cargando productos:", error);
    } else {
      setProductos(data);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Productos disponibles</h3>
      <div className="row">
        {productos.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <ProductoCard producto={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosList;
