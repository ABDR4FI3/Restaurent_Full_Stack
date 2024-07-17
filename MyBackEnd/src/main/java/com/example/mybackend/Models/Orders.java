package com.example.mybackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int qte;
    private String status;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonBackReference
    @JsonIgnoreProperties("food")
    private Cart cart;

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", food=" + (food != null ? food.getId() : null) +  // Adjust to avoid deep nesting
                ", cart=" + (cart != null ? cart.getId() : null) +
                ", qte=" + qte +
                ", user=" + (user != null ? user.getId() : null) +
                ", status='" + status + '\'' +
                '}';
    }
}
