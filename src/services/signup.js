import axios from "axios";
import { userUrl } from "./url";
const baseUrl = userUrl;

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default signup;
