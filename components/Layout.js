import React, { useContext, useState } from "react";
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
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AppContext } from "../utils/AppContext";
import { ThemeProvider } from "@material-ui/core/styles";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import theme from "../utils/theme";
import Cookies from "js-cookie";
import { Router, useRouter } from "next/router";

const Layout = ({ children, title, description }) => {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const { darkMode, cart, userInfo } = state;

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };

  // Login
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // Close Menu
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  // Logout
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    router.push("/");
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
                <Typography component="span" variant="h5">
                  Burbank Bike Shop
                </Typography>
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
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order History
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.main}>{children}</div>
        <footer className={classes.footer}>
          <Typography variant="h1">Built by Antônio Teixeira</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
