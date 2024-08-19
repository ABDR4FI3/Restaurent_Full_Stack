package com.example.mybackend.Services;

import com.google.cloud.dialogflow.v2.DetectIntentRequest;
import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.google.cloud.dialogflow.v2.SessionsClient;
import com.google.cloud.dialogflow.v2.SessionName;
import com.google.cloud.dialogflow.v2.TextInput;
import com.google.cloud.dialogflow.v2.QueryInput;
import com.google.api.gax.rpc.ApiException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DialogflowService {
    @Value("${dialogflow.project.id}")
    private String projectId;

    public String detectIntent(String sessionId, String text) {
        try (SessionsClient sessionsClient = SessionsClient.create()) {
            SessionName session = SessionName.of(projectId, sessionId);
            TextInput textInput = TextInput.newBuilder().setText(text).setLanguageCode("en-US").build();
            QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();

            DetectIntentRequest request = DetectIntentRequest.newBuilder()
                    .setSession(session.toString())
                    .setQueryInput(queryInput)
                    .build();

            DetectIntentResponse response = sessionsClient.detectIntent(request);
            return response.getQueryResult().getFulfillmentText();
        } catch (ApiException | IOException e) {
            // Handle exception
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
