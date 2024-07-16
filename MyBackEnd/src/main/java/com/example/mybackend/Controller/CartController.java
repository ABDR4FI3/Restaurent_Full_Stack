package com.example.mybackend.Controller;

import com.example.mybackend.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping("/add")
    public Map<String, Object> addFoodToCart(@RequestParam("foodId") int foodId, @RequestParam("userId") long userId) {
        return cartService.addFoodToCart(foodId, userId);
    }
    @PostMapping("/remove")
    public Map<String, Object> removeFoodFromCart(@RequestParam("foodId") long foodId, @RequestParam("userId") long userId) {
        return cartService.removeFoodFromCart(foodId, userId);
    }
    @PostMapping("/clear")
    public Map<String, Object> clearCart(@RequestParam("userId") long userId) {
        return cartService.clearCart(userId);
    }
    @GetMapping("/all")
    public Map<String, Object> getAllCartItems(@RequestParam("userId") long userId) {
        return cartService.getAllCartItems(userId);
    }
}
