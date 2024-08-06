package com.example.mybackend.Repositories;

import com.example.mybackend.Models.InventoryCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryCategoryRepository extends JpaRepository<InventoryCategory , Long> {
}
