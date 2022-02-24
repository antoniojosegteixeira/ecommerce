import React from "react";
import { useRouter } from "next/dist/client/router";
import useStyles from "../utils/styles";
import useSWR from "swr";
import { useCart } from "../context/cart/useCart";

import Layout from "../components/Layout";
import NextLink from "next/link";
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

export default function Store() {
  const router = useRouter();
  const classes = useStyles();
  const { data } = useSWR("/api/products");
  const { addProduct } = useCart();

  const addToCartHandler = async (product) => {
    addProduct(product);
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
          {data &&
            data.map((product) => {
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
