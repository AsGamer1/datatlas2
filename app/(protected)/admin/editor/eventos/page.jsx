"use client";

import { getEditableEventos } from "@/actions/data/get/get-eventos";
import { AddRounded, DeleteRounded, RestoreRounded, SaveRounded } from "@mui/icons-material";
import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbarContainer, useGridApiContext, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import "dayjs/locale/es";

function EditorToolbar(props) {
  const { setData, isLoading, discardChanges, hasUnsavedRows } = props

  const AddRow = () => {
    setData((oldRows) => [...oldRows, { id: oldRows.length + 1, Fecha: dayjs(), Evento: "", Lugar: "", isNew: true }]);
  }

  return (
    <GridToolbarContainer sx={{ padding: 1, display: "flex", bgcolor: "#008080", color: "white" }}>
      <Button sx={{ display: { xs: "none", md: "inherit" } }} disabled={isLoading} key="toolbar-add-evento" startIcon={<AddRounded />} color="inherit" onClick={AddRow}>
        Añadir evento
      </Button>
      <Button sx={{ display: { xs: "none", md: "inherit" } }} disabled={!hasUnsavedRows} key="toolbar-guardar-datos" startIcon={<SaveRounded />} color="inherit" onClick={() => console.log("hola")}>
        Guardar datos
      </Button>
      <Button sx={{ display: { xs: "none", md: "inherit" } }} disabled={!hasUnsavedRows} key="toolbar-descartar-todo" startIcon={<RestoreRounded />} color="inherit" onClick={discardChanges}>
        Descartar todo
      </Button>
      <Button sx={{ display: { md: "none" } }} disabled={isLoading} key="toolbar-add-evento" startIcon={<AddRounded />} color="inherit" onClick={AddRow} />
      <Button sx={{ display: { md: "none" } }} disabled={!hasUnsavedRows} key="toolbar-guardar-datos" startIcon={<SaveRounded />} color="inherit" onClick={() => console.log("hola")} />
      <Button sx={{ display: { md: "none" } }} disabled={!hasUnsavedRows} key="toolbar-descartar-todo" startIcon={<RestoreRounded />} color="inherit" onClick={discardChanges} />
    </GridToolbarContainer>
  )
}

function NoRows() {
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography variant="body2">No hay eventos</Typography>
    </Stack>
  )
}

function CustomEditDate(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleValueChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DateField
        fullWidth
        value={dayjs(value)}
        onChange={(newValue) => handleValueChange(newValue)}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "0.875rem",
            lineHeight: "1.43",
            display: "inline-flex",
            alignItems: "center",
            height: "100%"
          },
          "& .MuiInputBase-input": {
            padding: "0px 16px"
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none"
          }
        }}
      />
    </LocalizationProvider>
  )
}

