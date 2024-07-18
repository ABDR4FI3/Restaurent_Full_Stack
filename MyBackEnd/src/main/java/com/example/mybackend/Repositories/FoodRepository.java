package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Category;
import com.example.mybackend.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    public List<Food> findByCategory(Category category);
    public List<Food> findByPriceLessThan(int price);
    public List<Food> findByNameLike(String name);
    public List<Food> getTopByIdIs(int qte);
    @Query("SELECT DISTINCT f FROM Food f LEFT JOIN FETCH f.carousels")
    List<Food> findAllFoodsWithCarousels();

}
