package com.example.mybackend.Controller;

import com.example.mybackend.Services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    @GetMapping("/all")
    public Map<String ,Object> getSuppliers(@RequestParam("token") String  token){
        return supplierService.getSuppliers(token);
    }
}
