package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "navigation_nodes")
public class NavigationNode {
    @Id
    private String id;
    private String buildingId;
    private String floorId;
    private String name;
    private String nodeType;
    @jakarta.persistence.Column(name = "local_x")
    private Double localX;
    @jakarta.persistence.Column(name = "local_y")
    private Double localY;
    private Double latitude;
    private Double longitude;
    private Integer floor;
    private Boolean isAccessible;
    private Boolean isIndoor;
    private String metadata;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public String getFloorId() { return floorId; }
    public void setFloorId(String floorId) { this.floorId = floorId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNodeType() { return nodeType; }
    public void setNodeType(String nodeType) { this.nodeType = nodeType; }
    public Double getLocalX() { return localX; }
    public void setLocalX(Double localX) { this.localX = localX; }
    public Double getLocalY() { return localY; }
    public void setLocalY(Double localY) { this.localY = localY; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Integer getFloor() { return floor; }
    public void setFloor(Integer floor) { this.floor = floor; }
    public Boolean getIsAccessible() { return isAccessible; }
    public void setIsAccessible(Boolean isAccessible) { this.isAccessible = isAccessible; }
    public Boolean getIsIndoor() { return isIndoor; }
    public void setIsIndoor(Boolean isIndoor) { this.isIndoor = isIndoor; }
    public String getMetadata() { return metadata; }
    public void setMetadata(String metadata) { this.metadata = metadata; }
}
