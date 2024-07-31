import axios from "axios";

const API_URL = "http://localhost:9090";

// Fetch all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/user/all`);
  console.log("response", response.data);
  return response.data;
};
