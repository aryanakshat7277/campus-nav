package com.campusnav.controller;

import com.campusnav.dto.RouteRequest;
import com.campusnav.dto.RouteResponse;
import com.campusnav.service.PathfindingService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    private final PathfindingService pathfindingService;

    public NavigationController(PathfindingService pathfindingService) {
        this.pathfindingService = pathfindingService;
    }

    @PostMapping("/route")
    public RouteResponse getRoute(@RequestBody RouteRequest request) {
        return pathfindingService.findPath(request.getFromNodeId(), request.getToNodeId(), request.isAccessible());
    }

    @GetMapping("/graph")
    public Map<String, Object> getGraph() {
        return pathfindingService.getRawGraph();
    }
}
