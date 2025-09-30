import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const ProductoForm = ({ producto, onSaved }) => {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [precioPublico, setPrecioPublico] = useState(producto?.precio_publico || 0);
  const [ingredientes, setIngredientes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  // Cargar todos los ingredientes disponibles
  useEffect(() => {
    const fetchIngredientes = async () => {
      const { data, error } = await supabase.from("ingredientes").select("id, nombre");
      if (!error) setIngredientes(data);
      else console.error("❌ Error cargando ingredientes:", error);
    };
    fetchIngredientes();

    // Si estamos editando un producto, precargar ingredientes seleccionados
    if (producto?.producto_ingrediente) {
      const ids = producto.producto_ingrediente.map((pi) => pi.ingrediente_id);
      setSeleccionados(ids);
    }
  }, [producto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let productoId = producto?.id;

    try {
      // Crear o actualizar producto
      if (!productoId) {
        const { data, error } = await supabase
          .from("productos")
          .insert([{ nombre, precio_publico: precioPublico }])
          .select()
          .single();
        if (error) throw error;
        productoId = data.id;
      } else {
        const { error } = await supabase
          .from("productos")
          .update({ nombre, precio_publico: precioPublico })
          .eq("id", productoId);
        if (error) throw error;
      }

      // Actualizar relación producto_ingrediente
      await supabase.from("producto_ingrediente").delete().eq("producto_id", productoId);

      if (seleccionados.length > 0) {
        const relaciones = seleccionados.map((id) => ({
          producto_id: productoId,
          ingrediente_id: id,
        }));
        const { error } = await supabase.from("producto_ingrediente").insert(relaciones);
        if (error) throw error;
      }

      alert("✅ Producto guardado correctamente");
      onSaved && onSaved();
      setNombre("");
      setPrecioPublico(0);
      setSeleccionados([]);
    } catch (err) {
      console.error("❌ Error guardando producto:", err.message);
      alert("Error guardando el producto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del producto"
        className="form-control mb-2"
        required
      />
      <input
        type="number"
        value={precioPublico}
        onChange={(e) => setPrecioPublico(Number(e.target.value))}
        placeholder="Precio Público"
        className="form-control mb-2"
        required
      />

      <label className="form-label">Ingredientes:</label>
      <select
        multiple
        className="form-select mb-2"
        value={seleccionados}
        onChange={(e) =>
          setSeleccionados([...e.target.selectedOptions].map((o) => o.value))
        }
      >
        {ingredientes.map((i) => (
          <option key={i.id} value={i.id}>
            {i.nombre}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-success">
        Guardar Producto
      </button>
    </form>
  );
};

export default ProductoForm;
