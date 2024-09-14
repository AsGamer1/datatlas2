import DummyTable from "@/components/tables/dummy";
import Table from "@/components/tables/table";
import { EditRounded } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

function Toolbar({ title, actions, disabled }) {
  return (
    <GridToolbarContainer sx={{ padding: 1, display: "flex", justifyContent: "center", bgcolor: "#008080", color: "white" }}>
      <Typography variant="h6">{title}</Typography>
      <Box sx={{ position: "absolute", right: 0, margin: 0.6 }}>
        {actions.map(action => (
          <IconButton key={action?.key} href={action?.href} disabled={action?.disabled} color="info" size="small" >
            <action.Icon fontSize={action?.iconFontSize || "medium"} />
          </IconButton>
        ))}
      </Box>
    </GridToolbarContainer>
  )
}

export default function PanelTable({ title, fetch, actions, disabled }) {

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
          toolbarProps={{ title, actions, disabled }}
        />
        :
        <DummyTable cols={3} />
      }
    </Paper>
  )
}