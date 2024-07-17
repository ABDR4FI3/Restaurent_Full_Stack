package com.example.mybackend.Services;

import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.Orders;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.OrderRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    JWTUtils jwtUtils;
    @Autowired
    UserRepository userRepository;

    public Map<String,Object> MakeOrder(String token , long foodId , int qte){
        try {
            if(token == null || foodId == 0 || qte == 0){
                throw new RuntimeException("Invalid arguments");
            }
            Map<String, Object> response = new HashMap<>();
            // ! Check Args Validity
            // * Check if the quantity is greater than 0
            if (qte <= 0) {
                response.put("response", 400);
                response.put("message", "Quantity must be greater than 0");
                return response;
            }

            // * Find the user by token
            String userId = jwtUtils.extractUserId(token);
            boolean exit = false;
            Optional<User> userOptional = userRepository.findById(Long.valueOf(userId));
            Optional<Food> foodOptional = foodRepository.findById(Long.valueOf(foodId));
            // ! check if the user and food exist
            if (userOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "User not found");
                exit = true;
            }
            if (foodOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "Food not found");
                exit = true;
            }
            if (exit) {
                return response;
            }
            // * Create the order
            User user = userOptional.get();
            Food food = foodOptional.get();
            Orders order = Orders.builder()
                    .food(food)
                    .cart(user.getCart())
                    .qte(qte)
                    .user(user)
                    .status("pending")
                    .build();
            System.out.println(order);
            // * Save the order
            orderRepository.save(order);
            // * Return the response
            response.put("response", 200);
            response.put("message", "Order created successfully");
            return response;
        } catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }

    }

    public Map<String ,Object> getAllOrders(String token ){
        try {
            if(token == null ){
                throw new RuntimeException("Token Cannot be null");
            }
            Map<String, Object> response = new HashMap<>();
            // ! Check Args Validity
            // * Find the user by token
            String userId = jwtUtils.extractUserId(token);
            Optional<User> userOptional = userRepository.findById(Long.valueOf(userId));
            // ! check if the user and food exist
            if (userOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "User not found");
                return response;
            }
            User user = userOptional.get();
            // * Return the response
            response.put("response", 200);
            response.put("orders", orderRepository.findByUser(user));
            response.put("message", "Orders retrieved successfully");
            return response;
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    public Map<String ,Object> getAllOrdersByStatus(String token , String status ){
        try {
            Map<String, Object> response = new HashMap<>();
            // ! Check Args Validity
            // * Find the user by token
            long userId = Long.parseLong(jwtUtils.extractUserId(token));
            Optional<User> userOptional = userRepository.findById(userId);
            // ! check if the user and food exist
            if (userOptional.isEmpty()) {
                response.put("response", 404);
                response.put("message", "User not found");
                return response;
            }
            User user = userOptional.get();
            // * Return the response
            response.put("response", 200);
            response.put("orders", orderRepository.findByStatusAndUser(status,user));
            response.put("message", "Orders retrieved successfully");
            return response;
        }catch (Exception e){
            Map<String, Object> response = new HashMap<>();
            response.put("response", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }
}
