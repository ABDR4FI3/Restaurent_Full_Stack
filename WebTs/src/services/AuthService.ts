import axios from "axios";

// Define the base URL for the API
const API_URL = "http://localhost:9090/user";

// Function to handle user login
export const loginService = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/Login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

// Function to handle user registration
export const registerService = async (userData: {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};
