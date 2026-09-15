package com.campusnav.repository;

import com.campusnav.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LocationRepository extends JpaRepository<Location, String> {
    List<Location> findByCategory(String category);
    List<Location> findByNameContainingIgnoreCaseOrTagsContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String tags, String description);
}
