package com.productivity.backend.Controller;

import com.productivity.backend.model.User;
import com.productivity.backend.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth") // base URL for this controller
public class AuthController {

    @Autowired
    private UserService userService;

    // POST http://localhost:8080/api/auth/register

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request){
        try{
            User newUser = userService.registerUser(
                    request.getUsername(),
                    request.getEmail(),
                    request.getPassword()
            );
            return ResponseEntity.ok("User registered successfully! ID " + newUser.getId());
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //  DTO (Data Transfer Object) to map JSON to Java
    @Data
    public static class RegisterRequest{
        private String username;
        private String email;
        private String password;
    }
}
