package com.productivity.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Disable CSRF (Cross-Site Request Forgery) because we are building a stateless REST API
                .csrf(csrf -> csrf.disable())

                // 2. Configure URL permissions
                .authorizeHttpRequests(auth -> auth
                        // Allow anyone to access the auth routes (register, login)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Any other request must be authenticated
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}