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
    [theme.breakpoints.up("md")]: {
      paddingRight: "1rem",
    },
  },
  heroHeading: {
    [theme.breakpoints.up("md")]: {
      fontSize: "6.5rem",
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
    borderRadius: 0,
  },
  sectionFeatured: {
    backgroundColor: "#000",
    padding: "1rem",
    [theme.breakpoints.up("md")]: {
      padding: "5rem 3rem",
    },
  },
  centerOnSm: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "center",
    },
    justifyContent: "start",
  },
  topProductsSection: {
    backgroundColor: "#0e0e0e",
    paddingTop: "2rem",
    paddingBottom: "4rem",
  },
  topProductCard: {
    backgroundColor: "#b4b4b4",
    padding: "1rem",
    borderRadius: "0.3rem",
  },
}));

export default useStyles;
