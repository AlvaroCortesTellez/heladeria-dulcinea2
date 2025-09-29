// src/components/productos/SellProductModal.jsx
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../auth/AuthProvider";

const SellProductModal = ({ producto, onClose, onSold }) => {
  const { user } = useAuth();
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSell = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }

    setLoading(true);

    // Obtener ingredientes del producto
    const { data: ingredientes, error: ingError } = await supabase
      .from("producto_ingrediente")
      .select("ingrediente_id, ingrediente(inventario)")
      .eq("producto_id", producto.producto_id);

    if (ingError) {
      alert("Error al obtener ingredientes.");
      setLoading(false);
      return;
    }

    // Verificar inventario
    const outOfStock = ingredientes.some((i) => i.ingrediente.inventario < cantidad);
    if (outOfStock) {
      alert("No hay suficiente inventario.");
      setLoading(false);
      return;
    }

    // Actualizar inventario
    for (let i of ingredientes) {
      await supabase
        .from("ingredientes")
        .update({ inventario: i.ingrediente.inventario - cantidad })
        .eq("id", i.ingrediente_id);
    }

    // Registrar venta
    const total = producto.precio_publico * cantidad;
    await supabase.from("ventas").insert([
      { producto_id: producto.producto_id, user_id: user.id, cantidad, total },
    ]);

    alert("Venta realizada con éxito!");
    onSold();
    onClose();
    setLoading(false);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Vender: {producto.nombre}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Precio unitario: ${producto.precio_publico}</p>
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={handleSell} disabled={loading}>
              {loading ? "Procesando..." : "Vender"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellProductModal;

