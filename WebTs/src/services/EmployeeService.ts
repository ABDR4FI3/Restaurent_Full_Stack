import axios from "axios";
import { Employee } from "../types/Employee";

const API_URL = "http://localhost:9090";

export const GetEmployeesService = async (): Promise<Employee[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<{ employees: Employee[] }>(
      `${API_URL}/employee/all?token=${token}`
    );
    console.log("response", response.data.employees);
    return response.data.employees;
  } catch (error) {
    console.error("Error fetching inventory data:", error);
    throw error;
  }
};
