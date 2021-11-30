import React, { useContext } from "react";
import Layout from "../components/Layout";
import { AppContext } from "../utils/AppContext";
import NextLink from "next/link";
import Image from "next/image";
import {
  Container,
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
import axios from "axios";
import { useRouter } from "next/router";

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const { cartItems } = state.cart;
  const { userInfo } = state;

  const updateCartHandler = async (item, quantity) => {
    const data = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };

  const removeItemHandler = async (item) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    dispatch({ type: "CART_REMOVE_ITEM", payload: data });
  };

  const checkOutHandler = () => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    router.push("/shipping");
  };

  return (
    <Layout title="Shopping Cart">
      <Container>
        <Typography component="h1" variant="h3">
          Shopping Cart
        </Typography>
        {cartItems?.length === 0 ? (
          <div>
            Your cart is empty <br />
            <NextLink href="/" passHref>
              <Link>Go Shopping</Link>
            </NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
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
                        <TableCell align="right">
                          <Select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell align="right">${item.price}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeItemHandler(item)}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography component="h2">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items) : $
                      {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={checkOutHandler}
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

const NoSsrComponent = () => {
  return (
    <NoSsr>
      <CartScreen></CartScreen>
    </NoSsr>
  );
};

export default NoSsrComponent;
