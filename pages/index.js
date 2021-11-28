import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "../utils/AppContext";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  Grid,
  Container,
  Box,
} from "@material-ui/core";
import Image from "next/image";
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
          <ListItem textAlign="center">
            <Button className={classes.mainButton}>SHOP NOW</Button>
          </ListItem>
        </List>
      </div>
      <div className={classes.sectionFeatured}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <List>
              <ListItem>
                <Image
                  src="/images/rockymountain.png"
                  alt="Rocky Mountain"
                  width="500px"
                  height="60px"
                ></Image>
              </ListItem>
              <ListItem>
                <Typography
                  component="h3"
                  variant="h3"
                  color="secondary"
                  style={{ lineHeight: 0.9 }}
                >
                  BEST GEAR, BEST RIDE
                </Typography>
              </ListItem>
              <ListItem>
                <Typography color="secondary" variant="body1">
                  With a pedigree of success on the most aggressive Enduro World
                  Series tracks, the all-carbon Slayer’s descending aptitude and
                  uncanny ability to hold speed in rugged terrain are matched
                  with surprising pedalling efficiency.
                </Typography>
              </ListItem>
              <ListItem>
                <Button className={classes.mainButton}>KNOW MORE</Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={6} style={{ padding: "1rem" }}>
            <Image
              src="/images/section-bike.png"
              width={800}
              height={450}
            ></Image>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
