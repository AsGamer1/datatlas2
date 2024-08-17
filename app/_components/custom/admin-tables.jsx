import { AddRounded } from "@mui/icons-material";
import { Fab, IconButton, Paper, styled, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbarContainer } from "@mui/x-data-grid";

export default function Table({ title, data }) {
  const fields = data ? Object.keys(data[0] || {}).slice(1) : ["", "", ""]
  const columns = fields?.map((field) => { return { field: field, flex: 1, headerAlign: 'center', align: 'center' } })

  const isLoading = data ? false : true

  const Toolbar = () => {
    return (
      <GridToolbarContainer sx={{ padding: 1, display: "flex", justifyContent: "center", bgcolor: "#008080" }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton color="info" size="small" sx={{ position: "absolute", right: 0, margin: 0.6 }}>
          <AddRounded />
        </IconButton>
      </GridToolbarContainer>
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
      cursor: "text"
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-scrollbar": {
      scrollbarWidth: "thin"
    }
  }))

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "calc((100vh - 84px - 4rem) / 2)"
      }}
    >
      <Table
        loading={isLoading}
        slots={{ toolbar: Toolbar }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton"
          }
        }}
        columns={columns || [{ field: "" }]}
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