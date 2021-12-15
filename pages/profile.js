import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import axios from "axios";
import NextLink from "next/link";
import Cookies from "js-cookie";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import {
  Grid,
  TableHead,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TableBody,
  Link,
  Card,
  List,
  ListItem,
  CircularProgress,
  TextField,
  NoSsr,
  ListItemText,
  Button,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

export default function ProfileScreen() {
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state;
  const router = useRouter();
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    // Request to api
    // Get the full order through the id
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchOrder();
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.put("/api/profile", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      router.push("/");

      enqueueSnackbar("User updated successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(err.response?.data.message, { variant: "error" });
      console.log(err);
    }
  };

  return (
    <NoSsr>
      <Layout title={`Profile`}>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <List>
                <NextLink href="/profile" passHref>
                  <ListItem button component="a" selected>
                    <ListItemText primary="User Profile"></ListItemText>
                  </ListItem>
                </NextLink>
                <NextLink href="/order-history" passHref>
                  <ListItem button component="a">
                    <ListItemText primary="Order History"></ListItemText>
                  </ListItem>
                </NextLink>
              </List>
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.profileSection}>
              <List>
                <ListItem>
                  <Typography
                    align="center"
                    variant="h4"
                    style={{ width: "100%" }}
                  >
                    Profile
                  </Typography>
                </ListItem>
                <ListItem>
                  <form
                    className={classes.form}
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <List>
                      <ListItem>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              inputProps={{ type: "text" }}
                              error={Boolean(errors.name)}
                              helperText={
                                errors.name
                                  ? errors.name.type === "minLength"
                                    ? "Name should have at least 2 characters"
                                    : "Name is required"
                                  : ""
                              }
                              {...field}
                            />
                          )}
                          name="name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 2,
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="email"
                              label="Email"
                              inputProps={{ type: "email" }}
                              error={Boolean(errors.email)}
                              helperText={
                                errors.email
                                  ? errors.email.type === "pattern"
                                    ? "Email is not valid"
                                    : "Email is required"
                                  : ""
                              }
                              {...field}
                            />
                          )}
                          name="email"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="password"
                              label="Password"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.password)}
                              helperText={
                                errors.password
                                  ? errors.password.type === "minLength"
                                    ? "Password should have at least 6 characters"
                                    : "Password is required"
                                  : ""
                              }
                              {...field}
                            />
                          )}
                          name="password"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 6,
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <Controller
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="confirmPassword"
                              label="Confirm Password"
                              inputProps={{ type: "password" }}
                              error={Boolean(errors.confirmPassword)}
                              helperText={
                                errors.confirmPassword
                                  ? errors.confirmPassword.type === "minLength"
                                    ? "Password confirmation should have at least 6 characters"
                                    : "Password confirmation is required"
                                  : ""
                              }
                              {...field}
                            />
                          )}
                          name="confirmPassword"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 6,
                          }}
                        />
                      </ListItem>
                      <ListItem>
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          color="primary"
                        >
                          UPDATE
                        </Button>
                      </ListItem>
                    </List>
                  </form>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    </NoSsr>
  );
}
