package com.example.mybackend.Services;

import com.example.mybackend.Models.Carousel;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Repositories.CarouselRepository;
import com.example.mybackend.Repositories.CategoryRepository;
import com.example.mybackend.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CarouselService {
    @Autowired
    CarouselRepository carouselRepository;
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    JWTUtils jwtUtils;

    public Map<String, Object> addItemToCarousel(long foodId, String link ,String token) {
        try {
            HashMap<String, Object> response = new HashMap<>();
            // ! JWT validation
            if(jwtUtils.isTokenExpired(token)) {
                response.put("response", 401);
                response.put("message", "Token expired");
                return response;
            }
            Optional<Food> foodOptional = foodRepository.findById(foodId);

            if (foodOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "Food not found");
                return response;
            }
            Food food = foodOptional.get();
            Carousel carousel = food.getCarousel();
            if (carousel == null) {
                carousel = new Carousel();
                carousel.setLinks(new ArrayList<>());
                food.setCarousel(carousel);
            }
            if (carousel.getLinks() == null) {
                carousel.setLinks(new ArrayList<>());
            }
            if (carousel.getLinks().contains(link)) {
                response.put("response", 400);
                response.put("message", "Link already exists");
                return response;
            }
            carousel.getLinks().add(link);
            carousel.setFood(food);
            carouselRepository.save(carousel);
            foodRepository.save(food);
            response.put("response", 200);
            response.put("message", "Item added to carousel successfully");
            return response;
        }catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }

    }

    // *  delete from carousel
    public Map<String, Object> deleteItemFromCarousel(long foodId, String link,String  token) {
        try {
            HashMap<String, Object> response = new HashMap<>();
            // ! JWT validation
            if (jwtUtils.isTokenExpired(token)) {
                response.put("response", 401);
                response.put("message", "Token expired");
                return response;
            }
            Optional<Food> foodOptional = foodRepository.findById(foodId);
            if (foodOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "Food not found");
                return response;
            }
            Food food = foodOptional.get();
            Carousel carousel = food.getCarousel();
            if (carousel == null) {
                response.put("response", 404);
                response.put("message", "Carousel not found");
                return response;
            }
            if (carousel.getLinks() == null) {
                response.put("response", 404);
                response.put("message", "Links not found");
                return response;
            }
            if (!carousel.getLinks().contains(link)) {
                response.put("response", 404);
                response.put("message", "Link not found");
                return response;
            }
            carousel.getLinks().remove(link);
            carouselRepository.save(carousel);
            foodRepository.save(food);
            response.put("response", 200);
            response.put("message", "Item deleted from carousel successfully");
            return response;
        }catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }

    }
}

