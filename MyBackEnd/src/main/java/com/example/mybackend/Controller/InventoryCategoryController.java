package com.example.mybackend.Controller;

import com.example.mybackend.Services.InventoryCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/inventoryCategory")
public class InventoryCategoryController {

    @Autowired
    InventoryCategoryService inventoryCategoryService;

    @GetMapping("/all")
    public Map<String , Object> getCategory(@RequestParam("token") String token) {
        return inventoryCategoryService.getCategory(token);
    }
}
