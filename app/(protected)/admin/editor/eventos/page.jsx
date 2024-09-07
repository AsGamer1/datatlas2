"use client";

import { CustomEditDate } from "@/components/forms/edit-date";
import { EditableDataGrid } from "@/components/tables/editable";
import { getEditableEventos } from "@/actions/data/get/get-eventos";
import dayjs from "dayjs";
import { startTransition, useEffect, useState } from "react";
import { postEventos } from "@/actions/data/post/post-eventos";
import { Alert, Snackbar } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { CustomEditAutocomplete } from "@/components/forms/edit-autocomplete";
import { getLugares } from "@/actions/data/get/get-lugares";

export default function EditorEventos() {
  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState([]);
  const [errorResponse, setErrorResponse] = useState("");
  const [successResponse, setSuccessResponse] = useState("");

  useEffect(() => {
    async function fetchData() {
      const fetch = await getEditableEventos();
      const lugares = await getLugares();
      const formattedColumns = fetch.columns.map((column) => {
        if (column.field === "Fecha") {
          return {
            ...column,
            valueFormatter: (params) => params ? dayjs(params).format("DD/MM/YYYY") : params,
            renderEditCell: (params) => <CustomEditDate {...params} />,
          };
        } else if (column.field === "Lugar") {
          return {
            ...column,
            renderEditCell: (params) => <CustomEditAutocomplete {...params} label="Selecciona un lugar" options={lugares}/>
          }
        }
        return column;
      });
      setColumns(formattedColumns);
      setData(fetch.data);
    }
    fetchData();
  }, []);

  const handleSave = (unsavedRows, newRows) => {
    startTransition(() => {
      postEventos({ unsavedRows, newRows })
        .then((res) => {
          setErrorResponse(res?.error);
          setSuccessResponse(res?.success);
        })
    })
  }

  return (
    <>
      <EditableDataGrid
        columns={columns}
        data={data}
        saveAction={handleSave}
      />
      <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={() => setSuccessResponse("")}>
        <Alert icon={<Check />} severity="success" variant="filled">{successResponse}</Alert>
      </Snackbar>
      <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={() => setErrorResponse("")}>
        <Alert icon={<Close />} severity="error" variant="filled">{errorResponse}</Alert>
      </Snackbar>
    </>
  );
}
