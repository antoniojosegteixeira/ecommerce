import axios from "axios";

export const placeOrderRequest = (order, token) => {
  return axios.post("/api/orders", order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
