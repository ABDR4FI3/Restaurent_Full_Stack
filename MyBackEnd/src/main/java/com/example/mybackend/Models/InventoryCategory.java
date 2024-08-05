package com.example.mybackend.Models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder @Data
public class InventoryCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id ;
    String name ;
    String description ;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Inventory> inventories;

    @Override
    public String toString() {
        return "InventoryCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", inventories=" + (inventories != null ? inventories.size() : "null") +  // Avoid circular reference
                '}';
    }
}
