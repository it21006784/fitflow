package com.paf.fitflow.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitflow.models.Comment;
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

    public Workout updateWorkoutPlan(String w_id, Workout workout) {
        Workout existingWorkout = repo.findById(w_id).orElseThrow(() -> new RuntimeException("Workout plan not found"));

        existingWorkout.setW_name(workout.getW_name());
        existingWorkout.setDescription(workout.getDescription());
        existingWorkout.setTimeDuration(workout.getTimeDuration());
        
        return repo.save(existingWorkout);
    }       

    public String deleteWorkoutPlan(String id) {
        repo.deleteById(id);
        return id+" Deletion successfull";
    }

     // Method to like a workout plan post
     public Workout likeWorkout(String w_id) {
        Workout workout = repo.findById(w_id)
                .orElseThrow(() -> new RuntimeException("Workout plan not found"));

        workout.setLikes(workout.getLikes() + 1);
        return repo.save(workout);
    }

    // Method to add a comment to a workout plan post
    public Workout addCommentToWorkoutPlan(String w_id, Comment comment) {
        Workout workout = repo.findById(w_id)
                .orElseThrow(() -> new RuntimeException("Workout status not found"));

        // Add comment to the list of comments
        workout.setComments(comment);
        return repo.save(workout);
    }

}