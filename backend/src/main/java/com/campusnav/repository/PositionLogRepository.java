package com.campusnav.repository;

import com.campusnav.model.PositionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PositionLogRepository extends JpaRepository<PositionLog, String> {
    List<PositionLog> findBySessionId(String sessionId);
}
