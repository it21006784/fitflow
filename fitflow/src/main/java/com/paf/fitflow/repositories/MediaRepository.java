package com.paf.fitflow.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.paf.fitflow.models.Media;

public interface MediaRepository extends MongoRepository<Media, String /*data type of the phrymary key */ > {
    List<Media> findByUserId(String userId);

}
