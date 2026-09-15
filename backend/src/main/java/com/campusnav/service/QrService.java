package com.campusnav.service;

import com.campusnav.dto.QrResolveResponse;
import com.campusnav.model.Building;
import com.campusnav.model.Floor;
import com.campusnav.model.NavigationNode;
import com.campusnav.model.NavigationQr;
import com.campusnav.repository.BuildingRepository;
import com.campusnav.repository.FloorRepository;
import com.campusnav.repository.NavigationNodeRepository;
import com.campusnav.repository.NavigationQrRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QrService {
    private final NavigationQrRepository qrRepository;
    private final NavigationNodeRepository nodeRepository;
    private final BuildingRepository buildingRepository;
    private final FloorRepository floorRepository;

    public QrService(NavigationQrRepository qrRepository, NavigationNodeRepository nodeRepository,
                     BuildingRepository buildingRepository, FloorRepository floorRepository) {
        this.qrRepository = qrRepository;
        this.nodeRepository = nodeRepository;
        this.buildingRepository = buildingRepository;
        this.floorRepository = floorRepository;
    }

    public List<NavigationQr> getAllQrs() {
        return qrRepository.findAll();
    }

    public List<NavigationQr> getByBuilding(String buildingId) {
        return qrRepository.findByBuildingId(buildingId);
    }

    public NavigationQr create(NavigationQr qr) {
        if (qr.getQrCode() == null || qr.getQrCode().isEmpty()) {
            qr.setQrCode(UUID.randomUUID().toString());
        }
        return qrRepository.save(qr);
    }

    public QrResolveResponse resolve(String qrCode) {
        QrResolveResponse response = new QrResolveResponse();
        Optional<NavigationQr> qrOpt = qrRepository.findByQrCode(qrCode);
        
        if (qrOpt.isPresent() && qrOpt.get().getIsActive()) {
            NavigationQr qr = qrOpt.get();
            response.setValid(true);
            response.setBuildingId(qr.getBuildingId());
            response.setFloorId(qr.getFloorId());
            response.setNodeId(qr.getNodeId());
            response.setLocalX(qr.getLocalX());
            response.setLocalY(qr.getLocalY());
            response.setLatitude(qr.getLatitude());
            response.setLongitude(qr.getLongitude());
            
            buildingRepository.findById(qr.getBuildingId())
                    .ifPresent(b -> response.setBuildingName(b.getName()));
                    
            floorRepository.findById(qr.getFloorId())
                    .ifPresent(f -> response.setFloorNumber(f.getFloorNumber()));
                    
            nodeRepository.findById(qr.getNodeId())
                    .ifPresent(n -> response.setNodeName(n.getName()));
        } else {
            response.setValid(false);
        }
        
        return response;
    }

    public void delete(String id) {
        qrRepository.deleteById(id);
    }
}
