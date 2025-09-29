// src/components/productos/ProductoCard.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const ProductoCard = ({ producto }) => {
  const ingredientes =
    producto.producto_ingrediente?.map(
      (pi) => pi.ingredientes?.nombre
    ).join(", ") || "Sin ingredientes";

  return (
    <Card>
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Precio: ${producto.precio_publico}</ListGroup.Item>
          <ListGroup.Item>Tipo: {producto.tipo}</ListGroup.Item>
          {producto.vaso && (
            <ListGroup.Item>Vaso: {producto.vaso}</ListGroup.Item>
          )}
          {producto.volumen_onzas && (
            <ListGroup.Item>
              Volumen: {producto.volumen_onzas} oz
            </ListGroup.Item>
          )}
          <ListGroup.Item>Ingredientes: {ingredientes}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
