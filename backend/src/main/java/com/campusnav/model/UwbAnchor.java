package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "uwb_anchors")
public class UwbAnchor {
    @Id
    private String id;
    private String anchorIdentifier;
    private String buildingId;
    private String floorId;
    @jakarta.persistence.Column(name = "local_x")
    private Double localX;
    @jakarta.persistence.Column(name = "local_y")
    private Double localY;
    private Double latitude;
    private Double longitude;
    private String calibrationData;
    private String status = "active";

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAnchorIdentifier() { return anchorIdentifier; }
    public void setAnchorIdentifier(String anchorIdentifier) { this.anchorIdentifier = anchorIdentifier; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public String getFloorId() { return floorId; }
    public void setFloorId(String floorId) { this.floorId = floorId; }
    public Double getLocalX() { return localX; }
    public void setLocalX(Double localX) { this.localX = localX; }
    public Double getLocalY() { return localY; }
    public void setLocalY(Double localY) { this.localY = localY; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public String getCalibrationData() { return calibrationData; }
    public void setCalibrationData(String calibrationData) { this.calibrationData = calibrationData; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
