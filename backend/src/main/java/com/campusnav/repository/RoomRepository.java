package com.campusnav.repository;

import com.campusnav.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByFloorId(String floorId);
    List<Room> findByBuildingId(String buildingId);
    List<Room> findByRoomNumberContainingIgnoreCase(String roomNumber);
}
