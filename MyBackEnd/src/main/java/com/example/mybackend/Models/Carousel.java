package com.example.mybackend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Carousel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long carouselId;

    @ElementCollection
    @CollectionTable(name = "carousel_images", joinColumns = @JoinColumn(name = "carousel_id"))
    @Column(name = "image")
    private List<String> images;

    @ElementCollection
    @CollectionTable(name = "carousel_links", joinColumns = @JoinColumn(name = "carousel_id"))
    @Column(name = "link")
    private List<String> Links;

    @ManyToMany
    @JoinTable(
            name = "carousel_food",
            joinColumns = @JoinColumn(name = "carousel_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    @JsonManagedReference

    private List<Food> foods;
}
