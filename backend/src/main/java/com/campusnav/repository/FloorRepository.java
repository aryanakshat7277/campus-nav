package com.campusnav.repository;

import com.campusnav.model.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FloorRepository extends JpaRepository<Floor, String> {
    List<Floor> findByBuildingId(String buildingId);
    List<Floor> findByBuildingIdOrderByFloorNumber(String buildingId);
}
