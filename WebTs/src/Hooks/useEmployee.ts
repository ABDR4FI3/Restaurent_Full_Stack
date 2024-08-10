import { useState, useEffect } from "react";

import { Employee } from "../types/Employee";
import { GetEmployeesService } from "../services/EmployeeService";

export const useEmployee = () => {
  const [Employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getEmployees = async () => {
    setLoading(true);
    try {
      const employeesData = await GetEmployeesService();

      setEmployees(employeesData);
    } catch (error) {
      console.error("Error fetching Employees data:", error);
      setError("Failed to fetch Employees data");
    } finally {
      setLoading(false);
      setError(null);
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);
  // * get Employees count 
  const Employeescount = Employees.length;
  // * get Department count
  const Departmentcount = [...new Set(Employees.map((item) => item.department))].length;
  //* get Postion count
  const Postioncount = [...new Set(Employees.map((item) => item.position))].length;
  // * get Highest salary
  const Highestsalary = Math.max(...Employees.map((item) => item.salary));
  return {
    Employees,
    loading,
    error,
    stats: {
      Employeescount,
      Departmentcount,
      Postioncount,
      Highestsalary,
    },
  };
};
