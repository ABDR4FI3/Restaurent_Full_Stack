package com.example.mybackend.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import okhttp3.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
public class AiSrevice {
    @Value("${openai.api.key}")
    private String apiKey;

    public String analyzeData(String inputData) throws IOException {
        System.out.println("api key = " + apiKey);
        System.out.println("i"  + inputData);
        OkHttpClient client = new OkHttpClient();

        ObjectMapper mapper = new ObjectMapper();
        String jsonBody = mapper.writeValueAsString(Map.of(
                "model", "babbage-002",
                "prompt", inputData,
                "max_tokens", 16_384
        ));

        RequestBody body = RequestBody.create(
                jsonBody,
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/completions")
                .post(body)
                .addHeader("Authorization", "Bearer " + apiKey)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body().string();
                throw new IOException("Unexpected code " + response + ". Error body: " + errorBody);
            }

            return response.body().string();
        }
    }
}
