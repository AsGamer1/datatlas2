import { Box, Stack, Typography } from "@mui/material"
import { DataGrid, gridClasses, GridToolbarContainer } from "@mui/x-data-grid"

function Toolbar({ toolbarHeight }) {
  return (
    <GridToolbarContainer sx={{ padding: 1, display: "flex", justifyContent: "center", bgcolor: "#008080", color: "white" }}>
      <Box sx={{ height: toolbarHeight }} />
    </GridToolbarContainer>
  )
}

function NoRows() {
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography variant="body2">No hay datos</Typography>
    </Stack>
  )
}

export default function DummyTable({ toolbarHeight, cols }) {

  const initialColumns = Array(cols).fill().map((_, index) => ({ ...{ id: index, field: "", flex: 1, headerAlign: 'center', align: 'center' } }))

  return (
    <DataGrid
      loading={true}
      columns={initialColumns}
      rows={[]}
      autoHeight={true}
      hideFooter
      disableColumnFilter
      disableColumnSorting
      disableColumnMenu
      disableColumnResize
      slots={{
        toolbar: Toolbar,
        noRowsOverlay: NoRows
      }}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
        toolbar: { toolbarHeight: toolbarHeight || 32 }
      }}
      sx={{
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
      }}
    />
  )
}