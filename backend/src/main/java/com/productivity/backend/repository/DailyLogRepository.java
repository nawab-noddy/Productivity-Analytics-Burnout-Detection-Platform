package com.productivity.backend.repository;

import com.productivity.backend.model.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {

    // Find all logs for a specific user
    List<DailyLog> findByUserId(Long userId);

    // Find a specific log for a user on a specific date
    Optional<DailyLog> findByUserIdAndDate(Long userId, LocalDate date);
}