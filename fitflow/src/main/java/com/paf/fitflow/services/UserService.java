package com.paf.fitflow.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitflow.models.UserModel;
import com.paf.fitflow.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to register a new user
    public UserModel registerUser(UserModel user) {
        // Check if the username or email is already in use
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }
        
        // Save the user
        return userRepository.save(user);
    }

    // Method to find a user by their username
    public UserModel findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Method to find a user by their email
    public UserModel findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    // Method to save a user
    public UserModel save(UserModel user) {
        return userRepository.save(user);
    }

    public UserModel getUserById(String userId) {
        return userRepository.findById(userId).get();
    }
    

}
