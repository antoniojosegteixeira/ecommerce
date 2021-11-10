import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Burbank Bike Shop</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>Burbank Bike Shop</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
