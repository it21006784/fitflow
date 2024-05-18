package com.paf.fitflow.models;

import java.util.ArrayList;
import java.util.List;

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
    private String u_id;
    private String u_name;
    private String w_name; 
    private int likes;
    private String description;
    private String timeDuration;
    private List<Comment> comments = new ArrayList<>();

    public String getId() {
        return w_id;
    }
    public void setId(String w_id) {
        this.w_id = w_id;
    }
    public String getU_id() {
        return u_id;
    }
    public void setU_id(String u_id) {
        this.u_id = u_id;
    }
    public String getUname() {
        return u_name;
    }
    public void setUname(String u_name) {
        this.u_name = u_name;
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
    public String getTimeDuration() {
        return timeDuration;
    }
    public void setTimeDuration(String timeDuration) {
        this.timeDuration = timeDuration;
    }
    public List<Comment> getComment() {
        return comments;
    }
    public void setComments(Comment comment) {
        comments.add(comment);
    }
}

