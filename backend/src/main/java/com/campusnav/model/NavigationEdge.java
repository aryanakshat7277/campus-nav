package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "navigation_edges")
public class NavigationEdge {
    @Id
    private String id;
    private String sourceNodeId;
    private String targetNodeId;
    private Double distance;
    private Double walkingTime;
    private String edgeType;
    private Boolean isAccessible;
    private Boolean stairsRequired = false;
    private Boolean elevatorRequired = false;
    private Boolean isRestricted = false;
    private Boolean isBlocked = false;
    private String blockReason;
    private Boolean bidirectional = true;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getSourceNodeId() { return sourceNodeId; }
    public void setSourceNodeId(String sourceNodeId) { this.sourceNodeId = sourceNodeId; }
    public String getTargetNodeId() { return targetNodeId; }
    public void setTargetNodeId(String targetNodeId) { this.targetNodeId = targetNodeId; }
    public Double getDistance() { return distance; }
    public void setDistance(Double distance) { this.distance = distance; }
    public Double getWalkingTime() { return walkingTime; }
    public void setWalkingTime(Double walkingTime) { this.walkingTime = walkingTime; }
    public String getEdgeType() { return edgeType; }
    public void setEdgeType(String edgeType) { this.edgeType = edgeType; }
    public Boolean getIsAccessible() { return isAccessible; }
    public void setIsAccessible(Boolean isAccessible) { this.isAccessible = isAccessible; }
    public Boolean getStairsRequired() { return stairsRequired; }
    public void setStairsRequired(Boolean stairsRequired) { this.stairsRequired = stairsRequired; }
    public Boolean getElevatorRequired() { return elevatorRequired; }
    public void setElevatorRequired(Boolean elevatorRequired) { this.elevatorRequired = elevatorRequired; }
    public Boolean getIsRestricted() { return isRestricted; }
    public void setIsRestricted(Boolean isRestricted) { this.isRestricted = isRestricted; }
    public Boolean getIsBlocked() { return isBlocked; }
    public void setIsBlocked(Boolean isBlocked) { this.isBlocked = isBlocked; }
    public String getBlockReason() { return blockReason; }
    public void setBlockReason(String blockReason) { this.blockReason = blockReason; }
    public Boolean getBidirectional() { return bidirectional; }
    public void setBidirectional(Boolean bidirectional) { this.bidirectional = bidirectional; }
}
