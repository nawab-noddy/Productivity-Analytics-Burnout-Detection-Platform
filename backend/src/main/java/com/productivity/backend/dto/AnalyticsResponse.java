package com.productivity.backend.dto;

import lombok.Data;

@Data
public class AnalyticsResponse {

    private Double averageWorkHours;
    private Double averageSleepHours;
    private Double averageStress;

//    the rule based insight
    private boolean isProductivityDropping; // "Drift"
    private String burnoutRisk; // "Low", "Moderate", "High"
    private String recommendation;

//    AI-Based Data
    private Integer aiBurnoutPrediction; // 0 or 1
    private Double aiRiskProbability; // eg. 0.85
    private  String aiAnalysisStatus; // success or failure
}
