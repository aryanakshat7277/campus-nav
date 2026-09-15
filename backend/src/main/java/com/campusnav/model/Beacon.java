package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "beacons")
public class Beacon {
    @Id
    private String id;
    private String beaconUuid;
    private Integer major;
    private Integer minor;
    private String buildingId;
    private String floorId;
    private String nodeId;
    @jakarta.persistence.Column(name = "local_x")
    private Double localX;
    @jakarta.persistence.Column(name = "local_y")
    private Double localY;
    private Double latitude;
    private Double longitude;
    private Double installationHeight;
    private Integer signalCalibration;
    private String status = "active";
    private LocalDateTime lastSeen;
    private LocalDateTime createdAt = LocalDateTime.now();

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getBeaconUuid() { return beaconUuid; }
    public void setBeaconUuid(String beaconUuid) { this.beaconUuid = beaconUuid; }
    public Integer getMajor() { return major; }
    public void setMajor(Integer major) { this.major = major; }
    public Integer getMinor() { return minor; }
    public void setMinor(Integer minor) { this.minor = minor; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public String getFloorId() { return floorId; }
    public void setFloorId(String floorId) { this.floorId = floorId; }
    public String getNodeId() { return nodeId; }
    public void setNodeId(String nodeId) { this.nodeId = nodeId; }
    public Double getLocalX() { return localX; }
    public void setLocalX(Double localX) { this.localX = localX; }
    public Double getLocalY() { return localY; }
    public void setLocalY(Double localY) { this.localY = localY; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Double getInstallationHeight() { return installationHeight; }
    public void setInstallationHeight(Double installationHeight) { this.installationHeight = installationHeight; }
    public Integer getSignalCalibration() { return signalCalibration; }
    public void setSignalCalibration(Integer signalCalibration) { this.signalCalibration = signalCalibration; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLastSeen() { return lastSeen; }
    public void setLastSeen(LocalDateTime lastSeen) { this.lastSeen = lastSeen; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
