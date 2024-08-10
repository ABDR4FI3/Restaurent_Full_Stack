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
  const Departmentcount = [...new Set(Employees.map((item) => item.department))]
    .length;
  //* get Postion count
  const Postioncount = [...new Set(Employees.map((item) => item.position))]
    .length;
  // * get Highest salary
  const Highestsalary = Math.max(...Employees.map((item) => item.salary));
  //* get Departments
  const departments = Array.from(
    new Set(
      Employees.map((employee) => employee.department.name) // Get department names
    )
  ).map((name) => {
    // Find the first occurrence of the department with this name
    return Employees.find((employee) => employee.department.name === name)
      ?.department;
  });

  //* get Positions
  const positions = Array.from(
    new Set(
      Employees.map((employee) => employee.position.name) // Get position names
    )
  ).map((name) => {
    // Find the first occurrence of the department with this name
    return Employees.find((employee) => employee.position.name === name)
      ?.position;
  });
  //* create Shift Array
  const shifts = ["Morning", "Evening", "Night"];
  return {
    Employees,
    loading,
    error,
    shifts,
    departments,
    positions,
    stats: {
      Employeescount,
      Departmentcount,
      Postioncount,
      Highestsalary,
    },
  };
};
