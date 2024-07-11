package com.example.mybackend.Controller;

import com.example.mybackend.DTO.CommentDTO;
import com.example.mybackend.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/all")
    public Map<String, Object> getCommentsForFood(@RequestParam("foodId") Long foodId) {
        return commentService.getCommentsForFood(foodId);
    }

    @PostMapping("/add")
    public Map<String, Object> addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.addComment(commentDTO.getFoodId(), commentDTO.getUserId(), commentDTO.getContent());
    }
}
