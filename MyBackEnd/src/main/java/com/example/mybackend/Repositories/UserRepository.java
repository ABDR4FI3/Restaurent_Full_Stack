package com.example.mybackend.Repositories;

import com.example.mybackend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);
    public User findByPhone(String phone);
    public User findByName(String name);
}
