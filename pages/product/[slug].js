import React from "react";
import { useRouter } from "next/dist/client/router";
import useStyles from "../../utils/styles";
import data from "../../utils/data";
import db from "../../utils/db";
import Product from "../../models/Product";
import Layout from "../../components/Layout";
import NextLink from "next/link";
import {
  Link,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from "@material-ui/core";
import Image from "next/image";

const ProductScreen = (props) => {
  const classes = useStyles();
  const { product } = props;

  return (
    <div>
      <Layout title={product.name} description={product.description}>
        <div className={classes.section} name="me">
          <NextLink href="/" passHref>
            <Link>Back to products</Link>
          </NextLink>
        </div>
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
                <Typography component="h1">{product.name}</Typography>
              </ListItem>
              <ListItem>Category: {product.category}</ListItem>
              <ListItem>Brand: {product.brand}</ListItem>
              <ListItem>
                Rating: {product.rating} stars ({product.numReviews}) reviews
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} sx={12}>
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
                  <Button fullWidth variant="contained" color="primary">
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
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
