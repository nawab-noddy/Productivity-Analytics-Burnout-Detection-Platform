package com.productivity.backend.service;

import com.productivity.backend.dto.AnalyticsResponse;
import com.productivity.backend.model.DailyLog;
import com.productivity.backend.model.User;
import com.productivity.backend.repository.DailyLogRepository;
import com.productivity.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private UserRepository userRepository;

    public AnalyticsResponse calculateWeeklyInsights(String username){
//        Fetch user and his logs
        User user = userRepository.findByUsername(username)
                .orElseThrow( ()-> new RuntimeException("User Not  Found"));

        List<DailyLog> logs = dailyLogRepository.findByUserId(user.getId());

//        If not enough data, return empty/safe defaults
        if(logs.isEmpty()){
            return new AnalyticsResponse(); // Returns nulls/defaults
        }
//        // 2. Calculate Averages (Java Streams API)
        double avgSleep = logs.stream().mapToDouble(DailyLog::getSleepHours).average().orElse(0.0);
        double avgWork = logs.stream().mapToDouble(DailyLog::getWorkHours).average().orElse(0.0);
        double avgStress = logs.stream().mapToDouble(DailyLog::getStressLevel).average().orElse(0.0);

        // 3. Apply Business Rules (The "Drift Detection")
        AnalyticsResponse response = new AnalyticsResponse();
        response.setAverageSleepHours(Math.round(avgSleep * 10.0) / 10.0); // Round to 1 decimal
        response.setAverageWorkHours(Math.round(avgWork * 10.0) / 10.0);
        response.setAverageStress(Math.round(avgStress * 10.0) / 10.0);

//        RUlE 1: Burnout Risk Calculation
//        High Risk: Sleep < 6 OR Stress > 4
        if(avgSleep < 6.0 || avgStress > 4.0){
            response.setBurnoutRisk("HIGH");
            response.setRecommendation("Warning: Your biological metrics are critical. Prioritize sleep immediately.");
        }
        // Moderate Risk: Sleep < 7 OR Work > 10
        else if (avgSleep < 7.0 || avgWork > 10.0) {
            response.setBurnoutRisk("MODERATE");
            response.setRecommendation("Caution: You are pushing your limits. Consider taking a break.");
        }
        else {
            response.setBurnoutRisk("LOW");
            response.setRecommendation("Great job! You are maintaining a healthy balance.");
        }
//        Productivity Drift (Simple Version)
//        Check if the most recent log has lower work hours than the average
        DailyLog lastLog = logs.get(logs.size() - 1);
        if(lastLog.getWorkHours() < (avgWork - 1.5)){
            response.setIsProductivityDropping(true); // you drifted significantly
        }
        else{
            response.setIsProductivityDropping(false);
        }
        return response;
    }
}
