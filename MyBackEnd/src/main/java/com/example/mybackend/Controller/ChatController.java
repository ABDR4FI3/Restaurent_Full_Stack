package com.example.mybackend.Controller;

import com.example.mybackend.Services.DialogflowService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {
    private final DialogflowService dialogflowService;

    public ChatController(DialogflowService dialogflowService) {
        this.dialogflowService = dialogflowService;
    }

    @PostMapping("/chat")
    public String chat(@RequestParam String sessionId, @RequestBody String message) {
        return dialogflowService.detectIntent(sessionId, message);
    }
}
