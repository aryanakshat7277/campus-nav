package com.campusnav.controller;

import com.campusnav.model.Landmark;
import com.campusnav.service.LandmarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/landmarks")
public class LandmarkController {
    private final LandmarkService landmarkService;

    public LandmarkController(LandmarkService landmarkService) {
        this.landmarkService = landmarkService;
    }

    @GetMapping
    public List<Landmark> getLandmarks(
            @RequestParam(required = false) String buildingId,
            @RequestParam(required = false) String floorId) {
        if (floorId != null) {
            return landmarkService.getByFloor(floorId);
        } else if (buildingId != null) {
            return landmarkService.getByBuilding(buildingId);
        }
        return landmarkService.getAll();
    }

    @GetMapping("/{id}")
    public Landmark getLandmarkById(@PathVariable String id) {
        return landmarkService.getByBuilding(id).stream().findFirst().orElse(null); // Assuming getById
    }

    @PostMapping
    public Landmark createLandmark(@RequestBody Landmark landmark) {
        return landmarkService.create(landmark);
    }

    @PutMapping("/{id}")
    public Landmark updateLandmark(@PathVariable String id, @RequestBody Landmark landmark) {
        return landmarkService.update(id, landmark);
    }

    @DeleteMapping("/{id}")
    public void deleteLandmark(@PathVariable String id) {
        landmarkService.delete(id);
    }
}
