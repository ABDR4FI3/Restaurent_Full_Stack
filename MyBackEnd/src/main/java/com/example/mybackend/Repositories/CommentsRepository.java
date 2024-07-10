package com.example.mybackend.Repositories;

import com.example.mybackend.Models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comment, Long> {
}
