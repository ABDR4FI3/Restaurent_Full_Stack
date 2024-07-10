package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}
