package com.fitness.aiservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AIService {

    private final WebClient webClient;

    @Value("${AI_API_URL}")
    private String aiApiUrl;

    @Value("${AI_API_KEY}")
    private String aiApiKey;

    public AIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String getAnswer(String question) {

        Map<String,Object> requestBody = Map.of(
                "model", "nex-agi/nex-n2.5-mini:free",
                "messages", new Object[]{
                        Map.of(
                                "role", "user",
                                "content", question
                        )
                }
        );

        String response = webClient.post()
                .uri(aiApiUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + aiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }
}