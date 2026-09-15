package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "floors")
public class Floor {
    @Id
    private String id;
    private String buildingId;
    private Integer floorNumber;
    private String name;
    private String floorPlanUrl;
    private Double heightMeters;
    private Boolean isAccessible;
    private String status = "active";

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public Integer getFloorNumber() { return floorNumber; }
    public void setFloorNumber(Integer floorNumber) { this.floorNumber = floorNumber; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getFloorPlanUrl() { return floorPlanUrl; }
    public void setFloorPlanUrl(String floorPlanUrl) { this.floorPlanUrl = floorPlanUrl; }
    public Double getHeightMeters() { return heightMeters; }
    public void setHeightMeters(Double heightMeters) { this.heightMeters = heightMeters; }
    public Boolean getIsAccessible() { return isAccessible; }
    public void setIsAccessible(Boolean isAccessible) { this.isAccessible = isAccessible; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
