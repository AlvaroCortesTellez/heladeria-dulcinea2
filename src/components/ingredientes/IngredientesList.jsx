// src/components/ingredientes/IngredientesList.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import IngredienteForm from "./IngredienteForm";

const IngredientesList = () => {
  const [ingredientes, setIngredientes] = useState([]);

  const fetchIngredientes = async () => {
    const { data, error } = await supabase.from("ingredientes").select("*");
    if (error) console.error(error);
    else setIngredientes(data);
  };

  useEffect(() => {
    fetchIngredientes();
  }, []);

  const handleSaved = (ingrediente) => {
    setIngredientes([...ingredientes, ingrediente]);
  };

  return (
    <div className="container mt-4">
      <h3>Ingredientes</h3>
      <IngredienteForm onSaved={handleSaved} />
      <ul className="list-group">
        {ingredientes.map((i) => (
          <li key={i.id} className="list-group-item">
            {i.nombre} - ${i.precio} - {i.calorias} cal
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientesList;
