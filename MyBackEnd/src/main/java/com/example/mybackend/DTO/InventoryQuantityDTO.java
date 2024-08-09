package com.example.mybackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryQuantityDTO {
    private String token ;
    private long id ;
    private int quantity ;
    private String action ;

}
