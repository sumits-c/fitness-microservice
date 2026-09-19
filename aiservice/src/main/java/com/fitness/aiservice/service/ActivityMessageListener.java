package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityMessageListener {

    private final RecommendationRepository recommendationRepository;
    private final ActivityAIService aiService;

    @RabbitListener(queues = "activity.queue")
    public void processActivity(Activity activity) {
        try {
            log.info("Received activity for processing: {}", activity.getId());

            Recommendation recommendation = aiService.generateRecommendation(activity);
            recommendationRepository.save(recommendation);

        } catch (Exception e) {
            log.error("Failed to process activity: {}", activity.getId(), e);
        }
    }
}