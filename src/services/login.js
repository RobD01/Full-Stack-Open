import axios from "axios";
import { loginUrl } from "./url";
const baseUrl = loginUrl;

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  console.log(1 + 1);
  return response.data;
};

export default login;
