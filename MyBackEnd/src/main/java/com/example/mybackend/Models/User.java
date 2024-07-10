package com.example.mybackend.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    private String address;
    private String phone;
    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonIgnoreProperties("users")// Assumes there's a column 'role_id' in the User table
    private UserRole userRole;

    @OneToOne(mappedBy = "user")
    private Cart cart;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_foods",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> favoriteFoods;


}
