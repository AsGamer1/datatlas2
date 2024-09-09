"use client";

import { AddRounded, DeleteRounded, RestoreRounded, SaveRounded, Check, Close } from "@mui/icons-material";
import { Button, Paper, Typography, Alert, Snackbar } from "@mui/material";
import { gridClasses, GridToolbarContainer, GridActionsCellItem, useGridApiRef, GridCellModes } from "@mui/x-data-grid";
import { startTransition, useCallback, useRef, useState } from "react";
import Table from "@/components/tables/table";
import DummyTable from "@/components/tables/dummy";

// Componente reutilizable para botones de la barra de herramientas
const ToolbarButton = ({ disabled, Icon, onClick, title }) => (
  <Button disabled={disabled} startIcon={<Icon />} color="inherit" onClick={onClick}>
    <Typography sx={{ display: { xs: "none", md: "inherit" } }}>{title}</Typography>
  </Button>
)

// Componente para la barra de herramientas (Toolbar) con botones de acciones
const EditorToolbar = ({ addRow, discardChanges, hasUnsavedRows, saveChanges }) => (
  <GridToolbarContainer sx={{ padding: 1, display: "flex", bgcolor: "#008080", color: "white" }}>
    <ToolbarButton disabled={false} Icon={AddRounded} onClick={addRow} title="Añadir fila" />
    <ToolbarButton disabled={!hasUnsavedRows} Icon={SaveRounded} onClick={saveChanges} title="Guardar cambios" />
    <ToolbarButton disabled={!hasUnsavedRows} Icon={RestoreRounded} onClick={discardChanges} title="Descartar todo" />
  </GridToolbarContainer>
)

