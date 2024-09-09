"use client";

import EditableDataGrid from "@/components/tables/editable";
import { getEditableEventos } from "@/actions/data/get/get-eventos";
import { postEventos } from "@/actions/data/post/post-eventos";
import { formatColumns } from "@/components/tables/columns/format-columns";
import { useEffect, useState } from "react";

async function fetchData() {
  const fetch = await getEditableEventos()
  const formattedColumns = await formatColumns(fetch.columns)
  return { formattedColumns, data: fetch.data }
}

export default function EditorEventos() {
  const [data, setData] = useState(undefined)
  const [columns, setColumns] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchData()
      .then((res) => {
        setColumns(res.formattedColumns)
        setData(res.data)
      })
  }, [saved])

  return (
    <EditableDataGrid
      columns={columns}
      data={data}
      saveAction={postEventos}
      saved={saved}
      setSaved={setSaved}
    />
  )
}