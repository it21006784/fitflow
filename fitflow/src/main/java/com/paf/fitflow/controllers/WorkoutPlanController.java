package com.paf.fitflow.controllers;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitflow.models.Workout;
import com.paf.fitflow.services.WorkoutPlanService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@RestController
@RequestMapping("api/workout")
public class WorkoutPlanController {
    @Autowired
    WorkoutPlanService workoutPlanService; 

    @GetMapping
    public List<Workout> getAllWorkoutPlans() {
        return workoutPlanService.allWorkoutPlans();
    }

    @GetMapping("/{w_id}")
    public Optional<Workout> getWorkoutPlansById(@PathVariable String w_id) {
        return workoutPlanService.workoutPlansById(w_id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Workout createWorkoutStatus(@RequestBody Workout workout){
        return workoutPlanService.addWorkoutPlan(workout);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Workout updateWorkoutStatus(@RequestBody Workout workout){
        return workoutPlanService.updateWorkoutPlan(workout);
    }

    @DeleteMapping("/{w_id}")
    public String deleteWorkoutStatus(@PathVariable String w_id){
        return workoutPlanService.deleteWorkoutPlan(w_id);
    }


    
}
