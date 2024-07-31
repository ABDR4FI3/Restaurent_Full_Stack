package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository  extends JpaRepository<Employee, Long> {
}
