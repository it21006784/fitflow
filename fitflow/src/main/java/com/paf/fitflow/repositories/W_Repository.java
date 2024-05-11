package com.paf.fitflow.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.paf.fitflow.models.Workout;
@Repository
public interface W_Repository extends MongoRepository<Workout,String> {

}
