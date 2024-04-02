import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FCFCFC",
    },
    secondary: {
      main: "#012D5A",
    },
    info: {
      main: "#009CA6",
    },
  },
});

function customTheme() {
  return theme;
}

export default customTheme;
