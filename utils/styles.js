import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "black",
    "& a": {
      color: "#ff3",
    },
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
  },
});

export default useStyles;
