package com.paf.fitflow.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Workoutplans")
public class Workout {
    @Id
    private String w_id;
    private String w_name; 
    private int likes;
    private String description;

    public String getId() {
        return w_id;
    }
    public void setId(String w_id) {
        this.w_id = w_id;
    }
    public String getW_name() {
        return w_name;
    }
    public void setW_name(String w_name) {
        this.w_name = w_name;
    }
    public int getLikes() {
        return likes;
    }
    public void setLikes(int likes) {
        this.likes = likes;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Workout [ w_name=" + w_name + ", likes=" + likes + ", description=" + description
                + "]";
    }
    
}
