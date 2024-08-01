package com.example.mybackend.Controller;

import com.example.mybackend.Services.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/carousel")
public class CarouselController {
    @Autowired
    CarouselService carouselService;

    @PostMapping("/add")
    public Map<String, Object> addItemToCarousel(@RequestParam("food_id") long foodId, @RequestParam("link") String link ,@RequestParam("token") String token) {
        return carouselService.addItemToCarousel(foodId, link , token);
    }
    @PostMapping("/delete")
    public Map<String, Object> deleteItemFromCarousel(@RequestParam("food_id") long foodId, @RequestParam("link") String link ,@RequestParam("token") String token) {
        return carouselService.deleteItemFromCarousel(foodId, link,token);
    }
}
