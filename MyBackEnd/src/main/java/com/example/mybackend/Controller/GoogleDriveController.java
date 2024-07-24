package com.example.mybackend.Controller;




import com.example.mybackend.Services.GoogleDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/drive")
public class GoogleDriveController {

    @Autowired
    private GoogleDriveService googleDriveService;

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return googleDriveService.uploadFile(file);
    }
}
