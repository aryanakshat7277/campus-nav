package com.campusnav.controller;

import com.campusnav.dto.QrResolveRequest;
import com.campusnav.dto.QrResolveResponse;
import com.campusnav.model.NavigationQr;
import com.campusnav.service.QrService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qr")
public class QrController {
    private final QrService qrService;

    public QrController(QrService qrService) {
        this.qrService = qrService;
    }

    @GetMapping
    public List<NavigationQr> getQrs(@RequestParam(required = false) String buildingId) {
        if (buildingId != null) {
            return qrService.getByBuilding(buildingId);
        }
        return qrService.getAllQrs();
    }

    @PostMapping
    public NavigationQr createQr(@RequestBody NavigationQr qr) {
        return qrService.create(qr);
    }

    @PostMapping("/resolve")
    public QrResolveResponse resolveQr(@RequestBody QrResolveRequest request) {
        return qrService.resolve(request.getQrCode());
    }

    @DeleteMapping("/{id}")
    public void deleteQr(@PathVariable String id) {
        qrService.delete(id);
    }
}
