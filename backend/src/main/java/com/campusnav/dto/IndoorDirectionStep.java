package com.campusnav.dto;

public class IndoorDirectionStep {
    private String type;
    private String instruction;
    private int distanceMeters;
    private String landmark;
    private int floor;
    private Integer fromFloor;
    private Integer toFloor;

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }
    public int getDistanceMeters() { return distanceMeters; }
    public void setDistanceMeters(int distanceMeters) { this.distanceMeters = distanceMeters; }
    public String getLandmark() { return landmark; }
    public void setLandmark(String landmark) { this.landmark = landmark; }
    public int getFloor() { return floor; }
    public void setFloor(int floor) { this.floor = floor; }
    public Integer getFromFloor() { return fromFloor; }
    public void setFromFloor(Integer fromFloor) { this.fromFloor = fromFloor; }
    public Integer getToFloor() { return toFloor; }
    public void setToFloor(Integer toFloor) { this.toFloor = toFloor; }
}
