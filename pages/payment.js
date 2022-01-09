import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import useStyles from "../utils/styles";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import {
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  FormControl,
  Button,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

const PaymentScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const {
    cart: { userAddress },
  } = state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(Cookies.get("paymentMethod" || ""));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar("Select the payment method", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };

  return (
    <Layout title="Payment">
      <CheckoutWizard activeStep={2} />
      <form className={classes.form} onSubmit={submitHandler}>
        <Typography component="h1" variant="h3" align="center">
          Payment Method
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                color="secondary"
              >
                <FormControlLabel
                  label="Paypal"
                  value="Paypal"
                  control={<Radio color="primary" />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Continue
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              onClick={() => router.push("/shipping")}
            >
              Go Back
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default PaymentScreen;
