package com.campusnav.repository;

import com.campusnav.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, String> {
    List<Alert> findByIsActiveTrue();
}
