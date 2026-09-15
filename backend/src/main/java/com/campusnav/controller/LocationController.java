package com.campusnav.controller;

import com.campusnav.model.Location;
import com.campusnav.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public List<Location> getAllLocations(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty()) {
            return locationService.getByCategory(category);
        }
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable String id) {
        return locationService.getById(id);
    }

    @PostMapping
    public Location createLocation(@RequestBody Location location) {
        return locationService.create(location);
    }

    @PutMapping("/{id}")
    public Location updateLocation(@PathVariable String id, @RequestBody Location location) {
        return locationService.update(id, location);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable String id) {
        locationService.delete(id);
    }
}
