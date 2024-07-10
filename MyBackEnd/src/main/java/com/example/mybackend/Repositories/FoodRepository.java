package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Category;
import com.example.mybackend.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    public List<Food> findByCategory(Category category);
    public List<Food> findByPriceLessThan(int price);
    public List<Food> findByNameLike(String name);

}
