package com.example.mybackend.Services;

import com.example.mybackend.Models.Cart;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.Orders;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.CartRepository;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.OrderRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.junit.jupiter.api.Order;
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
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    JWTUtils jwtUtils;

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
        List<Orders> items = cart.getOrders();
        if(items == null) {
            response.put("response", 400);
            response.put("message", "Cart is empty");
            return response;
        }

        response.put("response", 200);
        response.put("message", "Food added to cart");

        return response;
    }
    public Map<String, Object> removeFoodFromCart(String token , long orderId) {
        try {
            Map<String, Object> response = new HashMap<>();
            // * Find the user by ID Extracted From token
            long userId = Long.parseLong(jwtUtils.extractUserId(token));
            Optional<User> userOptional = userRepository.findById(userId);
            Optional<Orders> ordersOptional = orderRepository.findById(orderId);
            // ! boolean to decide if the user and Order exists
            boolean exit = false;
            if (userOptional.isEmpty()) {
                response.put("response", 404);
                response.put("UserError", "User not found");
                exit = true;
            }
            if (ordersOptional.isEmpty()) {
                response.put("response", 404);
                response.put("OrderError", "Order not found");
                exit = true;
            }

            if (exit) {
                return response;
            }
            User user = userOptional.get();
            Orders order = ordersOptional.get();
            // * Get or create the cart for the user
            // * Delete Order from cart
            orderRepository.delete(order);
            response.put("response", 200);
            response.put("message", "Order removed from cart");
            return response;
        }catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }
    public Map<String, Object> clearCart(long userId) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();

        // * Get or create the cart for the user
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }

        // * Add the food to the cart's items
        List<Orders> items = cart.getOrders();
        if(items == null) {
            items = new ArrayList<>();
        }
        if (!items.isEmpty()) {
            /*items.clear();
            cart.setItems(items);
            cartRepository.save(cart);
            response.put("response", 200);*/
            response.put("message", "Cart cleared");
        } else {
            response.put("response", 400);
            response.put("message", "Cart already empty");
        }
        return response;
    }
    public Map<String,Object> getAllCartItems(long userId) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();
        // * Get or create the cart for the user
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }
        List<Orders> items = cart.getOrders();
        if(items == null) {
            items = new ArrayList<>();
        }
        if (items.isEmpty()) {
            response.put("response", 400);
            response.put("message", "Cart is empty");
            return response;
        }
        response.put("response", 200);
        response.put("message", "Cart items retrieved successfully");
        response.put("orders", items);
        return response;
    }
    public Map<String,Object> getAllCartItems(String token) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        long userId = Long.parseLong(jwtUtils.extractUserId(token));
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();
        // * Get or create the cart for the user
        Cart cart = user.getCart();
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }
        List<Orders> items = cart.getOrders();
        if(items == null) {
            items = new ArrayList<>();
        }
        if (items.isEmpty()) {
            response.put("response", 400);
            response.put("message", "Cart is empty");
            return response;
        }
        response.put("response", 200);
        response.put("message", "Cart items retrieved successfully");
        response.put("orders", items);
        return response;
    }
    // ! not used
    public Map<String,Object> getAllCartItemsByCategory(String token, String category) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        long userId = Long.parseLong(jwtUtils.extractUserId(token));
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();
        // * Get or create the cart for the user
        List<Orders> items = orderRepository.findByStatusAndUser(category, user);

        if (items.isEmpty() || items == null) {
            response.put("response", 201);
            response.put("message", "Cart is empty");
            return response;
        }
        response.put("response", 200);
        response.put("message", "Cart items retrieved successfully");
        response.put("orders", items);
        return response;

    }
    public Map<String,Object> payAllItemsInCart(String token) {
        Map<String, Object> response = new HashMap<>();
        // * Find the user by ID
        long userId = Long.parseLong(jwtUtils.extractUserId(token));
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        User user = userOptional.get();
        // * Get or create the cart for the user
        Cart cart = user.getCart();

        List<Orders> items = cart.getOrders();
        if (items.isEmpty() || cart == null) {
            response.put("response", 400);
            response.put("message", "Cart is empty");
            return response;
        }
        for (Orders item : items) {
            item.setStatus("paid");
            orderRepository.save(item);
        }
        response.put("response", 200);
        response.put("message", "Cart items retrieved successfully");
        response.put("orders", items);
        return response;
    }


}
