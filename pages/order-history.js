import React, { useEffect, useContext, useReducer } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import axios from "axios";
import NextLink from "next/link";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
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
  ListItemText,
  Button,
} from "@material-ui/core";
import useStyles from "../utils/styles";

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", orders: action.payload };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

const OrderHistory = () => {
  const { state } = useContext(AppContext);
  const { userInfo } = state;
  const router = useRouter();
  const classes = useStyles();

  // Component's own reducer
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    orders: {},
    loading: true,
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    // Request to api
    // Get the full order through the id
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchOrder();
  }, []);

  return (
    <NoSsr>
      <Layout title={`Order History`}>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href="/profile" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/order-history" passHref selected>
                  <ListItem button component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography>Order History</Typography>
                </ListItem>
                <ListItem>
                  {loading ? (
                    <CircularProgress />
                  ) : error ? (
                    <Typography className={classes.error}>{error}</Typography>
                  ) : (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell>ACTION</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders.map((order) => {
                            return (
                              <TableRow key={order._id}>
                                <TableCell>
                                  {order._id.substring(20, 24)}
                                </TableCell>
                                <TableCell>{order.createdAt}</TableCell>
                                <TableCell>${order.totalPrice}</TableCell>
                                <TableCell>
                                  {order.isPaid
                                    ? `Paid at ${order.paidAt}`
                                    : "Not Paid"}
                                </TableCell>
                                <TableCell>
                                  {order.isDelivered
                                    ? `Delivered at ${order.deliveredAt}`
                                    : "Not delivered"}
                                </TableCell>
                                <TableCell>
                                  <NextLink
                                    href={`/order/${order._id}`}
                                    passHref
                                  >
                                    <Button variant="contained">Details</Button>
                                  </NextLink>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </NoSsr>
  );
};

export default OrderHistory;