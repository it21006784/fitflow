package com.paf.fitflow.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitflow.models.Workout;
import com.paf.fitflow.repositories.W_Repository;

@Service
public class WorkoutPlanService {
    @Autowired
    private W_Repository repo;

    public List<Workout> allWorkoutPlans() {
        return repo.findAll();
    }

    public Optional<Workout> workoutPlansById(String id) {
        Optional<Workout> workout = repo.findById(id);
        return workout;
    }

    public Workout addWorkoutPlan(Workout workout) {
        workout.setId(UUID.randomUUID().toString().split("-")[0]);
        return repo.save(workout);
    }

    public Workout updateWorkoutPlan(Workout workout) {
        Workout existingWorkout = repo.findById(workout.getId()).get();

        if(existingWorkout != null){
            existingWorkout.setW_name(workout.getW_name());
            existingWorkout.setDescription(workout.getDescription());
            existingWorkout.setLikes(workout.getLikes());
        }
        
        return repo.save(workout);
    }    

    public String deleteWorkoutPlan(String id) {
        repo.deleteById(id);
        return id+" Deletion successfull";
    }

}
