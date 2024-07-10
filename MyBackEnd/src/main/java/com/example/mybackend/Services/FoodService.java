package com.example.mybackend.Services;

import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FoodService {
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    UserRepository userRepository;

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

    // *  Add Food to Favourites

    public Map<String, Object> addFoodToFavourites(long foodId, long userId) {
        HashMap<String, Object> response = new HashMap<>();

        // todo check token validity
        // * Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();

        // Find the food by ID
        Optional<Food> foodOptional = foodRepository.findById(foodId);
        if (foodOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "Food not found");
            return response;
        }
        Food food = foodOptional.get();

        // Add the food to the user's favorite foods
        List<Food> favoriteFoods = user.getFavoriteFoods();
        if (!favoriteFoods.contains(food)) {
            favoriteFoods.add(food);
            user.setFavoriteFoods(favoriteFoods);
            userRepository.save(user);
            response.put("response", 200);
            response.put("message", "Food added to favorites");
        } else {
            response.put("response", 400);
            response.put("message", "Food already in favorites");
        }

        return response;
    }


}
