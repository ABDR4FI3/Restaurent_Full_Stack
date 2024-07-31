package com.example.mybackend.Services;

import com.example.mybackend.DTO.FoodDTO;
import com.example.mybackend.Models.Category;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.CategoryRepository;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FoodService {
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    JWTUtils jwtUtils;

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
    public Map<String, Object> getPopularFoods() {
        HashMap<String, Object> response = new HashMap<>();
        int count = 0;
        if(foodRepository.findAll().isEmpty() ) {
            response.put("response", 404);
            return response;
        }
        List<Food> foods = foodRepository.findAll();
        List<Food> popularFoods = new ArrayList<>();
        for (Food food : foods) {
            if(count < 4) {
                popularFoods.add(food);
                count++;
            }
        }
        response.put("foods", popularFoods);
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
    // * Get Favorite Foods
    public Map<String, Object> getFavoriteFoods(long userId) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();
        List<Food> favoriteFoods = user.getFavoriteFoods();
        response.put("foods", favoriteFoods);
        response.put("message", "Favorite foods retrieved successfully");
        response.put("response", 200);
        return response;
    }
    // * get Food by Category
    public Map<String, Object> getFoodByCategory(String category) {
        Category myCategory = categoryRepository.findByName(category);
        HashMap<String, Object> response = new HashMap<>();
        if(foodRepository.findByCategory(myCategory).isEmpty()) {
            response.put("response", 404);
            response.put("message", "Category not found");
            return response;
        }
        response.put("foods", foodRepository.findByCategory(myCategory));
        response.put("message", "Foods Filtered by Category retrieved successfully");
        response.put("response", 200);
        return response;
    }
    // ! Filter Food By price < x
    public Map<String, Object> getFoodByPriceLessThan(int price) {
        HashMap<String, Object> response = new HashMap<>();
        if(foodRepository.findByPriceLessThan(price).isEmpty()) {
            response.put("response", 404);
            response.put("message", "No food found with price less than " + price);
            return response;
        }
        response.put("foods", foodRepository.findByPriceLessThan(price));
        response.put("message", "Foods Filtered by Price retrieved successfully");
        response.put("response", 200);
        return response;
    }
    // ! Get Food With CArousel Image
    public Map<String, Object> getFoodWithCarousels(long foodId) {
        HashMap<String, Object> response = new HashMap<>();

        // Retrieve the food by its ID
        Optional<Food> foodOptional = foodRepository.findById(foodId);

        if (foodOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "Food not found");
        } else {
            Food food = foodOptional.get();
            response.put("response", 200);
            response.put("food", food.getCarousel());
        }

        return response;
    }

    // !  CRUD  Admin
    // * Add Food to Menu
    public Map<String ,Object> addFoodtoMenu(FoodDTO foodDTO , String token) {
        try {
            HashMap<String, Object> response = new HashMap<>();
            if (jwtUtils.isTokenExpired(token)) {
                response.put("response", 400);
                response.put("message", "Token expired");
                return response;
            }
            Food newFood = Food.builder()
                    .name(foodDTO.getName())
                    .image(foodDTO.getImage())
                    .link(foodDTO.getLink())
                    .totalCalories(foodDTO.getTotalCalories())
                    .description(foodDTO.getDescription())
                    .rating(0)
                    .nutritionValue(foodDTO.getNutritionValue())
                    .price(foodDTO.getPrice())
                    .category(categoryRepository.findByName(foodDTO.getCategory()))
                    .build();
            foodRepository.save(newFood);
            response.put("response", 200);
            response.put("message", "Food added successfully");
            return response;
        }catch (Exception e) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("response", 400);
            response.put("message", e.getMessage());
            return response;
        }

    }
    // * Edit Food from menu Admin
    public Map<String ,Object> editFoodFromMenu(FoodDTO foodDTO , String token) {
        try {
            HashMap<String, Object> response = new HashMap<>();
            if (jwtUtils.isTokenExpired(token)) {
                response.put("response", 400);
                response.put("message", "Token expired");
                return response;
            }
            Optional<Food> oldFoodOptional = foodRepository.findById(foodDTO.getId());
            if(oldFoodOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "Food not found");
                return response;
            }
            Food oldFood = oldFoodOptional.get();
            Food edited =Food.builder()
                    .id(foodDTO.getId())
                    .name(foodDTO.getName())
                    .image(foodDTO.getImage())
                    .link(foodDTO.getLink())
                    .description(foodDTO.getDescription())
                    .rating(0)
                    .nutritionValue(foodDTO.getNutritionValue())
                    .price(foodDTO.getPrice())
                    .category(categoryRepository.findByName(foodDTO.getCategory()))
                            .build();
            foodRepository.save(edited);
            response.put("response", 200);
            response.put("message", "Food edited successfully");
            return response;
        }catch (Exception e) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("response", 400);
            response.put("message", e.getMessage());
            return response;
        }
    }


}
