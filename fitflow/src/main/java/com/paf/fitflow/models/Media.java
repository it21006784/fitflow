package com.paf.fitflow.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "medias")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Media {

    @Id
    private String id;

    @Field(name = "imageFiles")
    private List<byte[]> imageFiles;

    @Field(name = "videoFiles")
    private List<byte[]> videoFiles; 

    private String description;

    private int likes; 

    private List<Comment> comments = new ArrayList<>();
    private String userId;
    private String username;
    private String date;
}

