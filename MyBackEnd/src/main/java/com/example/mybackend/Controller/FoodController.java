package com.example.mybackend.Controller;

import com.example.mybackend.Services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/food")
@RestController
public class FoodController {
    @Autowired
    FoodService foodService;

    @GetMapping("/all")
    public Map<String, Object> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{food_id}")
    public Map<String, Object> getOneFood(@PathVariable("food_id") long id) {
        return foodService.getOneFood(id);
    }
}
