import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
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
  NoSsr,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";

const PlaceOrderScreen = () => {
  const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  // Context state
  const {
    userInfo,
    cart: { cartItems, userAddress, paymentMethod },
  } = state;

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  });

  const round = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  const itemsPrice = round(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const totalPrice = round(itemsPrice + shippingPrice);

  return (
    <NoSsr>
      <Layout title="Place Order">
        <CheckoutWizard activeStep={3} />
        <Typography component="h1" variant="h1">
          Place Order
        </Typography>

        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography>Shipping Address</Typography>
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
                  <Typography>Payment Method</Typography>
                </ListItem>
                <ListItem>
                  <Typography>{paymentMethod}</Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography>Order Items</Typography>
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
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink href={`/product/${item.slug}`} passHref>
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
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
                  <Button variant="contained" color="primary" fullWidth>
                    Place Order
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </NoSsr>
  );
};

export default PlaceOrderScreen;
