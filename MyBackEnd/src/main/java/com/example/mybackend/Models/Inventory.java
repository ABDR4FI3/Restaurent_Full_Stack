package com.example.mybackend.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemName;
    private int quantity;
    private double price;
    private double minQuantity;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("inventories")
    private InventoryCategory category;

    @ManyToMany
    @JoinTable(
            name = "inventory_supplier",
            joinColumns = @JoinColumn(name = "inventory_id"),
            inverseJoinColumns = @JoinColumn(name = "supplier_id")
    )
    @JsonIgnoreProperties("inventories")
    private List<Supplier> suppliers;

    @Override
    public String toString() {
        return "Inventory{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", category=" + (category != null ? category.getId() : "null") +  // Avoid circular reference
                ", minQuantity=" + minQuantity +
                ", suppliers=" + (suppliers != null ? suppliers.size() : "null") +  // Avoid circular reference
                '}';
    }
}