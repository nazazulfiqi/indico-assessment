import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e53935", 
      dark: "#cc2f2b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
