import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "@mui/material/utils";
import { LocationOnRounded } from "@mui/icons-material";

export function CustomEditLugar({ id, field, value, label, savedOptions }) {
  const apiRef = useGridApiContext()
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(value || "")

  const fetchPlaces = useMemo(() => debounce(async (input) => {
    const response = await fetch(`/api/places?input=${encodeURIComponent(input)}`)
    const data = await response.json()
    if (data.predictions && data.predictions.length > 0) {
      setOptions(data.predictions.map((place) => ({
        main: place.structured_formatting.main_text,
        secondary: place.structured_formatting.secondary_text
      })))
    } else {
      setOptions(savedOptions)
    }
  }, 400), [savedOptions])

  useEffect(() => {
    if (inputValue) {
      fetchPlaces(inputValue)
    } else {
      setOptions(savedOptions)
    }
  }, [inputValue, fetchPlaces, savedOptions])

  const handleValueChange = (_, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue?.main || "" })
    apiRef.current.stopCellEditMode({ id, field })
  }

  return (
    <Autocomplete
      id={id}
      value={options.find(option => option.main === value) || null}
      options={options}
      inputValue={inputValue}
      filterOptions={(x) => x}
      noOptionsText="No hay ubicaciones"
      getOptionLabel={(option) => option.main || ""}
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={handleValueChange}
      fullWidth
      renderOption={({ key, ...props }, option) => (
        <li key={key} {...props}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item sx={{ display: "flex", width: 44 }}>
              <LocationOnRounded sx={{ color: "text.secondary" }} />
            </Grid>
            <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
              <Typography variant="body1">
                {option.main}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {option.secondary}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
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