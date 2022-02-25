import axios from "axios";

export const placeOrder = (order, token) => {
  return axios.post("/api/orders", order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
