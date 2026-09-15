package com.campusnav.repository;

import com.campusnav.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BuildingRepository extends JpaRepository<Building, String> {
    List<Building> findByStatus(String status);
}
