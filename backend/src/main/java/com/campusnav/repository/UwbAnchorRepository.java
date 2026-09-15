package com.campusnav.repository;

import com.campusnav.model.UwbAnchor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UwbAnchorRepository extends JpaRepository<UwbAnchor, String> {
    List<UwbAnchor> findByBuildingId(String buildingId);
    List<UwbAnchor> findByFloorId(String floorId);
}
