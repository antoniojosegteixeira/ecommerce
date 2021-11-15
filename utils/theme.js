import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    color: "red",
    h1: {
      fontSize: 40,
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#f0c000",
    },
    secondary: {
      main: "#208080",
    },
  },
});

export default theme;
