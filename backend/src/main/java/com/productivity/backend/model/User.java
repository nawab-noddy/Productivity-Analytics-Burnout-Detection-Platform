package com.productivity.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Entity // Tells Hibernate "This class matches a table in the database."
@Table(name = "users") // Explicitly names the table users
@Data // Lombok: Generates Getters, Setters, toString, etc. automatically
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // This method runs automatically before saving to DB
    @PrePersist
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
}
