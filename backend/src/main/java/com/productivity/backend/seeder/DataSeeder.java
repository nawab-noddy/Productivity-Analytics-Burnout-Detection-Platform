package com.productivity.backend.seeder;

import com.productivity.backend.model.DailyLog;
import com.productivity.backend.model.User;
import com.productivity.backend.repository.DailyLogRepository;
import com.productivity.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DailyLogRepository dailyLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Check if our "Demo User" already exists
        if (userRepository.existsByUsername("demo_user")) {
            return; // Data already exists, do nothing
        }

        System.out.println("🌱 Seeding Database with Demo Data...");

        // 2. Create the Demo User
        User user = new User();
        user.setUsername("demo_user");
        user.setEmail("demo@example.com");
        user.setPassword(passwordEncoder.encode("password123")); // Simple password
        userRepository.save(user);

        // 3. Create 7 Days of Fake History (Story: A user slowly burning out)

        // Day 1: Good day
        createLog(user, LocalDate.now().minusDays(6), 8.0, 7.5, 2, "Happy");

        // Day 2: Normal day
        createLog(user, LocalDate.now().minusDays(5), 8.5, 7.0, 3, "Neutral");

        // Day 3: Working harder
        createLog(user, LocalDate.now().minusDays(4), 10.0, 6.5, 3, "Focused");

        // Day 4: Stress starting
        createLog(user, LocalDate.now().minusDays(3), 11.0, 6.0, 4, "Anxious");

        // Day 5: Late night (Burnout warning)
        createLog(user, LocalDate.now().minusDays(2), 12.0, 5.0, 5, "Exhausted");

        // Day 6: The Crash (Drift detected)
        createLog(user, LocalDate.now().minusDays(1), 4.0, 9.0, 4, "Tired");

        // Day 7: Today (Recovery)
        createLog(user, LocalDate.now(), 6.0, 8.0, 2, "Recovering");

        System.out.println("✅ Database Seeded Successfully!");
    }

    private void createLog(User user, LocalDate date, Double work, Double sleep, Integer stress, String mood) {
        DailyLog log = new DailyLog();
        log.setUser(user);
        log.setDate(date);
        log.setWorkHours(work);
        log.setSleepHours(sleep);
        log.setStressLevel(stress);
        log.setMood(mood);
        log.setPlannedTasks("Task 1, Task 2");
        log.setCompletedTasks("Task 1"); // Dummy data
        dailyLogRepository.save(log);
    }
}