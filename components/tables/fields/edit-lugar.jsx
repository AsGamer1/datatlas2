import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState, useMemo } from "react";
import { debounce } from "@mui/material/utils";
import { LocationOnRounded } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { useLugares } from "@/contexts/LugaresContext";

export function CustomEditLugar({ id, field, label, savedOptions }) {
  const apiRef = useGridApiContext()
  const { addLugar } = useLugares()
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [sessionToken, setSessionToken] = useState(null)

  const fetchPlaces = useMemo(() => debounce(async (input) => {
    if (input && sessionToken) {
      const response = await fetch(`/api/place/autocomplete?input=${encodeURIComponent(input)}&sessionToken=${sessionToken}`)
      const data = await response.json()
      if (data.predictions && data.predictions.length > 0) {
        setOptions(data.predictions.map((place) => ({
          main: place.structured_formatting.main_text,
          secondary: place.structured_formatting.secondary_text,
          place_id: place.place_id
        })))
      } else {
        setOptions(savedOptions)
      }
    }
  }, 400), [savedOptions, sessionToken])

  useEffect(() => {
    if (inputValue) {
      // Filtrar lugares guardados antes de llamar a la API
      const filteredOptions = savedOptions.filter((option) =>
        option.main.toLowerCase().includes(inputValue.toLowerCase())
      )
      if (filteredOptions.length > 0) {
        setOptions(filteredOptions); // Mostrar los lugares filtrados
      } else {
        if (sessionToken === null) setSessionToken(uuidv4())
        fetchPlaces(inputValue)
      }
    } else {
      setOptions(savedOptions)
    }
  }, [inputValue, fetchPlaces, savedOptions])

  const handleInputChange = (_, newInputValue, reason) => {
    if (reason === "input") {
      setInputValue(newInputValue)
    } else if (reason === "clear") {
      // Limpiar las opciones cuando se borra el input
      setInputValue("")
      setOptions(savedOptions)
    }
  }

  const handleValueChange = async (_, newValue) => {
    if (newValue) {
      if (newValue.place_id && sessionToken) {
        const isSavedOption = savedOptions.some((option) => option.place_id === newValue.place_id)

        if (!isSavedOption) {
          // Si es una búsqueda desde la API de autocomplete, hacemos la llamada a details
          const response = await fetch(`/api/place/details?placeId=${newValue?.place_id}&sessionToken=${sessionToken}`)
          const data = await response.json()
          if (data && data.result && data.result.geometry) {
            const { lat, lng } = data.result.geometry.location
            const lugar = { id: newValue.place_id, Nombre: newValue?.main, Descripcion: newValue?.secondary, Latitud: lat, Longitud: lng }
            addLugar(lugar)
          }
        } else {
          // Si selecciona un valor de savedOptions, hacemos una llamada vacía a details para evitar costes extra
          await fetch(`/api/place/details?placeId=${newValue?.place_id}&sessionToken=${sessionToken}`)
        }
      }
    }
    setSessionToken(null)
    apiRef.current.setEditCellValue({ id, field, value: newValue?.main || "" })
    apiRef.current.stopCellEditMode({ id, field })
  }

  const handleClose = async (_, reason) => {
    // Si hay un sessionToken activo pero no se seleccionó ninguna opción, hacemos una llamada vacía a details
    if (reason !== "selectOption" && sessionToken) {
      await fetch(`/api/place/details?placeId=dummy&sessionToken=${sessionToken}`);
      setSessionToken(null); // Resetear el sessionToken
    }
  };

  return (
    <Autocomplete
      id={id}
      value={null}
      options={options}
      inputValue={inputValue}
      filterOptions={(x) => x}
      noOptionsText="No hay ubicaciones"
      getOptionLabel={(option) => option.main || ""}
      renderInput={(params) => <TextField {...params} placeholder={label} />}
      onInputChange={handleInputChange}
      onChange={handleValueChange}
      onClose={handleClose}
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
      componentsProps={{ popper: { sx: { minWidth: "fit-content" } } }}
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