package com.paf.fitflow.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "mealplan")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class mealplan {

    @Id
    private String mealplanId;
    private String category;
    private String recipes;
    private String ingredients;
    private String cookingInstructions;
    private String nutritionalInformation;
    private String portionSizes;
    

  
    
    


}
