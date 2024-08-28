import { useGridApiContext } from "@mui/x-data-grid";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

export function CustomEditDate({ id, value, field }) {
  const apiRef = useGridApiContext();

  const handleValueChange = (newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DateField
        fullWidth
        value={value === undefined ? value : dayjs(value)}
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