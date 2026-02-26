package com.productivity.backend.service;

import com.productivity.backend.dto.AnalyticsResponse;
import com.productivity.backend.model.DailyLog;
import com.productivity.backend.model.User;
import com.productivity.backend.repository.DailyLogRepository;
import com.productivity.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private UserRepository userRepository;

    // URL of your Python Microservice
    private final String ML_SERVICE_URL = "http://ml_service:5000/predict";

    public AnalyticsResponse calculateWeeklyInsights(String username) {
        // 1. Fetch User and Logs
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<DailyLog> logs = dailyLogRepository.findByUserId(user.getId());

        if (logs.isEmpty()) {
            return new AnalyticsResponse();
        }

        // 2. Calculate Averages
        double avgSleep = logs.stream().mapToDouble(DailyLog::getSleepHours).average().orElse(0.0);
        double avgWork = logs.stream().mapToDouble(DailyLog::getWorkHours).average().orElse(0.0);
        double avgStress = logs.stream().mapToDouble(DailyLog::getStressLevel).average().orElse(0.0);

        AnalyticsResponse response = new AnalyticsResponse();
        response.setAverageSleepHours(Math.round(avgSleep * 10.0) / 10.0);
        response.setAverageWorkHours(Math.round(avgWork * 10.0) / 10.0);
        response.setAverageStress(Math.round(avgStress * 10.0) / 10.0);

        // 3. Rule-Based Logic
        applyRuleBasedLogic(response, avgSleep, avgWork, avgStress, logs);

        // 4. AI Integration (Call Python)
        callAiMicroservice(response, avgSleep, avgWork, avgStress);

        return response;
    }

    private void applyRuleBasedLogic(AnalyticsResponse response, double avgSleep, double avgWork, double avgStress, List<DailyLog> logs) {
        // Rule 1: Burnout Risk
        if (avgSleep < 6.0 || avgStress > 4.0) {
            response.setBurnoutRisk("HIGH");
            response.setRecommendation("Warning: Biological metrics critical. Prioritize sleep.");
        } else if (avgSleep < 7.0 || avgWork > 10.0) {
            response.setBurnoutRisk("MODERATE");
            response.setRecommendation("Caution: You are pushing your limits.");
        } else {
            response.setBurnoutRisk("LOW");
            response.setRecommendation("Great job! Maintaining balance.");
        }

        // Rule 2: Drift Detection
        DailyLog lastLog = logs.get(logs.size() - 1);
        response.setProductivityDropping(lastLog.getWorkHours() < (avgWork - 1.5));
    }

    private void callAiMicroservice(AnalyticsResponse response, double sleep, double work, double stress) {
        try {
            // A. Prepare Data for Python
            Map<String, Object> requestPayload = new HashMap<>();
            requestPayload.put("sleep_hours", sleep);
            requestPayload.put("work_hours", work);
            requestPayload.put("stress_level", stress); // Matches app.py expectation

            // B. Send Request
            RestTemplate restTemplate = new RestTemplate();
            // We get the response as a generic Map
            Map<String, Object> mlResponse = restTemplate.postForObject(ML_SERVICE_URL, requestPayload, Map.class);

            // C. Extract Data
            if (mlResponse != null) {
                response.setAiBurnoutPrediction((Integer) mlResponse.get("burnout_prediction"));
                response.setAiRiskProbability((Double) mlResponse.get("risk_probability"));
                response.setAiAnalysisStatus("Success");
            }

        } catch (Exception e) {
            // If Python is down, we don't crash. We just log it.
            System.out.println("❌ AI Service Error: " + e.getMessage());
            response.setAiAnalysisStatus("AI Service Unavailable");
            response.setAiBurnoutPrediction(null);
            response.setAiRiskProbability(null);
        }
    }
}