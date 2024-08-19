package com.example.mybackend.Controller;

import com.example.mybackend.Models.Food;
import com.example.mybackend.Services.AiSrevice;
import com.example.mybackend.Services.FoodService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/AI")
public class AiController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private AiSrevice AIService;

    @GetMapping("/analyze/food")
    public ResponseEntity<String> analyzeData() {
        try {
            List<Food> data = foodService.getAll();
            // Convert the list of Food objects to a JSON string
            String jsonData = new ObjectMapper().writeValueAsString(data);
            String result = AIService.analyzeData(jsonData);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
