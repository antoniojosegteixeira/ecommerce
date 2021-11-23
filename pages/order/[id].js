import React, { useEffect, useContext, useState, useReducer } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../utils/AppContext";
import axios from "axios";
import Layout from "../../components/Layout";
import CheckoutWizard from "../../components/CheckoutWizard";
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
  Card,
  List,
  ListItem,
  CircularProgress,
  NoSsr,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../../utils/styles";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const OrderScreen = ({ params }) => {
  const router = useRouter();
  const classes = useStyles();
  const { state } = useContext(AppContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Query
  const orderId = params.id;

  // Context state
  const { userInfo } = state;

  // Component's own reducer
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    order: {},
    loading: true,
    error: "",
  });

  const {
    userAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = order;

  // Paypal reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Checking payment on store
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    // Request to api
    // Get the full order through the id
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    // Checking if already has the order loaded
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    } else {
      // Paypal script
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });

        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "BRL",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order]);

  // Create order
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  // On Approve
  // Change backend status to paid
  function onApprove(data, actions) {
    return actions.order.capture().then(async (details) => {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        enqueueSnackbar("Order is paid", { variant: "success" });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    });
  }

  // On Error
  function onError(err) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  return (
    <NoSsr>
      <Layout title={`Order ${orderId}`}>
        <Typography component="h1" variant="h1">
          Order {orderId}
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography className={classes.error}>{error}</Typography>
        ) : (
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
                          {orderItems.map((item) => (
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
                                      width={50}
                                      height={50}
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
                                    <Typography>{item.name}</Typography>
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
                  {isPaid && (
                    <ListItem>
                      {isPending ? (
                        <CircularProgress />
                      ) : (
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      )}
                    </ListItem>
                  )}
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Layout>
    </NoSsr>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default OrderScreen;
