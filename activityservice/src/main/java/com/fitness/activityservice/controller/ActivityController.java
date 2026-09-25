package com.fitness.activityservice.controller;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.service.ActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    public ResponseEntity<ActivityResponse> trackActivity(@Valid @RequestBody ActivityRequest request){
        return ResponseEntity.ok(activityService.trackActivity(request));
    }
//    @GetMapping
//    public ResponseEntity<List<ActivityResponse>> getUserActivities(String userId){
//        return ResponseEntity.ok(activityService.getUserActivities(userId));
//    }
    @GetMapping
    public ResponseEntity<List<ActivityResponse>> getActivities() {
        return ResponseEntity.ok(activityService.getActivities());
    }
    @GetMapping("/{activityId}")
    public ResponseEntity<ActivityResponse> getActivity(@PathVariable String activityId){
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }
}