// Componente principal para el grid editable
export default function EditableDataGrid({ columns, data, saveAction, saved, setSaved }) {
  const apiRef = useGridApiRef() // Referencia al API del DataGrid
  const [hasUnsavedRows, setHasUnsavedRows] = useState(false) // Estado para verificar si hay cambios sin guardar
  const [cellModesModel, setCellModesModel] = useState({}) // Estado que controla los modos de las celdas (edición/visualización)
  const [invalidCells, setInvalidCells] = useState({}) // Estado para celdas inválidas (vacías o con formato incorrecto)
  const [errorResponse, setErrorResponse] = useState("") // Estado que genera mensajes de error para el usuario
  const [successResponse, setSuccessResponse] = useState("") // Estado que genera mensajes informando de que todo ha ido correctamente
  const [rowNum, setRowNum] = useState(0) // Contador de filas

  // Objeto que registra los cambios no guardados, las filas originales y las filas nuevas
  const unsavedChangesRef = useRef({
    unsavedRows: {}, // Filas modificadas pero no guardadas
    rowsBeforeChange: {}, // Filas antes de cualquier cambio (para deshacer)
    newRows: {} // Filas nuevas añadidas
  })

  // Función que se llama cada vez que se actualiza una fila
  const processRowUpdate = useCallback((newRow, oldRow) => {
    const rowId = newRow.id
    setHasUnsavedRows(true) // Marcamos que hay cambios sin guardar
    if (unsavedChangesRef.current.newRows[rowId]) {
      // Si es una fila nueva, se actualiza la fila en el registro de nuevas filas
      unsavedChangesRef.current.newRows[rowId] = newRow
      return newRow
    } else {
      // Si es una fila modificada, se guarda en el registro de filas sin guardar
      unsavedChangesRef.current.unsavedRows[rowId] = newRow
      if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
        unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow // Guardamos la fila original para permitir deshacer cambios
      }
      return newRow
    }
  }, [])

  const processChanges = useCallback(() => {
    setHasUnsavedRows(false)
    Object.values(unsavedChangesRef.current.unsavedRows).forEach((row) => {
      if (row._action === "delete") apiRef.current.updateRows([{ id: row.id, _action: "delete" }])
      })
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
      newRows: {}
    }
    setSaved(!saved)
  }, [apiRef, saved, setSaved])

  // Función de validación para identificar celdas vacías o inválidas
  const validateRows = useCallback((rows) => {
    const newInvalidCells = {} // Objeto para guardar las celdas inválidas
    // Por cada una de las filas...
    rows.forEach((row) => {
      // ...se mira cada uno de los campos
      Object.keys(row).forEach((field) => {
        if (row[field] === null || row[field] === "" || row[field] === undefined) {
          // Si el campo es null o una cadena vacía, se considera inválido y se añade al objeto
          if (!newInvalidCells[row.id]) {
            // Si la fila de la celda inválida no está aún en el objeto, se inicializa un objeto vacío
            newInvalidCells[row.id] = {}
          }
          newInvalidCells[row.id][field] = true // Luego se marca la celda como inválida
        }
      })
    })
    return newInvalidCells // Devuelve las celdas inválidas
  }, [])

  // Función que valida las filas y guarda los cambios
  const saveChanges = useCallback(() => {
    const unsavedRows = unsavedChangesRef.current.unsavedRows // Filas sin guardar
    const newRows = unsavedChangesRef.current.newRows // Filas nuevas

    // Todas las filas no guardadas y nuevas
    const rows = [...Object.values(unsavedRows), ...Object.values(newRows)]
    const invalidCells = validateRows(rows) // Llamamos a la validación de filas

    if (Object.keys(invalidCells).length > 0) {
      setInvalidCells(invalidCells) // Actualizar el estado para marcar visualmente las celdas inválidas
      setErrorResponse("Hay celdas inválidas") // Generar mensaje de error para el usuario
      return // Evitar el guardado
    }

    // Si no hay celdas inválidas, proceder con el guardado
    setInvalidCells({}) // Limpiar celdas inválidas
    startTransition(() => { // Iniciar guardado y generar respuestas de error o success
      saveAction({ unsavedRows, newRows })
        .then((res) => {
          setErrorResponse(res?.error)
          setSuccessResponse(res?.success)
          res?.success && processChanges(rows)
        })
    })
  }, [saveAction, processChanges, validateRows])

  // Función para descartar todos los cambios
  const discardChanges = useCallback(() => {
    setHasUnsavedRows(false) // Al descartar todos los cambios, no hay cambios sin guardar
    // Revertir las filas modificadas a su estado original
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current.updateRows([row])
    })
    // Eliminar las filas nuevas
    Object.keys(unsavedChangesRef.current.newRows).forEach((id) => {
      apiRef.current.updateRows([{ id, _action: "delete" }])
    })
    // Limpiar el registro de cambios
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
      newRows: {}
    }
  }, [apiRef])

  // Función para añadir una nueva fila
  const addRow = () => {
    const newRowId = Math.max(rowNum + 1, apiRef.current.getRowsCount() + 1) // Generar IDs autoincrementales no duplicados (error que ocurría al borrar y añadir filas nuevas continuamente). No se almacena en la base de datos, el ID se usa solo en el DataGrid
    setRowNum(newRowId) // Incrementar el contador de filas
    apiRef.current.updateRows([{ id: newRowId, isNew: true }]) // Añadir la nueva fila al DataGrid
    unsavedChangesRef.current.newRows[newRowId] = { id: newRowId } // Guardar la fila en el registro de nuevas filas
    setHasUnsavedRows(true) // Marcar que hay cambios sin guardar
  }

  // Definir la columna de acciones (deshacer cambios y borrar fila)
  const gridActionColumn = {
    field: "actions",
    type: "actions",
    getActions: ({ id, row }) => [
      <GridActionsCellItem
        key={`deshacer-${id}`}
        icon={<RestoreRounded />}
        label="Deshacer cambios"
        disabled={unsavedChangesRef.current.unsavedRows[id] === undefined} // Se desactiva el botón de deshacer si no hay cambios hechos en la fila (o si la fila se ha creado en esta sesión)
        onClick={() => {
          apiRef.current.updateRows([unsavedChangesRef.current.rowsBeforeChange[id]]) // Actualiza la fila actual a la versión sin modificar
          delete unsavedChangesRef.current.rowsBeforeChange[id] // Elimina en el registro de filas la fila sin modificar
          delete unsavedChangesRef.current.unsavedRows[id] // Elimina en el registro de filas la fila modificada
          setHasUnsavedRows(Object.keys(unsavedChangesRef.current.unsavedRows).length + Object.keys(unsavedChangesRef.current.newRows).length > 0) // Si hay filas modificadas o filas nuevas, se marca que hay filas sin guardar (true)
        }}
      />,
      <GridActionsCellItem
        key={`borrar-${id}`}
        icon={<DeleteRounded />}
        label="Borrar fila"
        onClick={() => {
          if (unsavedChangesRef.current.newRows[id]) {
            // Si la fila a borrar es nueva, se elimina directamente
            apiRef.current.updateRows([{ id: id, _action: "delete" }]) // Envía la orden de borrar la fila al DataGrid
            delete unsavedChangesRef.current.newRows[id] // Elimina la fila nueva del registro
          } else {
            // Si la fila ha sido modificada o existía de antes, se marca para su borrado al guardar los cambios
            unsavedChangesRef.current.unsavedRows[id] = { ...row, _action: "delete" } // Almacena la orden de borrar en el registro
            if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
              // Si la fila no había sido modificada, se añade la fila al registro para poder restaurarla
              unsavedChangesRef.current.rowsBeforeChange[id] = row
            }
            apiRef.current.updateRows([{ id: id, _action: "update" }]);
          }
          setHasUnsavedRows(Object.keys(unsavedChangesRef.current.unsavedRows).length + Object.keys(unsavedChangesRef.current.newRows).length > 0)
        }}
      />
    ]
  }

  // Añadir la columna de acciones al resto de columnas
  const tableColumns = [gridActionColumn, ...columns]

  // Determinar la clase CSS de cada fila según su estado (editada, añadida, eliminada)
  const getRowClassName = useCallback(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id]
    if (unsavedRow) return unsavedRow._action === "delete" ? "row--removed" : "row--edited"
    return unsavedChangesRef.current.newRows[id] ? "row--added" : ""
  }, [])

  // Determinar la clase CSS de cada celda según su validez
  const getCellClassName = useCallback(({ id, field }) => {
    return invalidCells[id]?.[field] ? "cell--invalid" : ""
  }, [invalidCells])

  // Manejo del click en las celdas (para cambiar el modo a edición con un solo click)
  const handleCellClick = useCallback((params, event) => {
    // Si la celda no es editable o el clic no es dentro de la celda, no hacer nada
    if (!params.isEditable || !event.currentTarget.contains(event.target)) return

    setCellModesModel((prevModel) => {
      // Establece todas las celdas en modo View
      const newModel = Object.keys(prevModel).reduce((acc, id) => {
        acc[id] = Object.fromEntries(
          Object.keys(prevModel[id] || {}).map((field) => [field, { mode: GridCellModes.View }])
        )
        return acc
      }, {})

      // Establece la celda actual en modo Edit
      newModel[params.id] = { [params.field]: { mode: GridCellModes.Edit } }
      return newModel
    })
  }, [])

  // Una vez manejado el click y generado el modelo de celdas, se actualiza el modo de las celdas en la tabla
  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel)
  }, [])

  // Devuelve una tabla de esqueleto si no hay datos, como si fuera un loader. Cuando hay datos, devuelve la tabla
  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: {
          xs: "calc((100vh - 84px - 8rem))",
          md: "calc((100vh - 84px - 4rem))"
        }
      }}
    >
      {data ?
        <>
          <Table
            props={{
              apiRef: apiRef,
              processRowUpdate: processRowUpdate,
              getRowClassName: getRowClassName,
              getCellClassName: getCellClassName,
              cellModesModel: cellModesModel,
              onCellModesModelChange: handleCellModesModelChange,
              onCellClick: handleCellClick,
              disableRowSelectionOnClick: true
            }}
            columns={tableColumns}
            rows={data}
            Toolbar={EditorToolbar}
            toolbarProps={{
              addRow,
              discardChanges,
              hasUnsavedRows,
              saveChanges
            }}
            sx={{
              [`& .${gridClasses.row}.row--removed`]: {
                backgroundColor: "#ef5350"
              },
              [`& .${gridClasses.row}.row--edited`]: {
                backgroundColor: "#ff9800"
              },
              [`& .${gridClasses.row}.row--added`]: {
                backgroundColor: "#4caf50"
              },
              [`& .${gridClasses.cell}.cell--invalid`]: {
                border: "2px solid red",
                backgroundColor: "#ffebee"
              },
            }}
          />
          <Snackbar open={!!successResponse} autoHideDuration={4000} onClose={() => setSuccessResponse("")}>
            <Alert icon={<Check />} severity="success" variant="filled">{successResponse}</Alert>
          </Snackbar>
          <Snackbar open={!!errorResponse} autoHideDuration={4000} onClose={() => setErrorResponse("")}>
            <Alert icon={<Close />} severity="error" variant="filled">{errorResponse}</Alert>
          </Snackbar>
        </>
        :
        <DummyTable cols={3} toolbarHeight={{ xs: 32, md: 36 }} />
      }
    </Paper>
  )
}