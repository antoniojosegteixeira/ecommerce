import React from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import theme from "../utils/theme";

const Layout = ({ children, title, description }) => {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>
          {title ? `${title} - Burbank Bike Shop` : "Burbank Bike Shop"}
        </title>
        {description && <meta name="description" content={description}></meta>}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Burbank Bike Shop</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div className={classes.navLinks}>
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
          <Typography variant="h1">Built by Antônio Teixeira</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
