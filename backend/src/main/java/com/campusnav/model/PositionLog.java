package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "position_logs")
public class PositionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String sessionId;
    private LocalDateTime timestamp;
    private String estimatedBuildingId;
    private String estimatedFloorId;
    private String estimatedNodeId;
    @jakarta.persistence.Column(name = "local_x")
    private Double localX;
    @jakarta.persistence.Column(name = "local_y")
    private Double localY;
    private Double confidence;
    private String bleSignals;
    private String wifiSignals;
    private Double sensorHeading;
    private String positionSource;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public String getEstimatedBuildingId() { return estimatedBuildingId; }
    public void setEstimatedBuildingId(String estimatedBuildingId) { this.estimatedBuildingId = estimatedBuildingId; }
    public String getEstimatedFloorId() { return estimatedFloorId; }
    public void setEstimatedFloorId(String estimatedFloorId) { this.estimatedFloorId = estimatedFloorId; }
    public String getEstimatedNodeId() { return estimatedNodeId; }
    public void setEstimatedNodeId(String estimatedNodeId) { this.estimatedNodeId = estimatedNodeId; }
    public Double getLocalX() { return localX; }
    public void setLocalX(Double localX) { this.localX = localX; }
    public Double getLocalY() { return localY; }
    public void setLocalY(Double localY) { this.localY = localY; }
    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }
    public String getBleSignals() { return bleSignals; }
    public void setBleSignals(String bleSignals) { this.bleSignals = bleSignals; }
    public String getWifiSignals() { return wifiSignals; }
    public void setWifiSignals(String wifiSignals) { this.wifiSignals = wifiSignals; }
    public Double getSensorHeading() { return sensorHeading; }
    public void setSensorHeading(Double sensorHeading) { this.sensorHeading = sensorHeading; }
    public String getPositionSource() { return positionSource; }
    public void setPositionSource(String positionSource) { this.positionSource = positionSource; }
}
