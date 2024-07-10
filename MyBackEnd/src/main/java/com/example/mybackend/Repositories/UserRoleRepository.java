package com.example.mybackend.Repositories;

import com.example.mybackend.Models.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
}
