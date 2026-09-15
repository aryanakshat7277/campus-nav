package com.campusnav.controller;

import com.campusnav.model.Beacon;
import com.campusnav.service.BeaconService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beacons")
public class BeaconController {
    private final BeaconService beaconService;

    public BeaconController(BeaconService beaconService) {
        this.beaconService = beaconService;
    }

    @GetMapping
    public List<Beacon> getBeacons(
            @RequestParam(required = false) String buildingId,
            @RequestParam(required = false) String floorId) {
        if (floorId != null) {
            return beaconService.getByFloor(floorId);
        } else if (buildingId != null) {
            return beaconService.getByBuilding(buildingId);
        }
        return beaconService.getAllBeacons();
    }

    @GetMapping("/{id}")
    public Beacon getBeaconById(@PathVariable String id) {
        return beaconService.getById(id);
    }

    @PostMapping
    public Beacon createBeacon(@RequestBody Beacon beacon) {
        return beaconService.create(beacon);
    }

    @PutMapping("/{id}")
    public Beacon updateBeacon(@PathVariable String id, @RequestBody Beacon beacon) {
        return beaconService.update(id, beacon);
    }

    @DeleteMapping("/{id}")
    public void deleteBeacon(@PathVariable String id) {
        beaconService.delete(id);
    }
}
