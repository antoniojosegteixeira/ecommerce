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
  Button,
  Link,
} from "@material-ui/core";
import NextLink from "next/link";
import Image from "next/image";
import useStyles from "../utils/styles";
import bikehero from "../public/images/bikehero.jpg";
import ReactCarousel from "../components/ReactCarousel";
import GoogleMap from "../components/GoogleMap";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Layout dark>
      <Box
        className={classes.background}
        style={{
          backgroundImage: "url(/images/bikehero.jpg)",
          backgroundPosition: "0 70%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
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
          <ListItem align="center">
            <NextLink href="/store" passHref>
              <Button
                variant="contained"
                color="primary"
                className={classes.mainButton}
                as="a"
              >
                SHOP NOW
              </Button>
            </NextLink>
          </ListItem>
        </List>
      </Box>
      <Box className={classes.sectionFeatured}>
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
                <NextLink href="/product/altitude" passHref>
                  <Button className={classes.mainButton} as="a">
                    KNOW MORE
                  </Button>
                </NextLink>
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
      </Box>
      <Box className={classes.topProductsSection}>
        <Container>
          <List>
            <ListItem style={{ padding: 0 }}>
              <Typography
                className={classes.centeredTitle}
                component="h3"
                variant="h3"
                color="primary"
                align="center"
              >
                TOP PRODUCTS
              </Typography>
            </ListItem>
            <ListItem style={{ padding: 0 }}>
              <ReactCarousel />
            </ListItem>
          </List>
        </Container>
      </Box>
      <Box className={classes.ourServicesSection}>
        <Container>
          <Typography
            className={classes.centeredTitle}
            component="h3"
            variant="h3"
            color="primary"
            align="center"
          >
            OUR SERVICES
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid md={4} item>
              <Box className={classes.serviceCard}>
                <List>
                  <ListItem>
                    <Typography
                      color="secondary"
                      variant="h2"
                      component="h4"
                      align="center"
                      style={{ width: "100%" }}
                    >
                      <i className="fas fa-bicycle"></i>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      component="span"
                      variant="h4"
                      align="center"
                      style={{ width: "100%" }}
                      color="secondary"
                    >
                      BIKE SHOP
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      align="center"
                      variant="body1"
                      color="secondary"
                    >
                      We want you to have a bike that you'll enjoy riding for
                      years to come. Our sales and mechanical staff have a
                      reputation for quality, professionalism and expertise.
                      Come visit us today!
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid md={4} item>
              <Box className={classes.serviceCard}>
                <List>
                  <ListItem>
                    <Typography
                      color="secondary"
                      variant="h2"
                      component="h4"
                      align="center"
                      style={{ width: "100%" }}
                    >
                      <i className="fas fa-wrench"></i>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      component="span"
                      variant="h4"
                      align="center"
                      style={{ width: "100%" }}
                      color="secondary"
                    >
                      REPAIR & SERVICE
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      align="center"
                      variant="body1"
                      color="secondary"
                    >
                      We’re here to help you ride farther, ride happier and get
                      the most out of your bike. Our expert techs are here to
                      service your mountain, road, BMX or e-bike, plus give
                      friendly advice.
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid md={4} item>
              <Box className={classes.serviceCard}>
                <List>
                  <ListItem>
                    <Typography
                      color="secondary"
                      variant="h2"
                      component="h4"
                      align="center"
                      style={{ width: "100%" }}
                    >
                      <i className="fas fa-cogs"></i>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      component="span"
                      variant="h4"
                      align="center"
                      style={{ width: "100%" }}
                      color="secondary"
                    >
                      CUSTOM BUILD
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography
                      align="center"
                      variant="body1"
                      color="secondary"
                    >
                      Dreaming of a custom bike, built with your choice of frame
                      and components? We ensure that your new bike is perfectly
                      fitted and precision built by our specialist team.
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.locationSection}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} style={{ zIndex: 10 }}>
              <Box className={classes.locationBox}>
                <List>
                  <ListItem>
                    <Typography
                      component="h3"
                      variant="h3"
                      color="primary"
                      align="center"
                      style={{ width: "100%" }}
                    >
                      LOCATION
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.locationBoxList}>
                    <Typography
                      color="secondary"
                      variant="h5"
                      component="i"
                      align="center"
                    >
                      <i className="fas fa-map-marker-alt"></i>
                    </Typography>

                    <Typography color="secondary">
                      699-601 Santa Anita Ave, Burbank, CA 91501, USA
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <GoogleMap />
      </Box>
    </Layout>
  );
}
