import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
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
});

export default useStyles;
