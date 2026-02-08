package com.productivity.backend.Controller;

import com.productivity.backend.dto.DailyLogRequest;
import com.productivity.backend.model.DailyLog;
import com.productivity.backend.service.DailyLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class DailyLogController {

    @Autowired
    private DailyLogService dailyLogService;

    // POST /api/logs - Create a new entry
    @PostMapping
    public ResponseEntity<?> createLog(@RequestBody DailyLogRequest request) {
        try {
            // Get the username from the Token (SecurityContext)
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String username = auth.getName();

            DailyLog newLog = dailyLogService.createLog(request, username);
            return ResponseEntity.ok(newLog);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // GET /api/logs - Get all history for the logged-in user
    @GetMapping
    public ResponseEntity<List<DailyLog>> getMyLogs() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        return ResponseEntity.ok(dailyLogService.getUserLogs(username));
    }
}