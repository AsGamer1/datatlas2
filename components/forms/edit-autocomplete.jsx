import { Autocomplete, TextField } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

export function CustomEditAutocomplete({ id, field, value, options, label }) {
  const apiRef = useGridApiContext();

  const handleValueChange = (_, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue?.label || newValue })
    apiRef.current.stopCellEditMode({ id: id, field: field })
  }

  return (
    <Autocomplete
      id={id}
      value={value}
      options={options}
      getOptionLabel={(option) => option.label || ''}
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onChange={handleValueChange}
      fullWidth
      freeSolo
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
  )
}

/*

b8tg8rftttttt5ftttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr6y6hhuidrscw+ç/97ç4+´7i
  ///2223j3uiyucdf3ehjkk,04nhjmu3e4 bfnnnnb7yhmyh,myh,,,,,,,,,,,,,,,,mmmmmmmmmmmmmmmmmmmmmmmmmmmmm;*Ç
9ñ´´pñp-  ´-    }}
    />
  _'´ñ
}p'0`ç+.´ñh`

-Queso

*/