import { NoSsr, Grid, Box, Container, List, ListItem } from "@material-ui/core";
import useStyles from "../utils/styles";
import topProducts from "../pages/api/mocks/topProducts";
import { Typography } from "@mui/material";

export default function ReactCarousel() {
  const classes = useStyles();

  return (
    <NoSsr>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          {topProducts.map((item) => {
            return (
              <Grid md={4} item key={item.title} style={{ maxWidth: "430px" }}>
                <Box className={classes.topProductCard}>
                  <List>
                    <ListItem>
                      <img src={item.image} style={{ width: "100%" }} />
                    </ListItem>
                    <ListItem>
                      <Typography component="span">{item.title}</Typography>
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </NoSsr>
  );
}
