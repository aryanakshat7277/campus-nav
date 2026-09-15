package com.campusnav.service;

import com.campusnav.model.Building;
import com.campusnav.model.Floor;
import com.campusnav.model.Room;
import com.campusnav.repository.BuildingRepository;
import com.campusnav.repository.FloorRepository;
import com.campusnav.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {
    private final BuildingRepository buildingRepository;
    private final FloorRepository floorRepository;
    private final RoomRepository roomRepository;

    public BuildingService(BuildingRepository buildingRepository, FloorRepository floorRepository, RoomRepository roomRepository) {
        this.buildingRepository = buildingRepository;
        this.floorRepository = floorRepository;
        this.roomRepository = roomRepository;
    }

    public List<Building> getAllBuildings() {
        return buildingRepository.findAll();
    }

    public Building getBuildingById(String id) {
        return buildingRepository.findById(id).orElse(null);
    }

    public List<Floor> getFloorsByBuilding(String buildingId) {
        return floorRepository.findByBuildingIdOrderByFloorNumber(buildingId);
    }

    public List<Room> getRoomsByFloor(String floorId) {
        return roomRepository.findByFloorId(floorId);
    }

    public Building createBuilding(Building building) {
        return buildingRepository.save(building);
    }

    public Floor createFloor(Floor floor) {
        return floorRepository.save(floor);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Building updateBuilding(String id, Building building) {
        if (buildingRepository.existsById(id)) {
            building.setId(id);
            return buildingRepository.save(building);
        }
        return null;
    }

    public void deleteBuilding(String id) {
        buildingRepository.deleteById(id);
    }
}
