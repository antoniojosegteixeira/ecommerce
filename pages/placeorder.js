import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import { useSnackbar } from "notistack";
import { useShipping } from "../hooks/shipping/useShipping";
import { calculateTotalCartPrice } from "../helpers/cartHelpers";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import Image from "next/image";
import {
  Grid,
  TableHead,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  NoSsr,
  Container,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../utils/styles";

const PlaceOrderScreen = () => {
  const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const { placeOrder } = useShipping();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  // Context state
  const {
    userInfo,
    cart: { cartItems, userAddress, paymentMethod },
  } = state;

  // Checking payment on store
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, []);

  // Calculating item price
  const { totalPrice, itemsPrice, shippingPrice } =
    calculateTotalCartPrice(cartItems);

  // Place order request
  const placeOrderHandler = () => {
    placeOrder({
      orderItems: cartItems,
      userAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    });
  };

  return (
    <NoSsr>
      <Layout title="Place Order">
        <Container style={{ paddingBottom: "3rem" }}>
          <CheckoutWizard activeStep={3} />
          <Typography component="h1" variant="h3">
            Place Order
          </Typography>

          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h5">
                      Shipping Address
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      {userAddress?.fullName}, {" "}
                      {userAddress?.address}, {" "}
                      {userAddress?.city}
                      {" - "}
                      {userAddress?.state}, {" "}
                      {userAddress?.postalCode}
                    </Typography>
                  </ListItem>
                </List>
              </Card>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h5">
                      Payment Method
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>{paymentMethod}</Typography>
                  </ListItem>
                </List>
              </Card>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h5">
                      Order Items
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cartItems.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={60}
                                      height={40}
                                    ></Image>
                                  </Link>
                                </NextLink>
                              </TableCell>

                              <TableCell>
                                <NextLink
                                  href={`/product/${item.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <Typography className={classes.bold}>
                                      {item.name}
                                    </Typography>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                {item.quantity}
                              </TableCell>
                              <TableCell align="right">${item.price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>
              </Card>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2">Order Summary</Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Items:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">${itemsPrice}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Shipping:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">${shippingPrice}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Total</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>${totalPrice}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </ListItem>
                  {loading && (
                    <ListItem align="center">
                      <CircularProgress />
                    </ListItem>
                  )}
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </NoSsr>
  );
};

export default PlaceOrderScreen;
