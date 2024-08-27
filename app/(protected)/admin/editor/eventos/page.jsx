"use client";

import { getEditableEventos } from "@/actions/data/get/get-eventos";
import { AddRounded, SaveRounded } from "@mui/icons-material";
import { Button, Paper, Stack, styled, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "dayjs/locale/es";

function EditorToolbar(props) {
  const { setData, isLoading } = props

  const AddRow = () => {
    setData((oldRows) => [...oldRows, { id: oldRows.length + 1, Fecha: dayjs(), Evento: "", Lugar: "", isNew: true }]);
  }

  return (
    <GridToolbarContainer key="grid-toolbar-container" sx={{ padding: 1, display: "flex", bgcolor: "#008080", color: "white" }}>
      <Button disabled={isLoading} key="toolbar-add-evento" startIcon={<AddRounded />} color="inherit" onClick={AddRow}>
        Añadir evento
      </Button>
      <Button disabled={isLoading} key="toolbar-guardar-datos" startIcon={<SaveRounded />} color="inherit" onClick={() => console.log("hola")}>
        Guardar datos
      </Button>
    </GridToolbarContainer>
  )
}

function NoRows() {
  return (
    <Stack key="no-rows-overlay" sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography key="no-rows-text" variant="body2">No hay eventos</Typography>
    </Stack>
  )
}

function CustomEditDate(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleValueChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  const DateInput = styled(DateField)(() => ({
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
  }))

  return (
    <LocalizationProvider key={`localization-provider-${id}`} dateAdapter={AdapterDayjs} adapterLocale="es">
      <DateInput fullWidth key={`date-field-${id}`} value={dayjs(value)} onChange={(newValue) => handleValueChange(newValue)} />
    </LocalizationProvider>
  )
}

export default function EditorEventos() {

  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState(Array(3).fill().map(() => ({ ...{ field: "", flex: 1, headerAlign: 'center', align: 'center' } })));

  useEffect(() => {
    async function fetchData() {
      const fetch = await getEditableEventos();
      fetch.columns[0] = {
        ...fetch.columns[0],
        valueFormatter: (params) => dayjs(params).format("DD/MM/YYYY"),
        renderEditCell: (params) => <CustomEditDate {...params} />
      }
      setColumns(fetch.columns)
      setData(fetch.data)
    }
    fetchData();
  }, []);

  const isLoading = !data

  const Table = styled(DataGrid)(() => ({
    width: "100%",
    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
      outline: 'none',
    },
    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
    {
      outline: 'none',
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

  return (
    <Paper
      elevation={5}
      key="table-paper"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc((100vh - 84px - 4rem))",
      }}
    >
      <Table
        key="table-table"
        loading={isLoading}
        slots={{ toolbar: EditorToolbar, noRowsOverlay: NoRows }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
          toolbar: { setData, isLoading }
        }}
        columns={columns}
        rows={data}
        autoHeight={isLoading}
        hideFooter
        disableColumnFilter
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
      />
    </Paper>
  )
}