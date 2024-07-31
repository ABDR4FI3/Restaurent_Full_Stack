package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
