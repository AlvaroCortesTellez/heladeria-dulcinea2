import React, { useState } from "react";
import SellProductModal from "./SellProductModal";
import { useAuth } from "../auth/AuthProvider";

const ProductoCard = ({ producto, onSold }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

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

        {(user?.rol === "cliente" || !user) && (
          <button className="btn btn-success mt-2" onClick={() => setShowModal(true)}>
            Vender
          </button>
        )}

        {showModal && (
          <SellProductModal
            producto={producto}
            onClose={() => setShowModal(false)}
            onSold={onSold}
          />
        )}
      </div>
    </div>
  );
};

export default ProductoCard;
