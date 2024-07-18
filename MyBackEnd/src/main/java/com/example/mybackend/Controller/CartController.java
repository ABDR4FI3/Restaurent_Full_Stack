package com.example.mybackend.Controller;

import com.example.mybackend.Services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addFoodToCart(@RequestParam("foodId") int foodId, @RequestParam("userId") long userId) {
        Map<String, Object> response = cartService.addFoodToCart(foodId, userId);
        int statusCode = (int) response.get("response");
        return new ResponseEntity<>(response, HttpStatus.valueOf(statusCode));
    }

    @PostMapping("/remove")
    public ResponseEntity<Map<String, Object>> removeFoodFromCart(@RequestParam("token") String token, @RequestParam("orderId") long orderId) {
        Map<String, Object> response = cartService.removeFoodFromCart(token, orderId);
        int statusCode = (int) response.get("response");
        return new ResponseEntity<>(response, HttpStatus.valueOf(statusCode));
    }
    @PostMapping("/clear")
    public Map<String, Object> clearCart(@RequestParam("userId") long userId) {
        return cartService.clearCart(userId);
    }
    @GetMapping("/all")
    public Map<String, Object> getAllCartItems(@RequestParam("token") String token) {
        return cartService.getAllCartItems(token);
    }

    @GetMapping("/pay")
    public ResponseEntity<Map<String, Object>> PayOrder(@RequestParam("token") String token) {
        Map<String, Object> response = cartService.payAllItemsInCart(token);
        int statusCode = (int) response.get("response");
        return new ResponseEntity<>(response, HttpStatus.valueOf(statusCode));
    }

    @GetMapping("/paid")
    public ResponseEntity<Map<String ,Object>> getOrdersPaidByUser(@RequestParam("token") String token ){
        Map<String ,Object> response = cartService.getAllCartItemsByCategory(token, "paid");
        int statusCode = (int) response.get("response");
        return new ResponseEntity<>(response, HttpStatus.valueOf(statusCode));
    }

}
