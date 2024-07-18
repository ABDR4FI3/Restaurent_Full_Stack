package com.example.mybackend.Controller;

import com.example.mybackend.DTO.LoginDTO;
import com.example.mybackend.DTO.TokenDTO;
import com.example.mybackend.DTO.UserDTO;
import com.example.mybackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    // * User Registration
    @PostMapping("/register")
    public Map<String, Object> registration(@RequestBody UserDTO userDTO)
    {
        if(userDTO.getAddress().isEmpty() || userDTO.getEmail().isEmpty() || userDTO.getName().isEmpty() || userDTO.getPassword().isEmpty() || userDTO.getPhone().isEmpty()){
            return Map.of("response", 400, "message", "Missing user data");
        }
        return userService.registration(userDTO);
    }
    // * User Login (returns JWT token)
    @PostMapping("/Login")
    public Map<String, Object> Login(@RequestBody LoginDTO loginDTO ) {
        return userService.login(loginDTO.getEmail(), loginDTO.getPassword());
    }
    // * Get User Details
    @GetMapping("/{user_id}")
    public Map<String,Object> getUserDetails(@PathVariable("user_id") long userId){
        return userService.getUserDetails(userId);
    }
    @PostMapping("/details")
    public Map<String,Object> getUserDetailsWithToken(@RequestBody TokenDTO token){
        return userService.getUserDetailsWithToken(token.getToken());
    }

}
