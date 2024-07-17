package com.example.mybackend.Repositories;


import com.example.mybackend.Models.Orders;
import com.example.mybackend.Models.User;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long > {
    public List<Orders> findByUser(User user);
    public List<Orders> findByStatusAndUser(String status , User user);
}
