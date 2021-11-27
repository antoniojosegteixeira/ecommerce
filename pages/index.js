import React, { useContext } from "react";
import { useRouter } from "next/dist/client/router";
import { AppContext } from "../utils/AppContext";
import Layout from "../components/Layout";
import axios from "axios";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);

  return (
    <Layout>
      <Typography component="h1" variant="h1" color="primary">
        YOUR ADVENTURE
      </Typography>
    </Layout>
  );
}
