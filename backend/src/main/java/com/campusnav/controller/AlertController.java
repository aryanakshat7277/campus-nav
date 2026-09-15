package com.campusnav.controller;

import com.campusnav.model.Alert;
import com.campusnav.model.Report;
import com.campusnav.service.AlertService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    public List<Alert> getActiveAlerts() {
        return alertService.getActiveAlerts();
    }

    @PostMapping
    public Alert createAlert(@RequestBody Alert alert) {
        return alertService.createAlert(alert);
    }

    @PostMapping("/reports")
    public Report submitReport(@RequestBody Report report) {
        return alertService.createReport(report);
    }
}
