package com.campusnav.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "accessibility_profiles")
public class AccessibilityProfile {
    @Id
    private String id;
    private String name;
    private Boolean avoidStairs = false;
    private Boolean preferElevators = false;
    private Boolean preferRamps = false;
    private Boolean wheelchairRequired = false;
    private Double maxGradient;
    private Double extraTimeFactor = 1.0;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Boolean getAvoidStairs() { return avoidStairs; }
    public void setAvoidStairs(Boolean avoidStairs) { this.avoidStairs = avoidStairs; }
    public Boolean getPreferElevators() { return preferElevators; }
    public void setPreferElevators(Boolean preferElevators) { this.preferElevators = preferElevators; }
    public Boolean getPreferRamps() { return preferRamps; }
    public void setPreferRamps(Boolean preferRamps) { this.preferRamps = preferRamps; }
    public Boolean getWheelchairRequired() { return wheelchairRequired; }
    public void setWheelchairRequired(Boolean wheelchairRequired) { this.wheelchairRequired = wheelchairRequired; }
    public Double getMaxGradient() { return maxGradient; }
    public void setMaxGradient(Double maxGradient) { this.maxGradient = maxGradient; }
    public Double getExtraTimeFactor() { return extraTimeFactor; }
    public void setExtraTimeFactor(Double extraTimeFactor) { this.extraTimeFactor = extraTimeFactor; }
}
