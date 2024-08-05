package com.example.mybackend.Services;

import com.example.mybackend.Repositories.InventoryCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class InventoryCategoryService {
    @Autowired
    JWTUtils jwtUtils;
    @Autowired
    InventoryCategoryRepository inventoryCategoryRepository;
    public Map<String , Object> getCategory(String token) {
        HashMap<String , Object> response = new HashMap<>();
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("response" , 401);
            response.put("message" , "Token Expired");
            return response;
        }
        response.put("categories" , inventoryCategoryRepository.findAll());
        response.put("response" , 200);
        return response;
    }
}
