import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { List, ListItem, Typography, TextField } from "@material-ui/core";

const ShippingScreen = () => {
  const router = useRouter();
  router.push("/login");
  return <Layout title="login"></Layout>;
};

export default ShippingScreen;