export default function EditorEventos() {

  const initialColumns = Array(4).fill().map((_, index) => ({ ...{ id: index, field: "", flex: 1, headerAlign: 'center', align: 'center' } }))

  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState(undefined)

  const apiRef = useGridApiRef();

  const [hasUnsavedRows, setHasUnsavedRows] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const unsavedChangesRef = useRef({
    unsavedRows: {},
    rowsBeforeChange: {},
  });

  const gridActionColumn = {
    field: "actions",
    type: "actions",
    getActions: ({ id, row }) => {
      return [
        <GridActionsCellItem
          key={`deshacer-${id}`}
          icon={<RestoreRounded />}
          label="Deshacer cambios"
          disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
          onClick={() => {
            apiRef.current.updateRows([
              unsavedChangesRef.current.rowsBeforeChange[id]
            ])
            delete unsavedChangesRef.current.rowsBeforeChange[id]
            delete unsavedChangesRef.current.unsavedRows[id]
            setHasUnsavedRows(
              Object.keys(unsavedChangesRef.current.unsavedRows).length > 0
            )
          }}
        />,
        <GridActionsCellItem
          key={`borrar-${id}`}
          icon={<DeleteRounded />}
          label="Borrar fila"
          onClick={() => {
            unsavedChangesRef.current.unsavedRows[id] = {
              ...row,
              _action: 'delete',
            };
            if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
              unsavedChangesRef.current.rowsBeforeChange[id] = row;
            }
            setHasUnsavedRows(true);
            apiRef.current.updateRows([row]);
          }}
        />
      ]
    }
  }

  const processRowUpdate = useCallback((newRow, oldRow) => {
    const rowId = newRow.id;

    unsavedChangesRef.current.unsavedRows[rowId] = newRow;
    if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
      unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
    }
    setHasUnsavedRows(true);
    return newRow;
  }, []);

  const discardChanges = useCallback(() => {
    setHasUnsavedRows(false);
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current.updateRows([row]);
    });
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
    };
  }, [apiRef]);

  const getRowClassName = useCallback(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
    if (unsavedRow) {
      if (unsavedRow._action === 'delete') {
        return 'row--removed';
      }
      return 'row--edited';
    }
    return '';
  }, []);

  const Table = styled(DataGrid)(() => ({
    width: "100%",
    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
      outline: 'none',
    },
    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
      outline: 'none',
    },
    [`& .${gridClasses.row}.row--removed`]: {
      backgroundColor: '#ef5350'
    },
    [`& .${gridClasses.row}.row--edited`]: {
      backgroundColor: '#ff9800'
    },
    "& .MuiDataGrid-columnHeader--sortable": {
      cursor: "default"
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      cursor: "text",
      whiteSpace: "normal !important",
      wordWrap: "normal !important",
      textAlign: "center",
      color: "white "
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-scrollbar": {
      scrollbarWidth: "thin"
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "transparent"
    }
  }))

  useEffect(() => {
    async function fetchData() {
      const fetch = await getEditableEventos();
      fetch.columns[0] = {
        ...fetch.columns[0],
        valueFormatter: (params) => dayjs(params).format("DD/MM/YYYY"),
        renderEditCell: (params) => <CustomEditDate {...params} />
      }
      fetch.columns.unshift(gridActionColumn)
      setColumns(fetch.columns)
      setData(fetch.data)
    }
    fetchData();
  }, []);

  const isLoading = !data

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
      {isLoading ?
        <Table
          slots={{ toolbar: EditorToolbar, noRowsOverlay: NoRows }}
          loading={true}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
            toolbar: { setData, isLoading, discardChanges, hasUnsavedRows }
          }}
          columns={initialColumns}
          hideFooter
          disableColumnFilter
          disableColumnSorting
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
        />
        :
        <DataGrid
          slots={{ toolbar: EditorToolbar, noRowsOverlay: NoRows }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
            toolbar: { setData, isLoading, discardChanges, hasUnsavedRows }
          }}
          columns={columns}
          rows={data}
          autoHeight={isLoading}
          apiRef={apiRef}
          processRowUpdate={processRowUpdate}
          getRowClassName={getRowClassName}
          hideFooter
          disableColumnFilter
          disableColumnSorting
          disableColumnMenu
          disableColumnResize
          disableRowSelectionOnClick
          sx={{
            width: "100%",
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.row}.row--removed`]: {
              backgroundColor: '#ef5350'
            },
            [`& .${gridClasses.row}.row--edited`]: {
              backgroundColor: '#ff9800'
            },
            "& .MuiDataGrid-columnHeader--sortable": {
              cursor: "default"
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              cursor: "text",
              whiteSpace: "normal !important",
              wordWrap: "normal !important",
              textAlign: "center",
              color: "white "
            },
            "& .MuiDataGrid-columnSeparator": {
              display: "none"
            },
            "& .MuiDataGrid-scrollbar": {
              scrollbarWidth: "thin"
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "transparent"
            }
          }}
        />
      }
    </Paper>
  )
}