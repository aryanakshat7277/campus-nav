package com.campusnav.dto;

public class DirectionStep {
    private String instruction;
    private int distance;

    public DirectionStep() {}

    public DirectionStep(String instruction, int distance) {
        this.instruction = instruction;
        this.distance = distance;
    }

    public String getInstruction() { return instruction; }
    public void setInstruction(String instruction) { this.instruction = instruction; }
    public int getDistance() { return distance; }
    public void setDistance(int distance) { this.distance = distance; }
}
