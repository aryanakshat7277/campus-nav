package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "campus_closures")
public class CampusClosure {
    @Id
    private String id;
    private String edgeId;
    private String nodeId;
    private String reason;
    private String closureType;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String alternativeRouteNote;
    private Boolean isActive = true;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEdgeId() { return edgeId; }
    public void setEdgeId(String edgeId) { this.edgeId = edgeId; }
    public String getNodeId() { return nodeId; }
    public void setNodeId(String nodeId) { this.nodeId = nodeId; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public String getClosureType() { return closureType; }
    public void setClosureType(String closureType) { this.closureType = closureType; }
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    public String getAlternativeRouteNote() { return alternativeRouteNote; }
    public void setAlternativeRouteNote(String alternativeRouteNote) { this.alternativeRouteNote = alternativeRouteNote; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
