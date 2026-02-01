package com.productivity.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "daily_logs", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "date"}) // Prevents duplicate logs for same day
})
@Data
public class DailyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(name = "work_hours", nullable = false)
    private Double workHours;

    @Column(name = "planned_tasks", nullable = false)
    private String plannedTasks;

    @Column(name = "completed_tasks", nullable = false)
    private String completedTasks;

    @Column(name = "sleep_hours", nullable = false)
    private Double sleepHours;

    @Column(name = "stress_level", nullable = false)
    private Integer stressLevel; // 1-5

    private String mood;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // RELATIONSHIP: Many logs belong to One user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
