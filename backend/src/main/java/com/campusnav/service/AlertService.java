package com.campusnav.service;

import com.campusnav.model.Alert;
import com.campusnav.model.Report;
import com.campusnav.repository.AlertRepository;
import com.campusnav.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final AlertRepository alertRepository;
    private final ReportRepository reportRepository;

    public AlertService(AlertRepository alertRepository, ReportRepository reportRepository) {
        this.alertRepository = alertRepository;
        this.reportRepository = reportRepository;
    }

    public List<Alert> getActiveAlerts() {
        return alertRepository.findByIsActiveTrue();
    }

    public Alert createAlert(Alert alert) {
        return alertRepository.save(alert);
    }

    public Report createReport(Report report) {
        report.setStatus("PENDING");
        return reportRepository.save(report);
    }
}
