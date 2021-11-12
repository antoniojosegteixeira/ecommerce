import React from "react";
import { useRouter } from "next/dist/client/router";
import useStyles from "../../utils/styles";
import data from "../../utils/data";

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

const ProductScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((e) => e.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

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