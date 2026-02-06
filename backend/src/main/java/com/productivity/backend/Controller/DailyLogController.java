package com.productivity.backend.Controller;

import com.productivity.backend.service.DailyLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logs")
public class DailyLogController {

    @Autowired
    private DailyLogService dailyLogService;

//    // POST /api/logs - Create a new entry
}
