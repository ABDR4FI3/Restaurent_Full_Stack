import axios from "axios";

const API_URL = "http://localhost:9090";

// Fetch all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/user/all`);
  console.log("response", response.data);
  return response.data;
};

// Submit user data
export const submitUser = async (user: any) => {
  const response = await axios.post(`${API_URL}`, user);
  return response.data;
};

// Fetch user roles
export const getRoles = async () => {
  const response = await axios.get(`${API_URL}/roles`);
  return response.data;
};
