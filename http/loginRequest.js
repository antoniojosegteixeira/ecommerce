import axios from "axios";

const loginRequest = async (userData) => {
  return axios.post("/api/login", userData);
};

export default loginRequest;
