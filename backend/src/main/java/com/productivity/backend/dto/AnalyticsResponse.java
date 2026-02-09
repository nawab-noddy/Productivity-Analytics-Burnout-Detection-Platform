package com.productivity.backend.dto;

import lombok.Data;

@Data
public class AnalyticsResponse {

    private Double averageWorkHours;
    private Double averageSleepHours;
    private Double averageStress;

//    the rule based insight
    private Boolean isProductivityDropping; // "Drift"
    private String burnoutRisk; // "Low", "Moderate", "High"
    private String recommendation;
}
