package com.paf.fitflow.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitflow.models.Comment;
import com.paf.fitflow.models.CurrentWorkoutStatus;
import com.paf.fitflow.repositories.CurrentWorkoutStatusRepository;

@Service
public class CurrentWorkoutStatusService {

    @Autowired
    private CurrentWorkoutStatusRepository repository;

    //add current workout status
    public CurrentWorkoutStatus addWorkoutStatus(CurrentWorkoutStatus status) {
        status.setLikes(0);
        status.setComments(new ArrayList<>());
        return repository.save(status);
    }

    //get all workout status
    public List<CurrentWorkoutStatus> getAllWorkoutStatusUpdates() {
        List<CurrentWorkoutStatus> statusList = repository.findAll();

        // Populate likes and comments for each status object
        for (CurrentWorkoutStatus status : statusList) {
            // If likes or comments are not populated in the database, set default values
            if (status.getLikes() == 0) {
                status.setLikes(0);
            }
            if (status.getComments() == null || status.getComments().isEmpty()) {
                status.setComments(new ArrayList<>());
            }
        }
    
        return statusList;
    }

    public List<CurrentWorkoutStatus> getCurrentUserWorkoutStatuses(String userId) {
        return repository.findByUserId(userId);
    }
    
    //get current workout status by id
    public CurrentWorkoutStatus getCurrentWorkoutStatus(String statusId) {
        return repository.findById(statusId).get();
    }

    //update current workout status by id
    public CurrentWorkoutStatus editCurrentWorkoutStatus(CurrentWorkoutStatus statusRequest){
        //get the existing from the DB
        //populate new values from request to existing document
        CurrentWorkoutStatus existingStatus = repository.findById(statusRequest.getStatusId()).get();
        existingStatus.setDate(statusRequest.getDate());
        existingStatus.setDescription(statusRequest.getDescription());
        existingStatus.setDistanceRun(statusRequest.getDistanceRun());
        existingStatus.setNoOfPushups(statusRequest.getNoOfPushups());
        existingStatus.setWeightLifted(statusRequest.getWeightLifted());

        return repository.save(existingStatus);
    }

    //delete current workout status by id
    public String deleteCurrentStatus(String statusId){
        repository.deleteById(statusId);
        return statusId+"Status delete from feed";
    }

     // Method to like a workout status post
     public CurrentWorkoutStatus likeWorkoutStatus(String statusId) {
        CurrentWorkoutStatus status = repository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Workout status not found"));

        status.setLikes(status.getLikes() + 1);
        return repository.save(status);
    }

    // Method to add a comment to a workout status post
    public CurrentWorkoutStatus addCommentToWorkoutStatus(String statusId, Comment comment) {
        CurrentWorkoutStatus status = repository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Workout status not found"));

        // Add comment to the list of comments
        status.getComments().add(comment);
        return repository.save(status);
    }


}
