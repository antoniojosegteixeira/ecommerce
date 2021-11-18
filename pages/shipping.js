import React, { useContext } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { AppContext } from "../utils/AppContext";
import { List, ListItem, Typography, TextField } from "@material-ui/core";

const ShippingScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  const { userInfo } = state;

  return <Layout title="Shipping"></Layout>;
};

export default ShippingScreen;
