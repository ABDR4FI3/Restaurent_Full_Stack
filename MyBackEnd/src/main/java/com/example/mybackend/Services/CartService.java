package com.example.mybackend.Services;

import com.example.mybackend.Models.Cart;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.CartRepository;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FoodRepository foodRepository;
    public Map<String, Object> addFoodToCart(long foodId, long userId) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();

        // * Find the food by ID
        Optional<Food> foodOptional = foodRepository.findById(foodId);
        if (foodOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "Food not found");
            return response;
        }
        Food food = foodOptional.get();

        // * Get or create the cart for the user
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }

        // * Add the food to the cart's items
        List<Food> items = cart.getItems();
        if(items == null) {
            items = new ArrayList<>();
        }
        if (items.contains(food)) {
            response.put("response", 400);
            response.put("message", "Food already in cart");
        } else {
            items.add(food);
            cart.setItems(items);
            cartRepository.save(cart);
            response.put("response", 200);
            response.put("message", "Food added to cart");
        }

        return response;
    }
}
