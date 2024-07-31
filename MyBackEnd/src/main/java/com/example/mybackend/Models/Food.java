package com.example.mybackend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comments;

import java.util.List;
import java.util.Map;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String image;
    private String link;

    @Lob
    @Column(length = 10000)  // * Specifies the maximum length of the description
    private String description;

    private float rating;
    private float price;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonManagedReference
    private Category category;

    @ElementCollection
    @CollectionTable(name = "food_nutrition", joinColumns = @JoinColumn(name = "food_id"))
    @MapKeyColumn(name = "nutrition_name")
    @Column(name = "nutrition_value")
    private Map<String, Float> nutritionValue;

    private int totalCalories;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comment> comments;

    @OneToOne(mappedBy = "food", cascade = CascadeType.ALL)
    private Carousel carousel;

    @ManyToMany(mappedBy = "favoriteFoods")
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "food")
    @JsonManagedReference
    @JsonIgnore
    private List<Orders> orders;

    @Override
    public String toString() {
        return "Food{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

}
