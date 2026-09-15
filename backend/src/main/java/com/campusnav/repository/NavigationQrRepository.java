package com.campusnav.repository;

import com.campusnav.model.NavigationQr;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NavigationQrRepository extends JpaRepository<NavigationQr, String> {
    Optional<NavigationQr> findByQrCode(String qrCode);
    List<NavigationQr> findByBuildingId(String buildingId);
    List<NavigationQr> findByIsActiveTrue();
}
