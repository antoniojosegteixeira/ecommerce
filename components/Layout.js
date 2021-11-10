import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import useStyles from "../utils/styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Burbank Bike Shop</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Burbank Bike Shop</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>Built by Antônio Teixeira</Typography>
      </footer>
    </div>
  );
};

export default Layout;
