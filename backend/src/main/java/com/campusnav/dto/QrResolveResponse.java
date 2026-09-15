package com.campusnav.dto;

public class QrResolveResponse {
    private boolean valid;
    private String buildingId;
    private String buildingName;
    private String floorId;
    private int floorNumber;
    private String nodeId;
    private String nodeName;
    private double localX;
    private double localY;
    private double latitude;
    private double longitude;

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }
    public String getBuildingId() { return buildingId; }
    public void setBuildingId(String buildingId) { this.buildingId = buildingId; }
    public String getBuildingName() { return buildingName; }
    public void setBuildingName(String buildingName) { this.buildingName = buildingName; }
    public String getFloorId() { return floorId; }
    public void setFloorId(String floorId) { this.floorId = floorId; }
    public int getFloorNumber() { return floorNumber; }
    public void setFloorNumber(int floorNumber) { this.floorNumber = floorNumber; }
    public String getNodeId() { return nodeId; }
    public void setNodeId(String nodeId) { this.nodeId = nodeId; }
    public String getNodeName() { return nodeName; }
    public void setNodeName(String nodeName) { this.nodeName = nodeName; }
    public double getLocalX() { return localX; }
    public void setLocalX(double localX) { this.localX = localX; }
    public double getLocalY() { return localY; }
    public void setLocalY(double localY) { this.localY = localY; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}
