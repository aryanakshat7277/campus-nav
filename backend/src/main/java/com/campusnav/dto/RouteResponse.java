package com.campusnav.dto;

import java.util.List;

public class RouteResponse {
    private int distance;
    private String estimatedTime;
    private boolean isAccessible;
    private List<double[]> path;
    private List<DirectionStep> directions;

    public int getDistance() { return distance; }
    public void setDistance(int distance) { this.distance = distance; }
    public String getEstimatedTime() { return estimatedTime; }
    public void setEstimatedTime(String estimatedTime) { this.estimatedTime = estimatedTime; }
    public boolean getIsAccessible() { return isAccessible; }
    public void setIsAccessible(boolean isAccessible) { this.isAccessible = isAccessible; }
    public List<double[]> getPath() { return path; }
    public void setPath(List<double[]> path) { this.path = path; }
    public List<DirectionStep> getDirections() { return directions; }
    public void setDirections(List<DirectionStep> directions) { this.directions = directions; }
}
