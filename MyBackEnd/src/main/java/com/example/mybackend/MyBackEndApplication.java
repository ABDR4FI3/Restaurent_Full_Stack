package com.example.mybackend;

import com.example.mybackend.DTO.UserDTO;
import com.example.mybackend.Models.Orders;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.OrderRepository;
import com.example.mybackend.Repositories.UserRepository;
import com.example.mybackend.Services.UserService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyBackEndApplication implements CommandLineRunner {
    @Autowired
    UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FoodRepository foodRepository;
    @Autowired
    private OrderRepository orderRepository;

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

        System.out.println(userService.login("a43", "123"));
        Orders order = Orders.builder()
                .user(userRepository.findById(2L).get())
                .qte(7)
                .food(foodRepository.findById(1L).get())
                .build();

        //orderRepository.save(order);

    }
}
