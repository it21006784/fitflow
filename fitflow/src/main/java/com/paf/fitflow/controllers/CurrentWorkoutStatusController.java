package com.paf.fitflow.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitflow.models.Comment;
import com.paf.fitflow.models.CurrentWorkoutStatus;
import com.paf.fitflow.services.CurrentWorkoutStatusService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/currentStatus")
@CrossOrigin(origins = "http://localhost:3000/")
public class CurrentWorkoutStatusController {

    @Autowired
    private CurrentWorkoutStatusService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CurrentWorkoutStatus createWorkoutStatus(@RequestBody CurrentWorkoutStatus status){
        return service.addWorkoutStatus(status);
    }
    

    @GetMapping
    public List<CurrentWorkoutStatus> getAllWorkoutUpdates() {
        return service.getAllWorkoutStatusUpdates();
    }

    @GetMapping("/{statusId}")
    public CurrentWorkoutStatus getCurrentWorkoutUpdate(@PathVariable String statusId) {
        return service.getCurrentWorkoutStatus(statusId);
    }
    
    @PutMapping
    public CurrentWorkoutStatus updateCurrentWorkoutStatus(@RequestBody CurrentWorkoutStatus status){
        return service.editCurrentWorkoutStatus(status);
    }

    @DeleteMapping("/{statusId}")
    public String deleteCurrentWorkoutStatus(@PathVariable String statusId){
        return service.deleteCurrentStatus(statusId);
    }

    @PostMapping("/{statusId}/like")
    public CurrentWorkoutStatus likeWorkoutStatus(@PathVariable String statusId){
        // Like the workout status post
        return service.likeWorkoutStatus(statusId);
    }

    @PostMapping("/{statusId}/comment")
    public CurrentWorkoutStatus addCommentToWorkoutStatus(@PathVariable String statusId, @RequestBody Comment comment){
        // Add comment to the workout status post
        return service.addCommentToWorkoutStatus(statusId, comment);
    }
}
