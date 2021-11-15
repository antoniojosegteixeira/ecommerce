import React, { useContext } from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  Switch,
  Badge,
} from "@material-ui/core";
import { AppContext } from "../utils/AppContext";
import { ThemeProvider } from "@material-ui/core/styles";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import theme from "../utils/theme";
import Cookies from "js-cookie";

const Layout = ({ children, title, description }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const { darkMode, cart } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

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
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="secondary"
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
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
