// src/components/productos/ProductoCard.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../../lib/supabaseClient";

const ProductoCard = ({ producto, role }) => {
  const { user } = useAuth();

  const ingredientes =
    producto.producto_ingrediente?.map(
      (pi) => pi.ingredientes?.nombre
    ).join(", ") || "Sin ingredientes";

  const handleCompra = async () => {
    if (!user) {
      alert("Debes iniciar sesión como cliente para comprar.");
      return;
    }

    // Calcular costo total de ingredientes
    const costoIngredientes = producto.producto_ingrediente?.reduce(
      (total, pi) => total + (pi.ingredientes?.precio || 0),
      0
    );

    const { error } = await supabase.from("ventas").insert([
      {
        producto_id: producto.id,
        user_id: user.id,
        cantidad: 1,
        total: producto.precio_publico,
      },
    ]);

    if (error) {
      console.error("❌ Error registrando venta:", error);
      alert("Error registrando la venta.");
    } else {
      alert(`✅ Venta registrada de ${producto.nombre} por $${producto.precio_publico}`);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Precio: ${producto.precio_publico}</ListGroup.Item>

          {/* Cliente */}
          {role === "cliente" && (
            <>
              <ListGroup.Item>
                Calorías:{" "}
                {producto.producto_ingrediente?.reduce(
                  (total, pi) => total + (pi.ingredientes?.calorias || 0),
                  0
                )}{" "}
                kcal
              </ListGroup.Item>
              <Button
                variant="primary"
                className="mt-2"
                onClick={handleCompra}
              >
                Comprar
              </Button>
            </>
          )}

          {/* Empleado */}
          {role === "empleado" && (
            <>
              <ListGroup.Item>
                Calorías:{" "}
                {producto.producto_ingrediente?.reduce(
                  (total, pi) => total + (pi.ingredientes?.calorias || 0),
                  0
                )}{" "}
                kcal
              </ListGroup.Item>
              <ListGroup.Item>Ingredientes: {ingredientes}</ListGroup.Item>
            </>
          )}

          {/* Admin */}
          {role === "admin" && (
            <>
              <ListGroup.Item>
                Calorías:{" "}
                {producto.producto_ingrediente?.reduce(
                  (total, pi) => total + (pi.ingredientes?.calorias || 0),
                  0
                )}{" "}
                kcal
              </ListGroup.Item>
              <ListGroup.Item>
                Costo: $
                {producto.producto_ingrediente?.reduce(
                  (total, pi) => total + (pi.ingredientes?.precio || 0),
                  0
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Rentabilidad: $
                {producto.precio_publico -
                  producto.producto_ingrediente?.reduce(
                    (total, pi) => total + (pi.ingredientes?.precio || 0),
                    0
                  )}
              </ListGroup.Item>
              <ListGroup.Item>Ingredientes: {ingredientes}</ListGroup.Item>
            </>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
