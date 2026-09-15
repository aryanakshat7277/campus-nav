package com.campusnav.repository;

import com.campusnav.model.AccessibilityProfile;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AccessibilityProfileRepository extends JpaRepository<AccessibilityProfile, String> {
}
