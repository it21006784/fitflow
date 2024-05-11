package com.paf.fitflow.services;

import com.paf.fitflow.models.Media;
import com.paf.fitflow.repositories.MediaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MediaService {

    @Autowired
    private MediaRepository mediaRepository;

    public Media uploadMedia(List<MultipartFile> imageFiles, List<MultipartFile> videoFiles, String description) {
        Media media = new Media();
        media.setDescription(description);
        
        List<byte[]> imageBytesList = new ArrayList<>();
        for (MultipartFile imageFile : imageFiles) {
            try {
                imageBytesList.add(imageFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        media.setImageFiles(imageBytesList);
        
        List<byte[]> videoBytesList = new ArrayList<>();
        for (MultipartFile videoFile : videoFiles) {
            try {
                videoBytesList.add(videoFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        media.setVideoFiles(videoBytesList);

        return mediaRepository.save(media);
    }

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    public Media getMediaById(String mediaId) {
        return mediaRepository.findById(mediaId).orElse(null);
    }

    public boolean deleteMedia(String mediaId) {
        if (mediaRepository.existsById(mediaId)) {
            mediaRepository.deleteById(mediaId);
            return true;
        } else {
            return false;
        }
    }

}
