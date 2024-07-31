package com.example.mybackend.DTO;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodDTO {

    private long id;
    private String name;
    private String image;
    private String link;
    private int totalCalories;
    private String description;
    private float price;
    private String category;
    Map<String, Float> nutritionValue;

}
