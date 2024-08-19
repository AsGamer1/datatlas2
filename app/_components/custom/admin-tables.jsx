import { AddRounded } from "@mui/icons-material";
import { IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbarContainer } from "@mui/x-data-grid";

export default function Table({ title, fetch, action, disabled }) {

  const columns = fetch?.columns || Array(3).fill().map(() => ({ ...{ field: "", flex: 1, headerAlign: 'center', align: 'center' } }))
  const data = fetch?.data

  const isLoading = !data

  const Toolbar = () => {
    return (
      <GridToolbarContainer sx={{ padding: 1, display: "flex", justifyContent: "center", bgcolor: "#008080", color: "white" }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton href={action} disabled={disabled} color="info" size="small" sx={{ position: "absolute", right: 0, margin: 0.6 }}>
          <AddRounded />
        </IconButton>
      </GridToolbarContainer>
    )
  }

  const NoRows = () => {
    return (
      <Stack sx={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Typography variant="body2">{`No hay ${title.toLowerCase()}`}</Typography>
      </Stack>
    )
  }

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
    },
  }))

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc((100vh - 84px - 4rem) / 2)",
      }}
    >
      <Table
        loading={isLoading}
        slots={{ toolbar: Toolbar, noRowsOverlay: NoRows }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          }
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