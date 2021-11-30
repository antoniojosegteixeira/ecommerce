import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "../utils/AppContext";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  List,
  ListItem,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import NextLink from "next/link";
import data from "../utils/data";
import db from "../utils/db";
import useStyles from "../utils/styles";
import Product from "../models/Product";

export default function Store(props) {
  const { products } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const existItem = state.cart.cartItems.find((e) => e._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout>
      <Container className={classes.pageContainer}>
        <Typography
          component="h1"
          variant="h3"
          align="center"
          style={{ padding: "1.2rem 0 2rem 0" }}
        >
          Products
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => {
            console.log(product.name);

            return (
              <Grid item md={4} key={product.name}>
                <Card className={classes.boxShadow}>
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea style={{ padding: "2rem 2rem 0 2rem" }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      />
                      <CardContent style={{ paddingBottom: 0 }}>
                        <Typography variant="h5" align="center">
                          {product.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <List style={{ width: "100%" }} disablePadding>
                      <Typography variant="h5" align="center">
                        ${product.price}
                      </Typography>

                      <ListItem>
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          color="primary"
                          onClick={() => addToCartHandler(product)}
                          className={classes.smallButton}
                        >
                          Add to cart
                        </Button>
                      </ListItem>
                    </List>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  return {
    props: {
      products: await db.convertDocToJson(products),
    },
  };
}
