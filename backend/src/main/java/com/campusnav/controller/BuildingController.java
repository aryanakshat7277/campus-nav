package com.campusnav.controller;

import com.campusnav.model.Building;
import com.campusnav.model.Floor;
import com.campusnav.model.Room;
import com.campusnav.service.BuildingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
public class BuildingController {
    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return buildingService.getAllBuildings();
    }

    @GetMapping("/{id}")
    public Building getBuildingById(@PathVariable String id) {
        return buildingService.getBuildingById(id);
    }

    @GetMapping("/{id}/floors")
    public List<Floor> getFloorsForBuilding(@PathVariable String id) {
        return buildingService.getFloorsByBuilding(id);
    }

    @PostMapping
    public Building createBuilding(@RequestBody Building building) {
        return buildingService.createBuilding(building);
    }

    @PutMapping("/{id}")
    public Building updateBuilding(@PathVariable String id, @RequestBody Building building) {
        return buildingService.updateBuilding(id, building);
    }

    @DeleteMapping("/{id}")
    public void deleteBuilding(@PathVariable String id) {
        buildingService.deleteBuilding(id);
    }

    @GetMapping("/floors/{floorId}/rooms")
    public List<Room> getRoomsOnFloor(@PathVariable String floorId) {
        return buildingService.getRoomsByFloor(floorId);
    }

    @PostMapping("/floors")
    public Floor createFloor(@RequestBody Floor floor) {
        return buildingService.createFloor(floor);
    }

    @PostMapping("/rooms")
    public Room createRoom(@RequestBody Room room) {
        return buildingService.createRoom(room);
    }
}
