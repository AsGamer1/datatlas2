import { Stack, Typography } from "@mui/material"
import { DataGrid, gridClasses } from "@mui/x-data-grid"

function NoRows({ title }) {
  return (
    <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Typography variant="body2">{`No hay ${title.toLowerCase()}`}</Typography>
    </Stack>
  )
}

export default function Table({ isLoading, columns, rows, Toolbar, title, sx, props, toolbarProps }) {
  return (
    <DataGrid
      {...props}
      loading={isLoading}
      columns={columns}
      rows={rows}
      autoHeight={isLoading}
      hideFooter
      disableColumnFilter
      disableColumnSorting
      disableColumnMenu
      disableColumnResize
      slots={{
        toolbar: Toolbar || null,
        noRowsOverlay: NoRows
      }}
      slotProps={{
        loadingOverlay: {
          variant: "skeleton",
          noRowsVariant: "skeleton",
        },
        noRowsOverlay: {
          title: title || "datos"
        },
        toolbar: toolbarProps
      }}
      sx={{
        ...sx,
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