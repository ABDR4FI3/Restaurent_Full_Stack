package com.example.mybackend.Services;

import com.example.mybackend.Models.Employee;
import com.example.mybackend.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    JWTUtils jwtUtils;

    public Map<String ,Object> getEmployees(String token){
        Map<String , Object> response = new HashMap<>() ;
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        List<Employee> employees = employeeRepository.findAll();
        if(employees.isEmpty()) {
            response.put("message" , "No employees found");
            response.put("response" , 404);
            return response;
        }
        response.put("employees" , employees);
        response.put("response" , 200);
        return response;
    }
    public Map<String ,Object> addEmployee(Employee employee , String token){
        Map<String , Object> response = new HashMap<>() ;
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        employeeRepository.save(employee);
        response.put("message" , "Employee added successfully");
        response.put("response" , 200);
        return response;
    }
    public Map<String ,Object> updateEmployee(Employee employee , String token){
        Map<String , Object> response = new HashMap<>() ;
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        employeeRepository.save(employee);
        response.put("message" , "Employee updated successfully");
        response.put("response" , 200);
        return response;
    }
}
