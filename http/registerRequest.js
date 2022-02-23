import axios from "axios";

const registerRequest = async (userData) => {
  return axios.post("/api/register", userData);
};

export default registerRequest;
