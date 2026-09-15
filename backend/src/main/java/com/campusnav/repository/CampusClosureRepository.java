package com.campusnav.repository;

import com.campusnav.model.CampusClosure;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CampusClosureRepository extends JpaRepository<CampusClosure, String> {
    List<CampusClosure> findByIsActiveTrue();
    List<CampusClosure> findByEdgeId(String edgeId);
    List<CampusClosure> findByNodeId(String nodeId);
}
