import React from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import NextLink from "next/link";
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
          <NextLink href="/" passHref>
            <Link>
              <Typography>Burbank Bike Shop</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div className={classes.bw}>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography className={classes.brand}>
          Built by Antônio Teixeira
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;
