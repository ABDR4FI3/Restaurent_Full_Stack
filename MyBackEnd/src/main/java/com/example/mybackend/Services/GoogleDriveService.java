package com.example.mybackend.Services;

import com.google.api.client.http.AbstractInputStreamContent;
import com.google.api.client.http.ByteArrayContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class GoogleDriveService {

    @Autowired
    private Drive drive;

    public String uploadFile(MultipartFile file) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(file.getOriginalFilename());

        AbstractInputStreamContent uploadStreamContent = new ByteArrayContent(file.getContentType(), file.getBytes());

        File uploadedFile = drive.files().create(fileMetadata, uploadStreamContent)
                .setFields("id, webContentLink, webViewLink")
                .execute();

        return uploadedFile.getWebViewLink();
    }
}
