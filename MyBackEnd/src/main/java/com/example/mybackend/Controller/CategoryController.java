package com.example.mybackend.Controller;

import com.example.mybackend.Services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public Map<String, Object> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
