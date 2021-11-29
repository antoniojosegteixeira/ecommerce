import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useStyles from "../utils/styles";

// Map component
const GoogleMap = () => {
  const ref = useRef();
  const classes = useStyles();
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" className={classes.map} />;
};

// Get render status
const render = (status) => {
  switch (status) {
    case Status.LOADING:
      return <div>loading</div>;
    case Status.FAILURE:
      return <div>error</div>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

// Loader wrapper
export default function GoogleMapWrapper() {
  return (
    <Wrapper
      apiKey={"AIzaSyCWzun-hyEClvKAlA7sHPeFA8nerFhuVU4"}
      render={render}
    />
  );
}
