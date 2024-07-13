"use client";

import { createTheme } from "@mui/material";
import { Poppins } from "next/font/google";

const PoppinsFont = Poppins({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"] })

export const atlasTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0be0e0'
    },
    secondary: {
      main: '#173F3F',
      contrastText: '#ffffff',
    },
    info: {
      main: '#7affff',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.87)',
    },
    background: {
      paper: "#333",
    },
    divider: '#222222',
  },
  typography: {
    fontFamily: PoppinsFont,
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
       regular: {
        height: 84,
        minWidth: 57
       } 
      }
    }
  }
});