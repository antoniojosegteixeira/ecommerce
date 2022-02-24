import axios from "axios";

export const getProduct = (id) => {
  return axios.get(`/api/products/${id}`);
};
