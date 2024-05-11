package com.paf.fitflow.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.paf.fitflow.models.mealplan;
import com.paf.fitflow.services.mealplanService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/mealplan")
@CrossOrigin(origins = "http://localhost:3000/")
public class mealplanController {

    @Autowired
    private mealplanService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public mealplan createMealplan(@RequestBody mealplan status){
        return service.addMealplan(status);
    }
    

    @GetMapping
     public List<mealplan> getAllMealplans() {
         return service.getAllMealplans();
     }
    // @GetMapping("/{category}")
    // public List<mealplan> getMealPlansByCategory(@PathVariable String Category) {
    //     return (List<mealplan>) service.getMealplan(Category);
    // }
    @GetMapping("/category/{category}")
    public List<mealplan> getMealPlansByCategory(@PathVariable String category) {
    return service.getMealPlansByCategory(category);
}


    @GetMapping("/{mealplanId}")
    public mealplan getMealplanUpdate(@PathVariable String mealplanId) {
        return service.getmealplan(mealplanId);
    }

    

     @PutMapping
     public mealplan updatemealplan(@RequestBody mealplan status) {
         return service.editmealplan( status);
     }
    @PutMapping("/category/{category}")
    public ResponseEntity<List<mealplan>> updateMealPlansByCategory(@PathVariable String category, @RequestBody mealplan mealPlanRequest) {
        List<mealplan> updatedMealPlans = service.editMealPlansByCategory(category, mealPlanRequest);
        return ResponseEntity.ok(updatedMealPlans);
    }


    @DeleteMapping("/{mealplanId}")
    public String deleteMealplanUpdate(@PathVariable String mealplanId) {
       return service.deletemealplan(mealplanId);
    }

   
}


    

