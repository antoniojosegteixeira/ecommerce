import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import NextLink from "next/link";
import Cookies from "js-cookie";

// React hook form and yup validator
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../validation/loginValidation";

// Login function
import loginRequest from "../http/loginRequest";

// Notification library
import { useSnackbar } from "notistack";

// Style
import useStyles from "../utils/styles";

//Components
import Layout from "../components/Layout";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";

const LoginScreen = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { enqueueSnackbar } = useSnackbar();

  const submitHandler = async (userData) => {
    loginRequest(userData)
      .then((res) => {
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("userInfo", JSON.stringify(res));
      })
      .catch((err) => {
        enqueueSnackbar(err.response?.data ? err.response.data : "Error", {
          variant: "error",
        });
      });
  };

  return (
    <Layout title="Login">
      <form
        className={classes.form}
        onSubmit={handleSubmit(submitHandler)}
        style={{ paddingTop: "2rem" }}
      >
        <Typography component="h2" variant="h2" align="center">
          Login
        </Typography>
        <List>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account?{` `}
            <NextLink passHref href="/register">
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default LoginScreen;
