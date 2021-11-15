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
  Button,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import data from "../utils/data";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home(props) {
  const { products } = props;
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

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
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product) => {
          console.log(product.name);

          return (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>R${product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
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
