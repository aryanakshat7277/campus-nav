package com.campusnav.dto;

public class IndoorRouteRequest {
    private String fromNodeId;
    private String toNodeId;
    private boolean accessible;
    private boolean avoidStairs;
    private boolean preferElevators;
    private String routePreference;

    public String getFromNodeId() { return fromNodeId; }
    public void setFromNodeId(String fromNodeId) { this.fromNodeId = fromNodeId; }
    public String getToNodeId() { return toNodeId; }
    public void setToNodeId(String toNodeId) { this.toNodeId = toNodeId; }
    public boolean isAccessible() { return accessible; }
    public void setAccessible(boolean accessible) { this.accessible = accessible; }
    public boolean isAvoidStairs() { return avoidStairs; }
    public void setAvoidStairs(boolean avoidStairs) { this.avoidStairs = avoidStairs; }
    public boolean isPreferElevators() { return preferElevators; }
    public void setPreferElevators(boolean preferElevators) { this.preferElevators = preferElevators; }
    public String getRoutePreference() { return routePreference; }
    public void setRoutePreference(String routePreference) { this.routePreference = routePreference; }
}
