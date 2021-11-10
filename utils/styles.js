import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  bw: {
    "& a": {
      padding: "6px",
    },
  },
  navbar: {
    backgroundColor: "black",
    "& a": {
      color: "#fff",
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
  },
});

export default useStyles;
