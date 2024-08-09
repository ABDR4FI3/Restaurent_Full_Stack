package com.example.mybackend.Services;

import com.example.mybackend.DTO.InventoryDTO;
import com.example.mybackend.DTO.InventoryQuantityDTO;
import com.example.mybackend.DTO.SupplierDTO;
import com.example.mybackend.Models.Inventory;
import com.example.mybackend.Models.InventoryCategory;
import com.example.mybackend.Models.Supplier;
import com.example.mybackend.Repositories.InventoryCategoryRepository;
import com.example.mybackend.Repositories.InventoryRepository;
import com.example.mybackend.Repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class InventoryService {
    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    SupplierRepository supplierRepository;
    @Autowired
    InventoryCategoryRepository  inventoryCategoryRepository;
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
    public Map<String ,Object> addInventory(InventoryDTO inventoryDTO , String token) {
        Map<String , Object> response = new HashMap<>() ;
        // ! JWT Validation
        if(jwtUtils.isTokenExpired(token)) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        List<Supplier> suppliers = new ArrayList<>();
        for(SupplierDTO supplier : inventoryDTO.getSuppliers()) {
            if(supplierRepository.findById(supplier.getId()).isEmpty()) {
                response.put("message" , "Supplier not found");
                response.put("response" , 404);
                return response;
            }
            suppliers.add(supplierRepository.findById(supplier.getId()).get());
        }
        Optional<InventoryCategory> inventoryCategory = inventoryCategoryRepository.findById(inventoryDTO.getCategory());
        if(inventoryCategory.isEmpty()) {
            response.put("message" , "Category not found");
            response.put("response" , 404);
            return response;
        }
        System.out.println(suppliers);
        Inventory inventory = Inventory.builder()
                .category(inventoryCategory.get())
                .price(inventoryDTO.getPrice())
                .minQuantity(inventoryDTO.getMinQuantity())
                .itemName(inventoryDTO.getItemName())
                .suppliers(suppliers)
                .build();
        inventoryRepository.save(inventory);
        response.put("message" , "Inventory added successfully");
        response.put("response" , 200);
        return response;
    }
    public Map<String ,Object> handleQuantity(InventoryQuantityDTO inventoryQuantityDTO ) {
        Map<String , Object> response = new HashMap<>() ;
        // ! Jwt Validation
        if(jwtUtils.isTokenExpired(inventoryQuantityDTO.getToken())) {
            response.put("message" , "Token Expired");
            response.put("response" , 400);
            return response;
        }
        Optional<Inventory> inventoryOptionaly = inventoryRepository.findById(inventoryQuantityDTO.getId());
        if(inventoryOptionaly.isEmpty()) {
            response.put("message" , "Inventory not found");
            response.put("response" , 404);
            return response;
        }
        Inventory update = inventoryOptionaly.get();
        if(inventoryQuantityDTO.getAction().equalsIgnoreCase("add")) {
            update.setQuantity(update.getQuantity() + inventoryQuantityDTO.getQuantity());
            inventoryRepository.save(update);
            response.put("message" , "Quantity added successfully");
            response.put("response" , 200);
            return response;
        }
        if(inventoryQuantityDTO.getAction().equalsIgnoreCase("delete") && (update.getQuantity() > inventoryQuantityDTO.getQuantity())) {
            update.setQuantity(update.getQuantity() - inventoryQuantityDTO.getQuantity());
            inventoryRepository.save(update);
            response.put("message" , "Quantity removed successfully");
            response.put("response" , 200);
            return response;
        }
        if (update.getQuantity() < inventoryQuantityDTO.getQuantity()) {
            response.put("message" , "Methode not allowed for this quantity");
            response.put("response" , 200);
            return response;
        }
        System.out.println(inventoryQuantityDTO.getAction().equalsIgnoreCase("delete"));
        response.put("message" , "Invalid action");
        response.put("response" , 400);
        return response;
    }
}
