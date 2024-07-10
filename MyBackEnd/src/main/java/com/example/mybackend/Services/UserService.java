package com.example.mybackend.Services;



import com.example.mybackend.DTO.UserDTO;
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
        // Check if the username, email, and phone are unique
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
    public Map<String, Object> login(String email, String password) {
        HashMap<String, Object> response = new HashMap<>();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            response.put("response", 404);
            return response;
        }
        if (!user.getPassword().equals(password)) {
            response.put("response", 401);
            return response;
        }
        jwtUtils.generateToken(user);
        response.put("response", 200);
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
}
