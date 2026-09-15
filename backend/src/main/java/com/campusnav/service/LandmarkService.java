package com.campusnav.service;

import com.campusnav.model.Landmark;
import com.campusnav.repository.LandmarkRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LandmarkService {
    private final LandmarkRepository landmarkRepository;

    public LandmarkService(LandmarkRepository landmarkRepository) {
        this.landmarkRepository = landmarkRepository;
    }

    public List<Landmark> getAll() {
        return landmarkRepository.findAll();
    }

    public List<Landmark> getByBuilding(String buildingId) {
        return landmarkRepository.findByBuildingId(buildingId);
    }

    public List<Landmark> getByFloor(String floorId) {
        return landmarkRepository.findByFloorId(floorId);
    }

    public List<Landmark> getNearNode(String nodeId) {
        return landmarkRepository.findByNodeId(nodeId);
    }

    public Landmark create(Landmark landmark) {
        return landmarkRepository.save(landmark);
    }

    public Landmark update(String id, Landmark landmark) {
        if (landmarkRepository.existsById(id)) {
            landmark.setId(id);
            return landmarkRepository.save(landmark);
        }
        return null;
    }

    public void delete(String id) {
        landmarkRepository.deleteById(id);
    }
}
