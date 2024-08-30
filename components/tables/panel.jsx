import DummyTable from "@/components/tables/dummy";
import Table from "@/components/tables/table";
import { AddRounded } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

function Toolbar({ title, action, disabled }) {
  return (
    <GridToolbarContainer sx={{ padding: 1, display: "flex", justifyContent: "center", bgcolor: "#008080", color: "white" }}>
      <Typography variant="h6">{title}</Typography>
      <IconButton href={action} disabled={disabled} color="info" size="small" sx={{ position: "absolute", right: 0, margin: 0.6 }}>
        <AddRounded />
      </IconButton>
    </GridToolbarContainer>
  )
}

export default function PanelTable({ title, fetch, action, disabled }) {

  const columns = fetch?.columns
  const data = fetch?.data

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
      {data ?
        <Table
          isLoading={false}
          columns={columns}
          rows={data}
          Toolbar={Toolbar}
          title={title}
          toolbarProps={{ title, action, disabled }}
        />
        :
        <DummyTable cols={3} />
      }
    </Paper>
  )
}