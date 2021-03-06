import { makeStyles } from "@material-ui/core";
import { orange, grey } from "@material-ui/core/colors";

const darkGray = "#0e0e0e";
const darkBlue = "#0f1317";

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
    display: "flex",
    flexDirection: "row",
    "& a": {
      padding: "6px",
    },
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  bold: {
    fontWeight: "bold",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "84vh",
  },
  footer: {
    marginBottom: 0,
    backgroundColor: darkGray,
    overflow: "hidden",
    padding: "2rem 1rem",
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
      textAlign: "start",
    },

    "& h1": {
      lineHeight: "100%",
    },

    "& h5": {
      marginTop: "5rem",
    },

    "& a": {
      fontSize: "calc(1.3rem + 0.6vw)",
      padding: "0.6rem 1rem",
      "&:hover": {
        color: "white",
      },
    },
  },
  backTo: {
    margin: "1rem",
  },
  form: {
    padding: "1rem 0",
    maxWidth: 700,
    width: "100%",
    margin: "0 auto",
  },
  navbarButton: {
    color: "white",
    textTransform: "initial",
    fontFamily: "Staatliches",
    padding: 0,
    "&:hover": {
      textDecoration: "none",
    },
  },
  pageContainer: {
    paddingBottom: "2rem",
  },
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
    backgroundColor: darkGray,
    paddingTop: "2rem",
    paddingBottom: "4rem",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "7rem",
      paddingRight: "7rem",
    },
  },
  topProductCard: {
    backgroundColor: "white",
    paddingTop: "1.3rem",
    paddingBottom: "0.8rem",
    cursor: "pointer",
    borderRadius: "0.3rem",
  },
  ourServicesSection: {
    backgroundColor: darkGray,
    paddingBottom: "4rem",
    [theme.breakpoints.up("md")]: {
      paddingLeft: "7rem",
      paddingRight: "7rem",
    },
  },
  serviceCard: {
    backgroundColor: grey[900],
    padding: "3rem 1rem",
    borderRadius: "0.3rem",
    maxWidth: "406px",
    height: "100%",
  },
  centeredTitle: {
    width: "100%",
    paddingBottom: "1rem",
  },
  locationSection: {
    marginTop: "-2.2rem",
    backgroundColor: darkGray,
  },
  locationBox: {
    backgroundColor: darkBlue,
    borderRadius: "4px",
    maxWidth: "450px",
    boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
    padding: "1rem 0",
    zIndex: 10,
    transform: "translateY(40%)",
    margin: "0 auto",
  },
  locationBoxList: {
    maxWidth: "350px",
    justifyContent: "center",
    margin: "0 auto",

    "& i, p": {
      padding: "0 0.5rem",
    },
  },
  boxShadow: {
    boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
  },
  map: {
    width: "100%",
    height: "600px",
    color: "white",
  },
  smallButton: {
    fontSize: 17,
    padding: "0.6rem 2rem",
  },
  profileSection: {
    width: "100%",
  },
}));

export default useStyles;
