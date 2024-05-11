package com.paf.fitflow.controllers;

import com.paf.fitflow.models.Media;
import com.paf.fitflow.services.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "http://localhost:3000/")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @PostMapping("/upload")
    public ResponseEntity<Media> uploadMedia(@RequestParam("imageFiles") List<MultipartFile> imageFiles,
                                             @RequestParam("videoFiles") List<MultipartFile> videoFiles,
                                             @RequestParam("description") String description) {
        Media uploadedMedia = mediaService.uploadMedia(imageFiles, videoFiles, description);
        return new ResponseEntity<>(uploadedMedia, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Media>> getAllMedia() {
        List<Media> allMedia = mediaService.getAllMedia();
        if (!allMedia.isEmpty()) {
            return new ResponseEntity<>(allMedia, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }


    @GetMapping("/{mediaId}")
    public ResponseEntity<Media> getMediaById(@PathVariable String mediaId) {
        Media media = mediaService.getMediaById(mediaId);
        if (media != null) {
            return new ResponseEntity<>(media, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{mediaId}")
    public ResponseEntity<Void> deleteMedia(@PathVariable String mediaId) {
        boolean deleted = mediaService.deleteMedia(mediaId);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    

}

