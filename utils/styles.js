import { makeStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  bw: {
    border: "1px solid white",
  },
  bb: {
    border: "1px solid black",
  },
  navbar: {
    backgroundColor: "black",
    "& a": {
      color: "#fff",
    },
  },
  navLinks: {
    "& a": {
      padding: "6px",
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
  },
  section: {
    marginTop: "10px",
  },
  form: {
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "white",
    textTransform: "initial",
  },
  section: {},
  error: {
    color: "#f04040",
  },
  fullWidth: {
    width: "100%",
  },
  background: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  heroTitleList: {
    width: "100%",
    "& li": {
      display: "flex",
      justifyContent: "flex-end",
    },
  },
  heroHeading: {
    [theme.breakpoints.up("md")]: {
      fontSize: "7.5rem",
    },
  },
  mainButton: {
    width: "calc(7em + 5vw)",
    padding: "1.1rem 2rem",
    backgroundColor: orange[600],
    fontSize: "calc(1.275rem + 0.3vw)",
    fontFamily: "Staatliches",
    color: "white",
    "&:hover": {
      backgroundColor: orange[400],
    },
  },
}));

export default useStyles;
