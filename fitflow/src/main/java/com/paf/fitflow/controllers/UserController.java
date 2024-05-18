package com.paf.fitflow.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitflow.models.UserModel;
import com.paf.fitflow.services.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserModel registerUser(@RequestBody UserModel user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public UserModel loginUser(@RequestBody UserModel user) {
        // Retrieve user from the database based on username
        UserModel existingUser = userService.findByUsername(user.getUsername());

        // Check if the user exists and the password matches
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser; // Return the user object if login is successful
        } else {
            throw new RuntimeException("Invalid username or password"); // Throw an exception if login fails
        }
    }

    @GetMapping("/{userId}")
    public UserModel getUserDetails(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }

    // Add OAuth2 callback endpoint
    @GetMapping("/oauth2/code/google")
    public String handleGoogleOAuth2Callback(@RequestParam("code") String code) {
        // Handle the OAuth2 callback from Google here
        // You can retrieve the code and exchange it for access token using OAuth2 client
        return "OAuth2 callback received"; // Placeholder response
    }
}
