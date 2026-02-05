package com.productivity.backend.Controller;

import com.productivity.backend.model.User;
import com.productivity.backend.service.UserService;
import com.productivity.backend.util.JwtUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth") // base URL for this controller
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    // POST http://localhost:8080/api/auth/login

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request){

            // 1. Find user in the database
            User user = userService.findByUsername(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found!"));

            // 2. Check if the password matches the encrypted password in the database
            if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
                return ResponseEntity.status(401).body("Invalid Password");
            }

            // 3. Generate JWT Token
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(token);
    }

    //  DTO (Data Transfer Object) to map JSON to Java
    @Data
    public static class RegisterRequest{
        private String username;
        private String email;
        private String password;
    }

    @Data
    public static class LoginRequest{
        private String username;
        private String password;
    }


    // GET http://localhost:8080/api/auth/test
    // This endpoint requires a valid Token!
    @org.springframework.web.bind.annotation.GetMapping("/test")
    public ResponseEntity<?> testProtectedEndpoint() {
        return ResponseEntity.ok("You have accessed a protected endpoint!");
    }
}
