package com.campusnav.repository;

import com.campusnav.model.NavigationNode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NavigationNodeRepository extends JpaRepository<NavigationNode, String> {
    List<NavigationNode> findByBuildingId(String buildingId);
    List<NavigationNode> findByFloorId(String floorId);
    List<NavigationNode> findByNodeType(String nodeType);
    List<NavigationNode> findByIsIndoor(Boolean isIndoor);
}
