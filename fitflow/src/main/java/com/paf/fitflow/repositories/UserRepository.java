package com.paf.fitflow.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.paf.fitflow.models.UserModel;

public interface UserRepository extends MongoRepository<UserModel, String> {

    // Method to check if a username already exists
    boolean existsByUsername(String username);

    // Method to check if an email is already registered
    boolean existsByEmail(String email);
    
    // Method to find a user by their username
    UserModel findByUsername(String username);
}
