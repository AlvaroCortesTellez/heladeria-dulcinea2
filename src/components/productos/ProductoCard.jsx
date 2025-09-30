import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../auth/AuthProvider";

const ProductoCard = ({ producto }) => {
  const { role, user } = useAuth();

  const ingredientes =
    producto.producto_ingrediente?.map(
      (pi) => pi.ingredientes?.nombre
    ).join(", ") || "Sin ingredientes";

  const handleCompra = async () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar.");
      return;
    }

    const { error } = await supabase.from("ventas").insert([
      {
        producto_id: producto.id,
        user_id: user.id,
        cantidad: 1,
        total: producto.precio_publico,
      },
    ]);

    if (error) {
      console.error("❌ Error registrando venta:", error.message);
      alert("Hubo un error en la compra.");
    } else {
      alert(`✅ Has comprado: ${producto.nombre}`);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Precio: ${producto.precio_publico}</ListGroup.Item>
          <ListGroup.Item>Tipo: {producto.tipo}</ListGroup.Item>

          {/* Mostrar vaso o volumen si aplica */}
          {producto.vaso && (
            <ListGroup.Item>Vaso: {producto.vaso}</ListGroup.Item>
          )}
          {producto.volumen_onzas && (
            <ListGroup.Item>Volumen: {producto.volumen_onzas} oz</ListGroup.Item>
          )}

          {/* Cliente, Empleado y Admin ven ingredientes */}
          {(role === "cliente" || role === "empleado" || role === "admin") && (
            <ListGroup.Item>Ingredientes: {ingredientes}</ListGroup.Item>
          )}

          {/* Empleado y Admin ven calorías */}
          {(role === "empleado" || role === "admin") && (
            <ListGroup.Item>Calorías: {producto.total_calorias || "N/A"}</ListGroup.Item>
          )}

          {/* Solo Admin ve costo y rentabilidad */}
          {role === "admin" && (
            <>
              <ListGroup.Item>Costo: ${producto.costo || "N/A"}</ListGroup.Item>
              <ListGroup.Item>
                Rentabilidad: ${producto.rentabilidad || "N/A"}
              </ListGroup.Item>
            </>
          )}
        </ListGroup>

        {/* Solo cliente ve botón de compra */}
        {role === "cliente" && (
          <Button variant="success" className="mt-3" onClick={handleCompra}>
            🛒 Comprar
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
