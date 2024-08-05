package com.example.mybackend.Services;

import com.example.mybackend.Models.Supplier;
import com.example.mybackend.Repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SupplierService {
    @Autowired
    SupplierRepository supplierRepository;
    @Autowired
    JWTUtils jwtUtils;

    public Map<String ,Object> getSuppliers(String  token){
        try {
            Map<String ,Object> response = new HashMap<>();
            if(jwtUtils.isTokenExpired(token)){
                response.put("error", "token expired");
                response.put("status", 401);
                return response;
            }
            List<Supplier> suppliers = supplierRepository.findAll();
            if(suppliers.isEmpty()){
                response.put("error", "no suppliers found");
                response.put("status", 404);
                return response;
            }
            response.put("suppliers", suppliers);
            response.put("status", 200);
            response.put("message", "suppliers retrieved successfully");
            return response;
        } catch (Exception e) {
            Map<String ,Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            response.put("status", 500);
            return response;
        }
    }
}
