import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
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

const ShippingScreen = () => {
  const router = useRouter();
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);

  // Context state
  const {
    userInfo,
    cart: { userAddress },
  } = state;

  // useForm
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  // Redirect
  // Default form values
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }

    setValue("fullName", userAddress.fullName);
    setValue("address", userAddress.address);
    setValue("city", userAddress.city);
    setValue("state", userAddress.state);
    setValue("postalCode", userAddress.postalCode);
  }, []);

  // Submit
  const submitHandler = async ({
    fullName,
    address,
    city,
    state,
    postalCode,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        state,
        postalCode,
      },
    });
    Cookies.set(
      "userAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        state,
        postalCode,
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping">
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <Typography>Shipping</Typography>
        <List>
          <ListItem>
            <Controller
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Enter a valid name"
                        : "Full name is required"
                      : ""
                  }
                  {...field}
                />
              )}
              name="fullName"
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
                  id="address"
                  label="Address"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address should have at least 5 characters"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                />
              )}
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 5,
              }}
            />
          </ListItem>
          <ListItem>
            <Controller
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === "minLength"
                        ? "Enter a valid city"
                        : "City is required"
                      : ""
                  }
                  {...field}
                />
              )}
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
            />
          </ListItem>
          <ListItem>
            <Controller
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="state"
                  label="State"
                  inputProps={{ type: "text" }}
                  error={Boolean(errors.state)}
                  helperText={
                    errors.state
                      ? errors.state.type === "minLength"
                        ? "State should have at least 4 characters"
                        : "State is required"
                      : ""
                  }
                  {...field}
                />
              )}
              name="state"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 4,
              }}
            />
          </ListItem>
          <ListItem>
            <Controller
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  inputProps={{ type: "number" }}
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === "pattern"
                        ? "Enter a valid postal code"
                        : "Postal code is required"
                      : ""
                  }
                  {...field}
                />
              )}
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[0-9]{8}$/,
              }}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default ShippingScreen;
