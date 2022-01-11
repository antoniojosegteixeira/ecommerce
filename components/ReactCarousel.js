import React, { useEffect, useContext } from "react";
import {
  NoSsr,
  Grid,
  Box,
  Container,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { AppContext } from "../utils/AppContext";
import axios from "axios";
import NextLink from "next/link";
import useStyles from "../utils/styles";

export default function ReactCarousel() {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const { topProducts } = state;

  useEffect(() => {
    const getTopProducts = async () => {
      const { data } = await axios.get(`/api/products/top-products`);
      if (data) {
        dispatch({ type: "ADD_TOP_PRODUCTS", payload: data });
      }
    };
    getTopProducts();
  }, []);

  if (topProducts.length > 0) {
    return (
      <NoSsr>
        <Grid container spacing={3} justifyContent="center">
          {topProducts.length > 0 &&
            topProducts.map((item) => {
              return (
                <Grid md={4} item key={item.name} style={{ maxWidth: "430px" }}>
                  <NextLink href={`/product/${item.slug}`}>
                    <Box className={classes.topProductCard}>
                      <List>
                        <ListItem>
                          <img src={item.image} style={{ width: "100%" }} />
                        </ListItem>
                        <ListItem>
                          <Typography
                            component="span"
                            variant="h5"
                            align="center"
                            style={{ width: "100%" }}
                          >
                            {item.name}
                          </Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </NextLink>
                </Grid>
              );
            })}
        </Grid>
      </NoSsr>
    );
  } else {
    return null;
  }
}
