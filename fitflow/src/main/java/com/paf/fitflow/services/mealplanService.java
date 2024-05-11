package com.paf.fitflow.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf.fitflow.models.mealplan;
import com.paf.fitflow.repositories.mealplanRepository;


@Service
public class mealplanService {

    @Autowired
    private mealplanRepository repository;

    //add mealplan
    public mealplan addMealplan(mealplan status) {
        return repository.save(status);
    }

    //get all mealplan
    public List<mealplan> getAllMealplans() {
        return repository.findAll();
    }
    
    //get mealplan by id
      public mealplan getmealplan(String mealplanId) {
        return repository.findById(mealplanId).get();
    }
    //    // Get meal plans by category
    //    public List<mealplan> getMealplan(String category) {
    //     return repository.findByCategory(category);
    // }
    // Get meal plans by category
      public List<mealplan> getMealPlansByCategory(String category) {
        return repository.findByCategory(category);
}



//  //update mealplans by id
  public mealplan editmealplan(mealplan mealplanRequest){
    //get the existing from the DB
     //populate new values from request to existing document
     mealplan existingMealplan = repository.findById(mealplanRequest.getMealplanId()).get();
    existingMealplan.setRecipes(mealplanRequest.getRecipes());
    existingMealplan.setNutritionalInformation(mealplanRequest.getNutritionalInformation());
    existingMealplan.setPortionSizes(mealplanRequest.getPortionSizes());
    

    return repository.save(existingMealplan);
 }
    // Update meal plans by category
    public List<mealplan> editMealPlansByCategory(String category, mealplan mealplanRequest) {
        List<mealplan> mealPlansToUpdate = repository.findByCategory(category);
        
        for (mealplan mp : mealPlansToUpdate) {
            mp.setRecipes(mealplanRequest.getRecipes());
            mp.setNutritionalInformation(mealplanRequest.getNutritionalInformation());
            mp.setPortionSizes(mealplanRequest.getPortionSizes());
            repository.save(mp);
        }
        
        return mealPlansToUpdate;
    }


//delete mealplan by id
public String deletemealplan(String mealplanId){
    repository.deleteById(mealplanId);
    return mealplanId+"mealplan delete from feed";

}


}



