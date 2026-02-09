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

    }
}
