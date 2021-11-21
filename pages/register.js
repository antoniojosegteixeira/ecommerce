import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import axios from "axios";
import Layout from "../components/Layout";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const RegisterScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: "error" });
      return;
    }
    try {
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      console.log(data);

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      router.push("/");

      enqueueSnackbar("Register Successful", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(err.response?.data.message, { variant: "error" });
      console.log(err);
    }
  };

  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography>Register</Typography>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
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
