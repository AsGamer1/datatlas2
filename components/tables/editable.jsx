"use client";

import { AddRounded, DeleteRounded, RestoreRounded, SaveRounded } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, gridClasses, GridToolbarContainer, GridActionsCellItem, useGridApiRef, GridCellModes } from "@mui/x-data-grid";
import { useCallback, useRef, useState } from "react";

function EditorToolbar({ addRow, isLoading, discardChanges, hasUnsavedRows, onSave }) {
  return (
    <GridToolbarContainer sx={{ padding: 1, display: "flex", bgcolor: "#008080", color: "white" }}>
      <Button
        disabled={isLoading}
        startIcon={<AddRounded />}
        color="inherit"
        onClick={addRow}
      >
        <Typography
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          Añadir fila
        </Typography>
      </Button>
      <Button
        disabled={!hasUnsavedRows}
        startIcon={<SaveRounded />}
        color="inherit"
        onClick={onSave}
      >
        <Typography
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          Guardar cambios
        </Typography>
      </Button>
      <Button
        disabled={!hasUnsavedRows}
        startIcon={<RestoreRounded />}
        color="inherit"
        onClick={discardChanges}
      >
        <Typography
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          Descartar todo
        </Typography>
      </Button>
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

export function EditableDataGrid({ columns, data, onSave }) {
  const apiRef = useGridApiRef();
  const [hasUnsavedRows, setHasUnsavedRows] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cellModesModel, setCellModesModel] = useState({});

  const unsavedChangesRef = useRef({
    unsavedRows: {},
    rowsBeforeChange: {},
    newRows: {}
  });

  const processRowUpdate = useCallback((newRow, oldRow) => {
    const rowId = newRow.id;
    setHasUnsavedRows(true);
    if (unsavedChangesRef.current.newRows[rowId]) {
      unsavedChangesRef.current.newRows[rowId] = newRow
      return newRow
    } else {
      unsavedChangesRef.current.unsavedRows[rowId] = newRow;
      if (!unsavedChangesRef.current.rowsBeforeChange[rowId]) {
        unsavedChangesRef.current.rowsBeforeChange[rowId] = oldRow;
      }
      return newRow;
    }
  }, []);

  const discardChanges = useCallback(() => {
    setHasUnsavedRows(false);
    Object.values(unsavedChangesRef.current.rowsBeforeChange).forEach((row) => {
      apiRef.current.updateRows([row]);
    });
    Object.keys(unsavedChangesRef.current.newRows).forEach((id) => {
      apiRef.current.updateRows([{ id, _action: 'delete' }]);
    });
    unsavedChangesRef.current = {
      unsavedRows: {},
      rowsBeforeChange: {},
      newRows: {}
    };
  }, [apiRef]);

  const addRow = () => {
    const newRowId = apiRef.current.getRowsCount() + 1;
    apiRef.current.updateRows([{ id: newRowId }]);
    unsavedChangesRef.current.newRows[newRowId] = { id: newRowId };
  };

  const gridActionColumn = {
    field: "actions",
    type: "actions",
    getActions: ({ id, row }) => [
      <GridActionsCellItem
        key={`deshacer-${id}`}
        icon={<RestoreRounded />}
        label="Deshacer cambios"
        disabled={unsavedChangesRef.current.unsavedRows[id] === undefined}
        onClick={() => {
          if (unsavedChangesRef.current.newRows[id]) {
            apiRef.current.updateRows([unsavedChangesRef.current.newRows[id]]);
            delete unsavedChangesRef.current.rowsBeforeChange[id]
            delete unsavedChangesRef.current.unsavedRows[id]
          } else {
            apiRef.current.updateRows([unsavedChangesRef.current.rowsBeforeChange[id]])
            delete unsavedChangesRef.current.rowsBeforeChange[id]
            delete unsavedChangesRef.current.unsavedRows[id]
          }
          setHasUnsavedRows(Object.keys(unsavedChangesRef.current.unsavedRows).length > 0)
        }}
      />,
      <GridActionsCellItem
        key={`borrar-${id}`}
        icon={<DeleteRounded />}
        label="Borrar fila"
        onClick={() => {
          if (unsavedChangesRef.current.newRows[id]) {
            delete unsavedChangesRef.current.newRows[id];
            apiRef.current.updateRows([{ id: id, _action: "delete" }]);
          } else {
            unsavedChangesRef.current.unsavedRows[id] = { ...row, _action: "delete", };
            if (!unsavedChangesRef.current.rowsBeforeChange[id]) {
              unsavedChangesRef.current.rowsBeforeChange[id] = row;
            }
            setHasUnsavedRows(true);
            apiRef.current.updateRows([row]);
          }
        }}
      />
    ]
  }

  const tableColumns = [gridActionColumn, ...columns];

  const getRowClassName = useCallback(({ id }) => {
    const unsavedRow = unsavedChangesRef.current.unsavedRows[id];
    if (unsavedRow) {
      if (unsavedRow._action === "delete") {
        return "row--removed";
      }
      return "row--edited";
    } else {
      const newRow = unsavedChangesRef.current.newRows[id];
      if (newRow) return "row--added"
    }
    return "";
  }, []);

  const handleCellClick = useCallback((params, event) => {
    if (!params.isEditable) {
      return;
    }

    if (event.target.nodeType === 1 && !event.currentTarget.contains(event.target)) {
      return;
    }

    setCellModesModel((prevModel) => {
      return {
        ...Object.keys(prevModel).reduce(
          (acc, id) => ({
            ...acc,
            [id]: Object.keys(prevModel[id]).reduce(
              (acc2, field) => ({
                ...acc2,
                [field]: { mode: GridCellModes.View },
              }),
              {},
            ),
          }),
          {},
        ),
        [params.id]: {
          ...Object.keys(prevModel[params.id] || {}).reduce(
            (acc, field) => ({ ...acc, [field]: { mode: GridCellModes.View } }),
            {},
          ),
          [params.field]: { mode: GridCellModes.Edit },
        },
      };
    });
  }, []);

  const handleCellModesModelChange = useCallback((newModel) => {
    setCellModesModel(newModel);
  }, []);

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
      <DataGrid
        columns={tableColumns}
        rows={data}
        autoHeight={isLoading}
        apiRef={apiRef}
        processRowUpdate={processRowUpdate}
        getRowClassName={getRowClassName}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        onCellClick={handleCellClick}
        hideFooter
        disableColumnFilter
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        slots={{ toolbar: EditorToolbar, noRowsOverlay: NoRows }}
        slotProps={{
          toolbar: {
            addRow,
            isLoading,
            discardChanges,
            hasUnsavedRows,
            onSave: () => onSave(unsavedChangesRef.current.unsavedRows, unsavedChangesRef.current.newRows)
          }
        }}
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
          [`& .${gridClasses.row}.row--added`]: {
            backgroundColor: '#4caf50'
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
    </Paper>
  )
}