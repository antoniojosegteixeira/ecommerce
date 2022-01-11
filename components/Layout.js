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
  Box,
} from "@material-ui/core";
import { AppContext } from "../utils/AppContext";
import { ThemeProvider } from "@material-ui/core/styles";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import theme from "../utils/theme";
import Cookies from "js-cookie";
import { Router, useRouter } from "next/router";

const Layout = ({ children, title, description, dark }) => {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const { darkMode, cart, userInfo } = state;

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
                <Typography component="span" variant="h5" color="secondary">
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
                      <Typography className={classes.navbarButton}>
                        Cart
                      </Typography>
                    </Badge>
                  ) : (
                    <Typography className={classes.navbarButton}>
                      Cart
                    </Typography>
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
                    <Typography className={classes.navbarButton}>
                      {userInfo.name}
                    </Typography>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
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
                  <Link>
                    <Typography className={classes.navbarButton}>
                      Login
                    </Typography>
                  </Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <div
          className={classes.main}
          style={dark ? { backgroundColor: "#0e0e0e" } : {}}
        >
          {children}
        </div>
        <footer className={classes.footer}>
          <Typography variant="h1" component="h1" color="secondary">
            BURBANK BIKE SHOP
          </Typography>
          <Box display="inline-flex">
            <Link href="https://www.facebook.com/">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link href="https://www.twitter.com/">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="https://www.instagram.com/">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="https://www.youtube.com/">
              <i className="fab fa-youtube"></i>
            </Link>
          </Box>
          <Typography variant="subtitle1" component="h5" color="secondary">
            Built by Antônio Teixeira
          </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
