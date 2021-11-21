import React from "react";
import { StepLabel, Stepper, Step } from "@material-ui/core";

const CheckoutWizard = ({ activeStep }) => {
  const stepArray = [
    "Login",
    "Shipping Address",
    "Payment Method",
    "Place Order",
  ];
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {stepArray.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutWizard;
