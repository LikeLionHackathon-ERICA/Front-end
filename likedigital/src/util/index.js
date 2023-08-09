import axios from "axios";

const BASE_URL = "http://35.216.16.113:8080";

export const registerAuth = async (user) => {
  const response = await axios.post(`${BASE_URL}/auth/registration/`, user);
  return response.data;
};
