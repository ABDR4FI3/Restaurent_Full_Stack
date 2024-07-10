package com.example.mybackend;

import com.example.mybackend.DTO.UserDTO;
import com.example.mybackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyBackEndApplication implements CommandLineRunner {
    @Autowired
    UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(MyBackEndApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        UserDTO userDTO =  UserDTO.builder()
                .phone("11234567890")
                .address("1231 Main St")
                .email("CfX1H@example.com")
                .name("John Doe 1")
                .password("1password")
                .build();
        //System.out.println(userDTO);

        //System.out.println(userService.registration(userDTO));
    }
}
