package com.example.mybackend.Controller;

import com.example.mybackend.Models.Employee;
import com.example.mybackend.Services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/all")
    public Map<String , Object> getAllEmployees(@RequestParam("token") String token) {
        return employeeService.getEmployees(token);
    }
    @PostMapping("/add")
    public Map<String , Object> addEmployee(@RequestBody Employee employee , @RequestParam("token") String token) {
        return employeeService.addEmployee(employee , token);
    }
    @PostMapping("/update")
    public Map<String , Object> updateEmployee(@RequestBody Employee employee , @RequestParam("token") String token) {
        return employeeService.updateEmployee(employee , token);
    }
}
