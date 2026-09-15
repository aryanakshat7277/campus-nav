package com.campusnav.controller;

import com.campusnav.dto.IndoorRouteRequest;
import com.campusnav.dto.IndoorRouteResponse;
import com.campusnav.model.CampusClosure;
import com.campusnav.model.NavigationEdge;
import com.campusnav.model.NavigationNode;
import com.campusnav.repository.NavigationEdgeRepository;
import com.campusnav.repository.NavigationNodeRepository;
import com.campusnav.service.ClosureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/navigation/indoor")
public class IndoorNavigationController {
    private final NavigationNodeRepository nodeRepository;
    private final NavigationEdgeRepository edgeRepository;
    private final ClosureService closureService;

    public IndoorNavigationController(NavigationNodeRepository nodeRepository,
                                      NavigationEdgeRepository edgeRepository,
                                      ClosureService closureService) {
        this.nodeRepository = nodeRepository;
        this.edgeRepository = edgeRepository;
        this.closureService = closureService;
    }

    @GetMapping("/nodes")
    public List<NavigationNode> getNodes(
            @RequestParam(required = false) String buildingId,
            @RequestParam(required = false) String floorId) {
        if (floorId != null) {
            return nodeRepository.findByFloorId(floorId);
        } else if (buildingId != null) {
            return nodeRepository.findByBuildingId(buildingId);
        }
        return nodeRepository.findAll();
    }

    @GetMapping("/nodes/{id}")
    public NavigationNode getNodeById(@PathVariable String id) {
        return nodeRepository.findById(id).orElse(null);
    }

    @PostMapping("/nodes")
    public NavigationNode createNode(@RequestBody NavigationNode node) {
        return nodeRepository.save(node);
    }

    @PutMapping("/nodes/{id}")
    public NavigationNode updateNode(@PathVariable String id, @RequestBody NavigationNode node) {
        if (nodeRepository.existsById(id)) {
            node.setId(id);
            return nodeRepository.save(node);
        }
        return null;
    }

    @GetMapping("/edges")
    public List<NavigationEdge> getEdges() {
        return edgeRepository.findAll();
    }

    @PostMapping("/edges")
    public NavigationEdge createEdge(@RequestBody NavigationEdge edge) {
        return edgeRepository.save(edge);
    }

    @PutMapping("/edges/{id}")
    public NavigationEdge updateEdge(@PathVariable String id, @RequestBody NavigationEdge edge) {
        if (edgeRepository.existsById(id)) {
            edge.setId(id);
            return edgeRepository.save(edge);
        }
        return null;
    }

    @DeleteMapping("/edges/{id}")
    public void deleteEdge(@PathVariable String id) {
        edgeRepository.deleteById(id);
    }

    @PostMapping("/route")
    public IndoorRouteResponse getRoute(@RequestBody IndoorRouteRequest request) {
        IndoorRouteResponse response = new IndoorRouteResponse();
        response.setAccessible(request.isAccessible());
        
        NavigationNode toNode = nodeRepository.findById(request.getToNodeId()).orElse(null);
        if (toNode != null) {
            response.setDestination(toNode.getName());
            response.setBuilding(toNode.getBuildingId());
            response.setFloor(toNode.getFloor() != null ? toNode.getFloor() : 0);
        }
        
        // Detailed implementation would call pathfindingService.
        return response;
    }

    @GetMapping("/closures")
    public List<CampusClosure> getActiveClosures() {
        return closureService.getActiveClosures();
    }

    @PostMapping("/closures")
    public CampusClosure createClosure(@RequestBody CampusClosure closure) {
        return closureService.create(closure);
    }

    @PutMapping("/closures/{id}/deactivate")
    public void deactivateClosure(@PathVariable String id) {
        closureService.deactivate(id);
    }
}
