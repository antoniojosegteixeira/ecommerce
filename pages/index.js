import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "../utils/AppContext";
import Layout from "../components/Layout";
import axios from "axios";
import { Typography, List, ListItem } from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import bikehero from "../public/images/bikehero.jpg";
import { Button } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Layout>
      <div
        className={classes.background}
        style={{
          backgroundImage: "url(/images/bikehero.jpg)",
          backgroundPosition: "0 70%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 1vw",
        }}
      >
        <List className={classes.heroTitleList}>
          <ListItem>
            <Typography
              component="h1"
              variant="h1"
              align="right"
              className={classes.heroHeading}
            >
              YOUR ADVENTURE <br /> STARTS NOW
            </Typography>
          </ListItem>

          <ListItem>
            <Button className={classes.mainButton}>SHOP NOW</Button>
          </ListItem>
        </List>
      </div>
    </Layout>
  );
}
