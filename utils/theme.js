import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

const darkGray = "#212529";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      color: darkGray,
      h1: {
        fontFamily: "Staatliches",
        color: darkGray,
      },
      h2: {
        fontFamily: "Staatliches",
        color: darkGray,
      },
      h3: {
        fontFamily: "Staatliches",
        color: darkGray,
      },
      h4: {
        fontFamily: "Staatliches",
        color: darkGray,
      },
      h5: {
        fontFamily: "Staatliches",
        color: darkGray,
      },
      subtitle1: {
        fontFamily: "Staatliches",
        fontWeight: 100,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 100,
      },
      button: {
        fontFamily: "Staatliches",
      },
    },
    palette: {
      type: "light",
      primary: {
        main: orange[500],
        contrastText: "#fff",
      },
      secondary: {
        main: "#fff",
      },
    },
  })
);

export default theme;
