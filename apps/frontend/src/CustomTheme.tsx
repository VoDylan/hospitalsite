import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#012D5A",
    },
    info: {
      main: "#F6BD38",
    },
  },
});

function customTheme() {
  return theme;
}

export default customTheme;
