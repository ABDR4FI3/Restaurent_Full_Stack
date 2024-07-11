package com.example.mybackend.Services;

import com.example.mybackend.Models.Comment;
import com.example.mybackend.Repositories.CommentsRepository;
import com.example.mybackend.Repositories.FoodRepository;
import com.example.mybackend.Repositories.UserRepository;
import org.hibernate.annotations.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class CommentService {
    @Autowired
    CommentsRepository commentsRepository;
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    UserRepository userRepository;

    public HashMap<String,Object> addComment(Long foodId, Long userId, String comment) {
        HashMap<String, Object> response = new HashMap<>();
        boolean flag = true;
        if(foodId == null || userId == null || comment == null) {
            response.put("response", 400);
            response.put("message", "Missing parameters");
            return response;
        }
        if(foodRepository.findById(foodId).get() == null) {
            flag = false;
            response.put("Food_message", "Food not found");
        }
        if(userRepository.findById(userId).get() == null) {
            flag = false;
            response.put("User_message", "User not found");
        }
        if(!flag) {
            response.put("response", 404);
            return response;
        }
        commentsRepository.save(Comment.builder()
                        .content(comment)
                        .user(userRepository.findById(userId).get())
                        .food(foodRepository.findById(foodId).get())
                .build());
        response.put("response", 200);
        response.put("message", "Comment added successfully");
        return response;
    }

    public HashMap<String ,Object> getCommentsForFood(Long foodId) {
        HashMap<String, Object> response = new HashMap<>();
        if(foodRepository.findById(foodId).get() == null) {
            response.put("response", 404);
            response.put("message", "Food not found");
            return response;
        }
        response.put("response", 200);
        response.put("message", "Comments retrieved successfully");
        response.put("comments", commentsRepository.findCommentByFood(foodRepository.findById(foodId).get()));
        return response;
    }
}
