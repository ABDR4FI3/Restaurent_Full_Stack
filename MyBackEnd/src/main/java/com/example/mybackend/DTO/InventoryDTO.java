package com.example.mybackend.DTO;

import com.example.mybackend.Models.InventoryCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDTO {
    private Long id;
    private String itemName;
    private int quantity;
    private int price;
    private long category;
    private int minQuantity;
    private List<SupplierDTO> suppliers;
}