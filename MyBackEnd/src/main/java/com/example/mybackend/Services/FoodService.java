package com.example.mybackend.Services;

import com.example.mybackend.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class FoodService {
    @Autowired
    FoodRepository foodRepository;

    public Map<String, Object> getAllFoods() {
        HashMap<String, Object> response = new HashMap<>();
        if(foodRepository.findAll().isEmpty()) {
            response.put("response", 404);
            return response;
        }
        response.put("foods", foodRepository.findAll());
        response.put("response", 200);
        return response;
    }

    // * Get a Specific food
    public Map<String, Object> getOneFood(long id) {
        HashMap<String, Object> response = new HashMap<>();
        if(foodRepository.findById(id).get() == null) {
            response.put("response", 404);
            return response;
        }
        response.put("foods", foodRepository.findById(id).get());
        response.put("response", 200);
        return response;
    }
}
