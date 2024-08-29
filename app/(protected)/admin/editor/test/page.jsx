"use client";

import { CustomEditDate } from "@/components/data/edit-date";
import { EditableDataGrid } from "@/components/data/edit-table";
import { getEditableEventos } from "@/actions/data/get/get-eventos";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function EditorEventos() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetch = await getEditableEventos();
      const formattedColumns = fetch.columns.map((column) => {
        if (column.field === "Fecha") {
          return {
            ...column,
            valueFormatter: (params) => params ? dayjs(params).format("DD/MM/YYYY") : params,
            renderEditCell: (params) => <CustomEditDate {...params} />,
          };
        }
        return column;
      });
      setColumns(formattedColumns);
      setData(fetch.data);
    }
    fetchData();
  }, []);

  const handleSave = (updatedRows, unsavedChanges) => {
    // Aquí implementarías la lógica para guardar los cambios
    console.log("Guardar cambios:", unsavedChanges);
  };

  return (
    <EditableDataGrid
      columns={columns}
      data={data}
      onSave={handleSave}
    />
  );
}