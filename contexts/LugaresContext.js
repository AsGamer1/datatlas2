"use client";

import { createContext, useState, useContext } from 'react';

// Crear el contexto
const LugaresContext = createContext();

// Proveedor del contexto
export function LugaresProvider({ children }) {
  const [lugares, setLugares] = useState([]);

  const addLugar = (lugar) => {
    setLugares((prevLugares) => [...prevLugares, lugar]);
  };

  const removeLugar = (id) => {
    setLugares((prevLugares) => prevLugares.filter((lugar) => lugar.id !== id));
  };

  const clearLugares = () => {
    setLugares([]);
  };

  return (
    <LugaresContext.Provider value={{ lugares, addLugar, removeLugar, clearLugares }}>
      {children}
    </LugaresContext.Provider>
  );
}

// Hook para acceder al contexto
export function useLugares() {
  return useContext(LugaresContext);
}
