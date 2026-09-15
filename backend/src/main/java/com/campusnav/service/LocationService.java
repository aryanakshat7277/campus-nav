package com.campusnav.service;

import com.campusnav.model.Location;
import com.campusnav.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getByCategory(String category) {
        return locationRepository.findByCategory(category);
    }

    public Location getById(String id) {
        return locationRepository.findById(id).orElse(null);
    }

    public Location create(Location location) {
        return locationRepository.save(location);
    }

    public Location update(String id, Location location) {
        if (locationRepository.existsById(id)) {
            location.setId(id);
            return locationRepository.save(location);
        }
        return null;
    }

    public void delete(String id) {
        locationRepository.deleteById(id);
    }
}
