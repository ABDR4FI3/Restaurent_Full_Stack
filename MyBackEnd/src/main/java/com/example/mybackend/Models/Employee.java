package com.example.mybackend.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double salary;
    private String address;
    private String phone;
    private String email;
    private String gender;
    private String image ;
    private String shift;
    private LocalDate HiringDate;
    private Boolean isActive;

    @ManyToOne
    private position position; // Link to Position entity

    @ManyToOne
    private Department department; // Link to Department entity

}