package com.productivity.backend.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DailyLogRequest {
    private LocalDate date;
    private Double workHours;
    private String plannedTasks;    // Matching your DailyLog.java (String)
    private String completedTasks;  // Matching your DailyLog.java (String)
    private Double sleepHours;
    private Integer stressLevel;    // 1-5
    private String mood;
}