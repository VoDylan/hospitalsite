import { colors, createTheme } from "@mui/material";
import { lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#012D5A",
    },
    secondary: {
      main: colors.lime[500],
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
