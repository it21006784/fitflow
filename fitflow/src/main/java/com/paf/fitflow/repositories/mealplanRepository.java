package com.paf.fitflow.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.paf.fitflow.models.mealplan;

public interface mealplanRepository extends MongoRepository<mealplan, String>{

    List<mealplan> findByCategory(String category);



}

