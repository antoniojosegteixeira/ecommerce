import React, { useState, useEffect, useContext } from "react";
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

const RegisterScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      dispatch({ type: "USER_REGISTER", payload: data });
      Cookies.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");

      alert("Register Successful");
    } catch (err) {
      alert(err.response?.data.message);
    }
  };

  return (
    <Layout title="Register">
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography>Register</Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              label="Name"
              inputProps={{ type: "Name" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              label="Confirm password"
              inputProps={{ type: "password" }}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            ALready have an account?{` `}
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
