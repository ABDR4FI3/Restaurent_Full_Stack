package com.example.mybackend.Controller;

import com.example.mybackend.DTO.InventoryDTO;
import com.example.mybackend.Services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    InventoryService inventoryService;

    @GetMapping("/all")
    public Map<String , Object> getAllInventory(@RequestParam("token") String token) {
        return inventoryService.getInventory(token);
    }
    @PostMapping("/add")
    public Map<String , Object> addInventory(@RequestBody InventoryDTO inventoryDTO , @RequestParam("token") String token) {
        return inventoryService.addInventory(inventoryDTO , token);
    }
}
