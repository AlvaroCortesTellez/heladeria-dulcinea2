// src/components/productos/ProductoCard.jsx
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const ProductoCard = ({ producto }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title>{producto.nombre}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Ingredientes:</strong> {producto.ingredientes}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Calorías:</strong> {producto.total_calorias} kcal
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Costo:</strong> ${producto.costo}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Precio público:</strong> ${producto.precio_publico}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Rentabilidad:</strong> ${producto.rentabilidad}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
