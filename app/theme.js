"use client";

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const PoppinsFont = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

export const atlasTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0be0e0'
    },
    secondary: {
      main: '#173F3F'
    },
    info: {
      main: '#7affff'
    }
  },
  typography: {
    fontFamily: PoppinsFont.style.fontFamily,
    fontWeightRegular: 400,
    fontWeightLight: 300,
    fontWeightBold: 600,
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          height: 84
        }
      }
    }
  }
});