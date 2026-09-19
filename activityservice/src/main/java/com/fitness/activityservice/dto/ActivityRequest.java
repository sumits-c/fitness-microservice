package com.fitness.activityservice.dto;

import com.fitness.activityservice.model.ActivityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ActivityRequest {
    @NotBlank
    private String userId;
    @NotNull
    private ActivityType type;
    @NotNull
    @Positive
    private Integer duration;
    @NotNull
    @PositiveOrZero
    private Integer caloriesBurned;
    @NotNull
    private LocalDateTime startTime;
    private Map<String, Object> additionalMetrics;
}
