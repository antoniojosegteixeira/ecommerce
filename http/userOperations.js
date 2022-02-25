import axios from "axios";

export const registerRequest = async (userData) => {
  return axios.post("/api/register", userData);
};

export const loginRequest = async (userData) => {
  return axios.post("/api/login", userData);
};
