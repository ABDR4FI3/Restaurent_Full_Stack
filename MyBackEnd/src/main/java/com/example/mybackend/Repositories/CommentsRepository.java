package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Comment;
import com.example.mybackend.Models.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Long> {
    public List<Comment> findCommentByFood(Food food);
}
