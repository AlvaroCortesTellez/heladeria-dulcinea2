// src/components/productos/ProductoCard.jsx
import React from "react";

/**
 * ProductoCard (usa clases Bootstrap sin depender de react-bootstrap)
 * Recibe un objeto `producto` ya enriquecido con:
 * - ingredientes (string)
 * - total_calorias
 * - costo
 * - rentabilidad
 */
const ProductoCard = ({ producto }) => {
  return (
    <div className="card mb-3" style={{ width: "100%", maxWidth: 520 }}>
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text mb-1"><strong>Ingredientes: </strong>{producto.ingredientes || "—"}</p>
        <p className="card-text mb-1"><strong>Calorías: </strong>{producto.total_calorias ?? "—"} kcal</p>
        <p className="card-text mb-1"><strong>Costo de producción: </strong>{producto.costo != null ? `$${producto.costo}` : "—"}</p>
        <p className="card-text mb-1"><strong>Precio público: </strong>{producto.precio_publico != null ? `$${producto.precio_publico}` : "—"}</p>
        <p className="card-text mb-2"><strong>Rentabilidad: </strong>{producto.rentabilidad != null ? `$${producto.rentabilidad}` : "—"}</p>
        {/* Aquí puedes añadir botones según rol (venta, editar, etc.) */}
      </div>
    </div>
  );
};

export default ProductoCard;
