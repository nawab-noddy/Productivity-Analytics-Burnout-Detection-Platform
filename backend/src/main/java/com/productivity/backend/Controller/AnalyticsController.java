package com.productivity.backend.Controller;
import com.productivity.backend.dto.AnalyticsResponse;
import com.productivity.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

//    get api/analytics/weekly
    @GetMapping("/weekly")
    public ResponseEntity<AnalyticsResponse> getWeeklyInsights(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(analyticsService.calculateWeeklyInsights(username));
    }
}
