package com.example.mybackend.Services;



import com.example.mybackend.DTO.UserDTO;
import com.example.mybackend.Models.Cart;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.Orders;
import com.example.mybackend.Models.User;
import com.example.mybackend.Repositories.UserRepository;
import com.example.mybackend.Repositories.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private JWTUtils jwtUtils;

    /*
        * 404 User not found
        * 401 Password incorrect
     */

    // Initialize SLF4J logger for the UserService class
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    // * User Registration
    public Map<String, Object> registration(UserDTO user) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("my user is " + user);
        //! Check validity of user data
        if(user.getAddress() == null || user.getEmail() == null || user.getName() == null || user.getPassword() == null || user.getPhone() == null) {
            response.put("response", 400);
            response.put("message", "Missing user data");
            return response;
        }
        // * Check if the username, email, and phone are unique
        boolean isUsernameUnique = (userRepository.findByName(user.getName()) == null);
        boolean isEmailUnique = (userRepository.findByEmail(user.getEmail()) == null);
        boolean isPhoneUnique = (userRepository.findByPhone(user.getPhone()) == null);

        if (!isUsernameUnique || !isEmailUnique || !isPhoneUnique) {
            response.put("isUsernameUnique", isUsernameUnique);
            response.put("isEmailUnique", isEmailUnique);
            response.put("isPhoneUnique", isPhoneUnique);
            response.put("response", 503);
            return response;
        }

        // Build a new User object
        User newUser = User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword())
                .phone(user.getPhone())
                .address(user.getAddress())
                .gender("male")
                .userRole(userRoleRepository.findById(1L).get())
                .build();

        // Save the new user
        userRepository.save(newUser);
        logger.info("User created: {}", newUser);

        // Generate token and prepare response
        String generatedToken = jwtUtils.generateToken(newUser);
        response.put("response", 200);
        response.put("token", generatedToken);
        return response;
    }
    //* User Login
    public Map<String, Object> login(String username, String password) {
        HashMap<String, Object> response = new HashMap<>();
        User user = userRepository.findByName(username);
        if (user == null) {
            response.put("response", 404);
            response.put("message", "User not found with this username");
            return response;
        }
        if (!user.getPassword().equals(password)) {
            response.put("response", 401);
            response.put("message", "Password incorrect");
            return response;
        }
        jwtUtils.generateToken(user);
        response.put("response", 200);
        response.put("username", user.getName());
        response.put("usermail", user.getEmail());
        response.put("token", jwtUtils.generateToken(user));
        return response;
    }

    // * get User Details
    public Map<String,Object> getUserDetails(long userId) {
        // todo replace user id with token
        HashMap<String,Object> response = new HashMap<>();
        if(userRepository.findById(userId).isEmpty()) {
            response.put("response", 404);
            response.put("message", "User not found");
            return response;
        }
        response.put("response", 200);
        response.put("user", userRepository.findById(userId).get());
        return response;
    }
    // * get User Details with token
    public Map<String,Object> getUserDetailsWithToken(String token) {
        try {
            int count  = 0;
            float sum = 0;
            HashMap<String,Object> response = new HashMap<>();
            Long userId = Long.valueOf(jwtUtils.extractUserId(token));
            if(userRepository.findById(userId).isEmpty()){
                response.put("response", 404);
                response.put("message", "User not found");
                return response;
            }
            if(jwtUtils.isTokenExpired(token)) {
                System.out.println("token validity is " + jwtUtils.isTokenExpired(token));
                response.put("response", 401);
                response.put("message", "Token expired");
                return response;
            }
            User user = userRepository.findById(userId).get();
            Cart cart = user.getCart();
            if(cart == null) {
                response.put("response", 404);
                response.put("message", "cart is empty");
                return response;
            }
            // * Get additional info
            for (Orders order : cart.getOrders()) {
                if (order.getStatus().equals("paid")){
                    count++;
                    sum += order.getFood().getPrice() * order.getQte();
                }
            }
            response.put("response", 200);
            response.put("user", user);
            response.put("count", count);
            response.put("totale", sum);
            return response;
        }catch (Exception e){
            HashMap<String,Object> response = new HashMap<>();
            response.put("response", 401);
            response.put("message", "Invalid token");
            response.put("exception", e.getMessage());
            response.put("exception cause", e.getCause());
            return response;
        }

    }
}
