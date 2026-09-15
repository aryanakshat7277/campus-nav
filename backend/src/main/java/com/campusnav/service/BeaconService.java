package com.campusnav.service;

import com.campusnav.model.Beacon;
import com.campusnav.repository.BeaconRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BeaconService {
    private final BeaconRepository beaconRepository;

    public BeaconService(BeaconRepository beaconRepository) {
        this.beaconRepository = beaconRepository;
    }

    public List<Beacon> getAllBeacons() {
        return beaconRepository.findAll();
    }

    public List<Beacon> getByBuilding(String buildingId) {
        return beaconRepository.findByBuildingId(buildingId);
    }

    public List<Beacon> getByFloor(String floorId) {
        return beaconRepository.findByFloorId(floorId);
    }

    public Beacon getById(String id) {
        return beaconRepository.findById(id).orElse(null);
    }

    public Beacon create(Beacon beacon) {
        return beaconRepository.save(beacon);
    }

    public Beacon update(String id, Beacon beacon) {
        if (beaconRepository.existsById(id)) {
            beacon.setId(id);
            return beaconRepository.save(beacon);
        }
        return null;
    }

    public void delete(String id) {
        beaconRepository.deleteById(id);
    }

    public Beacon findByIdentifiers(String beaconUuid, Integer major, Integer minor) {
        return beaconRepository.findByBeaconUuidAndMajorAndMinor(beaconUuid, major, minor).orElse(null);
    }
}
