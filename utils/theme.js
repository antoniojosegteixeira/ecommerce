import { createTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const darkGray = "#212529";

const theme = createTheme({
  typography: {
    color: darkGray,
    h1: {
      fontFamily: "Staatliches",
    },
    h2: {
      fontFamily: "Staatliches",
    },
    h3: {
      fontFamily: "Staatliches",
    },
    h4: {
      fontFamily: "Staatliches",
    },
    h5: {
      fontFamily: "Staatliches",
    },
    subtitle1: {
      fontFamily: "Staatliches",
    },
  },
  palette: {
    type: "light",
    primary: {
      main: orange[500],
    },
    secondary: {
      main: "#fff",
    },
  },
});

export default theme;
