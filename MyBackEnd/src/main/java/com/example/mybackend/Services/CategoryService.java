package com.example.mybackend.Services;

import com.example.mybackend.Models.Category;
import com.example.mybackend.Repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Map<String, Object> getAllCategories() {
        Map<String, Object> response = new HashMap<>();
        List<Category> categories = categoryRepository.findAll();
        if ((categories == null) || (categories.size() == 0)) {
            response.put("message", "No categories found");
            return response;
        }
        response.put("categories", categoryRepository.findAll());
        return response;
    }
}
