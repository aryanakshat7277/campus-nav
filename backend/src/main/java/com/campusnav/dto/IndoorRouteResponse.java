package com.campusnav.dto;

import java.util.List;

public class IndoorRouteResponse {
    private String destination;
    private String building;
    private int floor;
    private int distanceMeters;
    private int estimatedSeconds;
    private boolean accessible;
    private List<IndoorDirectionStep> steps;

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }
    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }
    public int getDistanceMeters() { return distanceMeters; }
    public void setDistanceMeters(int distanceMeters) { this.distanceMeters = distanceMeters; }
    public int getEstimatedSeconds() { return estimatedSeconds; }
    public void setEstimatedSeconds(int estimatedSeconds) { this.estimatedSeconds = estimatedSeconds; }
    public boolean isAccessible() { return accessible; }
    public void setAccessible(boolean accessible) { this.accessible = accessible; }
    public List<IndoorDirectionStep> getSteps() { return steps; }
    public void setSteps(List<IndoorDirectionStep> steps) { this.steps = steps; }
}
