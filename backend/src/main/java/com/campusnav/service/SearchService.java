package com.campusnav.service;

import com.campusnav.model.Location;
import com.campusnav.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final LocationRepository locationRepository;

    public SearchService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> search(String query, String category) {
        List<Location> results;
        if (query == null || query.trim().isEmpty()) {
            if (category != null && !category.trim().isEmpty()) {
                results = locationRepository.findByCategory(category);
            } else {
                results = locationRepository.findAll();
            }
        } else {
            results = locationRepository.findByNameContainingIgnoreCaseOrTagsContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query, query);
            if (category != null && !category.trim().isEmpty()) {
                results.removeIf(loc -> !category.equalsIgnoreCase(loc.getCategory()));
            }
        }
        return results;
    }
}
