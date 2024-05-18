package com.paf.fitflow.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "currentWorkoutStatus")
@Data
@AllArgsConstructor
@NoArgsConstructor


public class CurrentWorkoutStatus {

    @Id
    private String statusId;
    private String userId;
    private String username;
    private String date;
    private String description;
    private double distanceRun;
    private int noOfPushups;
    private double weightLifted;
    private int likes; 
    private List<Comment> comments = new ArrayList<>();
}
