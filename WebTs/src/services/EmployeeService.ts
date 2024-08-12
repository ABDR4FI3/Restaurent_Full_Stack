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
    console.error("Error fetching employees data:", error);
    throw error;
  }
};

export const AddEmployeesService = async (employee:Employee): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<{ message : string }>(
      `${API_URL}/employee/add?token=${token}` , employee
    );
    console.log("response", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error Adding employee :", error);
    throw error;
  }
};
export const EditEmployeesService = async (employee:Employee): Promise<string> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post<{ message : string }>(
      `${API_URL}/employee/update?token=${token}` , employee
    );
    console.log("response", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error Updating employee :", error);
    throw error;
  }
};
