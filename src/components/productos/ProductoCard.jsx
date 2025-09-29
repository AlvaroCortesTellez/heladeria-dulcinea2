// src/components/productos/ProductoCard.jsx
import React from "react";

const ProductoCard = ({ producto }) => {
  const ingredientes = producto.producto_ingrediente?.map((pi) => pi.ingrediente.nombre).join(", ");

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">Ingredientes: {ingredientes || "N/A"}</p>
        <p className="card-text">Precio público: ${producto.precio_publico}</p>
        <p className="card-text">Calorías: {producto.total_calorias}</p>
        <p className="card-text">Costo: ${producto.costo}</p>
        <p className="card-text">Rentabilidad: ${producto.rentabilidad}</p>
      </div>
    </div>
  );
};

export default ProductoCard;
