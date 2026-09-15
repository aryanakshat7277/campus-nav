package com.campusnav.repository;

import com.campusnav.model.NavigationEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NavigationEdgeRepository extends JpaRepository<NavigationEdge, String> {
    List<NavigationEdge> findBySourceNodeId(String sourceNodeId);
    List<NavigationEdge> findByTargetNodeId(String targetNodeId);
    List<NavigationEdge> findByIsBlockedTrue();
}
