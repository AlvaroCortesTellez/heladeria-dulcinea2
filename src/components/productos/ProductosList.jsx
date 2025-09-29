import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductoCard from "./ProductoCard";

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from("v_rentabilidad_producto")
      .select(`
        producto_id,
        nombre,
        precio_publico,
        costo,
        rentabilidad,
        total_calorias,
        producto_ingrediente ( ingrediente(nombre) )
      `);
    if (error) console.error(error);
    else setProductos(data);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-start">
      {productos.map((p) => (
        <ProductoCard key={p.producto_id} producto={p} onSold={fetchProductos} />
      ))}
    </div>
  );
};

export default ProductosList;
