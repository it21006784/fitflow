package com.paf.fitflow.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.paf.fitflow.models.CurrentWorkoutStatus;

public interface CurrentWorkoutStatusRepository extends MongoRepository<CurrentWorkoutStatus, String>{

}
