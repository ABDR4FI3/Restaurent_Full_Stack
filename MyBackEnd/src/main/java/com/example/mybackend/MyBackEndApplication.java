package com.example.mybackend;

import com.example.mybackend.DTO.UserDTO;
import com.example.mybackend.Models.Carousel;
import com.example.mybackend.Models.Comment;
import com.example.mybackend.Models.Food;
import com.example.mybackend.Models.Orders;
import com.example.mybackend.Repositories.CategoryRepository;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.OrderRepository;
import com.example.mybackend.Repositories.UserRepository;
import com.example.mybackend.Services.UserService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Map;

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
    @Autowired
    CategoryRepository categoryRepository;

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
        // ! nutrition Value :
        Comment comment = Comment.builder()
                .user(userRepository.findById(2L).get())
                .content("Delicious and tasty!")
                .build();
        Comment comment2 = Comment.builder()
                .user(userRepository.findById(2L).get())
                .content("Fresh and tasty!")
                .build();
        Comment comment3 = Comment.builder()
                .user(userRepository.findById(2L).get())
                .content("Rich and Creamy!")
                .build();
        Comment comment4 = Comment.builder()
                .user(userRepository.findById(2L).get())
                .content("Spicy and flavorful!")
                .build();
        // ! Add New Meals
        Food pizza = Food.builder()
                .image("Images/pasta.png")
                .name("Pasta")
                .description("Pasta is an Italian cuisine staple made from durum wheat flour mixed with water or eggs and formed into various shapes. It is typically cooked by boiling and can be served with a variety of sauces, such as tomato, Alfredo, or pesto.")
                .price(22.0f)
                .rating(5.0f)
                .nutritionValue(Map.of("Calories", 12f, "Protein", 8f, "Fat", 60f, "Carbohydrates", 10f))
                .category(categoryRepository.findById(1L).get())
                .carousels(null)
                .totalCalories(400)
                .comments(List.of(comment))
                .build();
        Food sushi = Food.builder()
                .image("Images/pizza.png")
                .name("Pizza")
                .description("Pizza is a popular Italian dish consisting of a round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients. It is baked at a high temperature, traditionally in a wood-fired oven.")
                .price(18.0f)
                .rating(5.0f)
                .nutritionValue(Map.of("Calories", 20f, "Protein", 10f, "Fat", 45f, "Carbohydrates", 20f))
                .category(categoryRepository.findById(1L).get())
                .carousels(null)
                .totalCalories(500)
                .comments(List.of(comment2))
                .build();
        Food pasta = Food.builder()
                .image("Images/pizza.png")
                .name("Pizza")
                .description("Pizza is a popular Italian dish consisting of a round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients. It is baked at a high temperature, traditionally in a wood-fired oven.")
                .price(18.0f)
                .rating(5.0f)
                .nutritionValue(Map.of("Calories", 20f, "Protein", 10f, "Fat", 45f, "Carbohydrates", 20f))
                .category(categoryRepository.findById(1L).get())
                .carousels(null)
                .comments(List.of(comment3))
                .totalCalories(420)
                .build();
        Food tacos = Food.builder()
                .image("Images/tacos.png")
                .name("Tacos")
                .description("Tacos are a traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand. Common fillings include beef, pork, chicken, seafood, vegetables, and cheese..")
                .price(15.0f)
                .rating(4.2f)
                .nutritionValue(Map.of("Calories", 8f, "Protein", 12f, "Fat", 35f, "Carbohydrates", 20f))
                .category(categoryRepository.findById(1L).get())
                .carousels(null)
                .comments(List.of(comment4))
                .totalCalories(250)
                .build();

    }
}
