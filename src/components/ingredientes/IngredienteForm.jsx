// src/components/ingredientes/IngredienteForm.jsx
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const IngredienteForm = ({ onSaved }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [calorias, setCalorias] = useState("");
  const [inventario, setInventario] = useState(0);
  const [tipo, setTipo] = useState("base");
  const [esVegetariano, setEsVegetariano] = useState(true);
  const [esSano, setEsSano] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("ingredientes").insert([
      {
        nombre,
        precio,
        calorias,
        inventario,
        tipo,
        es_vegetariano: esVegetariano,
        es_sano: esSano,
      },
    ]);
    if (error) console.error(error);
    else onSaved(data[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="form-control mb-2"/>
      <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required className="form-control mb-2"/>
      <input type="number" placeholder="Calorías" value={calorias} onChange={(e) => setCalorias(e.target.value)} required className="form-control mb-2"/>
      <input type="number" placeholder="Inventario" value={inventario} onChange={(e) => setInventario(e.target.value)} required className="form-control mb-2"/>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="form-select mb-2">
        <option value="base">Base</option>
        <option value="complemento">Complemento</option>
      </select>
      <div className="form-check mb-2">
        <input type="checkbox" className="form-check-input" checked={esVegetariano} onChange={(e) => setEsVegetariano(e.target.checked)} />
        <label className="form-check-label">Vegetariano</label>
      </div>
      <div className="form-check mb-2">
        <input type="checkbox" className="form-check-input" checked={esSano} onChange={(e) => setEsSano(e.target.checked)} />
        <label className="form-check-label">Sano</label>
      </div>
      <button type="submit" className="btn btn-success">Agregar Ingrediente</button>
    </form>
  );
};

export default IngredienteForm;
