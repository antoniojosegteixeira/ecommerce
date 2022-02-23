import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";

import NextLink from "next/link";
import Cookies from "js-cookie";

// React hook form and yup validator
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validation/registerValidation";

// Register function
import registerRequest from "../http/registerRequest";

// Notification library
import { useSnackbar } from "notistack";

// Style
import useStyles from "../utils/styles";

// Components
import Layout from "../components/Layout";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";

const RegisterScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  /// Submit form data to backend
  const submitHandler = async ({ name, email, password }) => {
    registerRequest({ name, email, password })
      .then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("userInfo", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message ? err.message : "Error", {
          variant: "error",
        });
      });
  };

  return (
    <Layout title="Register">
      <form
        className={classes.form}
        onSubmit={handleSubmit(submitHandler)}
        style={{ paddingTop: "2rem" }}
      >
        <Typography component="h2" variant="h2" align="center">
          Register
        </Typography>
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
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
              name="name"
              control={control}
              defaultValue=""
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
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
              name="email"
              control={control}
              defaultValue=""
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
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
              name="password"
              control={control}
              defaultValue=""
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
                  helperText={errors.confirmPassword?.message}
                  {...field}
                />
              )}
              name="confirmPassword"
              control={control}
              defaultValue=""
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              SUBMIT
            </Button>
          </ListItem>
          <ListItem>
            Already have an account?{` `}
            <NextLink passHref href="/login">
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
