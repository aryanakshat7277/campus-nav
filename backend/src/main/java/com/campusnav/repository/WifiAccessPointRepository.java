package com.campusnav.repository;

import com.campusnav.model.WifiAccessPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WifiAccessPointRepository extends JpaRepository<WifiAccessPoint, String> {
    List<WifiAccessPoint> findByBuildingId(String buildingId);
    List<WifiAccessPoint> findByFloorId(String floorId);
}
