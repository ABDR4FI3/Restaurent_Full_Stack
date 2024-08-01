package com.example.mybackend.Services;

import com.example.mybackend.Models.Inventory;
import com.example.mybackend.Repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    JWTUtils jwtUtils;

    public Map<String , Object> getInventory(String  token) {
        Map<String , Object> response = new HashMap<>() ;
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        List<Inventory> inventories = inventoryRepository.findAll();
        if(inventories.isEmpty()) {
            response.put("message" , "No inventory found");
            response.put("response" , 404);
            return response;
        }
        response.put("inventories" , inventories);
        response.put("response" , 200);
        return response;
    }
}
