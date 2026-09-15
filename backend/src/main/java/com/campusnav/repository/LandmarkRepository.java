package com.campusnav.repository;

import com.campusnav.model.Landmark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LandmarkRepository extends JpaRepository<Landmark, String> {
    List<Landmark> findByBuildingId(String buildingId);
    List<Landmark> findByFloorId(String floorId);
    List<Landmark> findByNodeId(String nodeId);
    List<Landmark> findByCategory(String category);
}
