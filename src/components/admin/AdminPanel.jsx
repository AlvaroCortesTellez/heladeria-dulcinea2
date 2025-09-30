import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { supabase } from "../../lib/supabaseClient";

const AdminPanel = () => {
  const [costos, setCostos] = useState([]);
  const [rentabilidad, setRentabilidad] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Obtener costos por producto
      const { data: costosData, error: costoError } = await supabase
        .from("v_costo_producto")
        .select("*");

      if (costoError) throw costoError;

      // Obtener rentabilidad por producto
      const { data: rentabilidadData, error: rentError } = await supabase
        .from("v_rentabilidad_producto")
        .select("*");

      if (rentError) throw rentError;

      setCostos(costosData || []);
      setRentabilidad(rentabilidadData || []);
    } catch (err) {
      console.error("❌ Error cargando datos admin:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Cargando panel de control...</p>;

  return (
    <div className="mt-4">
      <h3>📊 Panel de Control - Inventario & Rentabilidad</h3>

      {/* Tabla de costos */}
      <h5 className="mt-3">Costo por Producto</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Costo (COP)</th>
          </tr>
        </thead>
        <tbody>
          {costos.map((c) => (
            <tr key={c.producto_id}>
              <td>{c.nombre}</td>
              <td>${c.costo}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Tabla de rentabilidad */}
      <h5 className="mt-4">Rentabilidad</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Público</th>
            <th>Costo</th>
            <th>Rentabilidad</th>
          </tr>
        </thead>
        <tbody>
          {rentabilidad.map((r) => (
            <tr key={r.producto_id}>
              <td>{r.nombre}</td>
              <td>${r.precio_publico}</td>
              <td>${r.costo}</td>
              <td>${r.rentabilidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
