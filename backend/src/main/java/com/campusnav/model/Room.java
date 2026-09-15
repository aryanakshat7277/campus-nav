package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    private String id;
    private String floorId;
    private String buildingId;
    private String roomNumber;
    private String name;
    private String category;
    private String description;
    @jakarta.persistence.Column(name = "local_x")
    private Double localX;
    @jakarta.persistence.Column(name = "local_y")
    private Double localY;
    private Double latitude;
    private Double longitude;
    private Boolean isAccessible;
    private Integer capacity;
    private String openingHours;
    private String status = "active";

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFloorId() { return floorId; }
    public void setFloorId(String floorId) { this.floorId = floorId; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getLocalX() { return localX; }
    public void setLocalX(Double localX) { this.localX = localX; }
    public Double getLocalY() { return localY; }
    public void setLocalY(Double localY) { this.localY = localY; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Boolean getIsAccessible() { return isAccessible; }
    public void setIsAccessible(Boolean isAccessible) { this.isAccessible = isAccessible; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
