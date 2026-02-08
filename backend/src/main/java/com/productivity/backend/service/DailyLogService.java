package com.productivity.backend.service;

import com.productivity.backend.dto.DailyLogRequest;
import com.productivity.backend.model.DailyLog;
import com.productivity.backend.model.User;
import com.productivity.backend.repository.DailyLogRepository;
import com.productivity.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DailyLogService {

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private UserRepository userRepository;

    // THIS IS THE METHOD THAT WAS MISSING OR INVALID
    public DailyLog createLog(DailyLogRequest request, String username) {
        // 1. Get the User from the database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Validate: Prevent duplicate logs for the same date
        // If date is null in request, use today's date
        LocalDate logDate = (request.getDate() != null) ? request.getDate() : LocalDate.now();

        Optional<DailyLog> existingLog = dailyLogRepository.findByUserIdAndDate(user.getId(), logDate);
        if (existingLog.isPresent()) {
            throw new RuntimeException("You have already logged data for this date!");
        }

        // 3. Map DTO to Entity
        DailyLog log = new DailyLog();
        log.setUser(user);
        log.setDate(logDate);
        log.setWorkHours(request.getWorkHours());
        log.setPlannedTasks(request.getPlannedTasks());
        log.setCompletedTasks(request.getCompletedTasks());
        log.setSleepHours(request.getSleepHours());
        log.setStressLevel(request.getStressLevel());
        log.setMood(request.getMood());

        // 4. Save
        return dailyLogRepository.save(log);
    }

    // METHOD TO GET LOGS
    public List<DailyLog> getUserLogs(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return dailyLogRepository.findByUserId(user.getId());
    }
}