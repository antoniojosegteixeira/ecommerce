import React from "react";
import useStyles from "../../utils/styles";
import db from "../../utils/db";
import axios from "axios";
import Product from "../../models/Product";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import Image from "next/image";

const ProductScreen = (props) => {
  const router = useRouter();
  const classes = useStyles();
  const { product } = props;
  const { state, dispatch } = useContext(AppContext);

  const addToCartHandler = async () => {
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
    <div>
      <Layout title={product.name} description={product.description}>
        <Container className={classes.pageContainer}>
          <Box name="me" className={classes.backTo}>
            <NextLink href="/store" passHref>
              <Link>Back to products</Link>
            </NextLink>
          </Box>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Image
                src={product.image}
                alt={product.name}
                width={720}
                height={400}
                layout="responsive"
              ></Image>
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h3">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category: {product.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Brand: {product.brand}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    Rating: {product.rating} stars ({product.numReviews})
                    reviews
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>R${product.price}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock ? "In Stock" : "Out of stock"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </div>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: await db.convertDocToJson(product),
    },
  };
}
