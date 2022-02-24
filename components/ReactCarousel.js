import React from "react";
import useSWR from "swr";
import {
  NoSsr,
  Grid,
  Box,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../utils/styles";

export default function ReactCarousel() {
  const classes = useStyles();
  const { data } = useSWR("/api/products/top-products");

  return (
    <NoSsr>
      <Grid container spacing={3} justifyContent="center">
        {data &&
          data.map((item) => {
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
}
