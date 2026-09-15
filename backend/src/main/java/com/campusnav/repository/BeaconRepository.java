package com.campusnav.repository;

import com.campusnav.model.Beacon;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BeaconRepository extends JpaRepository<Beacon, String> {
    List<Beacon> findByBuildingId(String buildingId);
    List<Beacon> findByFloorId(String floorId);
    List<Beacon> findByStatus(String status);
    Optional<Beacon> findByBeaconUuidAndMajorAndMinor(String beaconUuid, Integer major, Integer minor);
}
