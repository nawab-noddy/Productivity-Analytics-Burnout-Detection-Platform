package com.productivity.backend.service;
import com.productivity.backend.model.User;
import com.productivity.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserService {
    @Autowired
    public UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to register a user
    public User registerUser(String username, String email, String password){

//        check  if user exist

        if(userRepository.existsByUsername(username)){
            throw new RuntimeException("Username is already taken");
        }
        if(userRepository.existsByEmail(email)){
            throw new RuntimeException("Email already in use");
        }

//      create a new user

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);

//      Encrypt the password before saving!

        newUser.setPassword(passwordEncoder.encode(password));

        return userRepository.save(newUser);


    }
    // Method to Find a User by Username

    public Optional<User> findByUsername(String username){
        return userRepository.findByUsername(username);
    }
}
