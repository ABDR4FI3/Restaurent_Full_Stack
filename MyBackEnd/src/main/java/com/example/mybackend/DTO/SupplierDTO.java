package com.example.mybackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SupplierDTO {

    private Long id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String website;
    private List<InventoryDTO> inventories;
}