"use client";

import { EditableDataGrid } from "@/components/tables/editable";
import { getEditableMarcas } from "@/actions/data/get/get-marcas";
import { useEffect, useState } from "react";

export default function EditorEventos() {
  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetch = await getEditableMarcas();
      setColumns(fetch.columns);
      setData(fetch.data);
    }
    fetchData();
  }, []);

  const handleSave = (unsavedRows, newRows) => {
    // Aquí implementarías la lógica para guardar los cambios
    console.log("Guardar cambios:", unsavedRows, newRows);
  };

  return (
    <EditableDataGrid
      columns={columns}
      data={data}
      onSave={handleSave}
    />
  );
}
