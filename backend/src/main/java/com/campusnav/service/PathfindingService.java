package com.campusnav.service;

import com.campusnav.dto.DirectionStep;
import com.campusnav.dto.RouteResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;

@Service
public class PathfindingService {

    private Map<String, GraphNode> nodes = new HashMap<>();
    private Map<String, List<GraphEdge>> adjacencyList = new HashMap<>();
    private Map<String, Object> rawGraphMap;

    @PostConstruct
    @SuppressWarnings("unchecked")
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = new ClassPathResource("data/campus_graph.json").getInputStream();
            Map<String, Object> graphData = mapper.readValue(is, new TypeReference<Map<String, Object>>() {});
            rawGraphMap = graphData;

            List<Map<String, Object>> nodesList = (List<Map<String, Object>>) graphData.get("nodes");
            for (Map<String, Object> nodeMap : nodesList) {
                GraphNode node = new GraphNode(
                        (String) nodeMap.get("id"),
                        (String) nodeMap.get("name"),
                        ((Number) nodeMap.get("lat")).doubleValue(),
                        ((Number) nodeMap.get("lng")).doubleValue(),
                        ((Number) nodeMap.get("floor")).intValue(),
                        (String) nodeMap.get("type")
                );
                nodes.put(node.id, node);
                adjacencyList.put(node.id, new ArrayList<>());
            }

            List<Map<String, Object>> edgesList = (List<Map<String, Object>>) graphData.get("edges");
            for (Map<String, Object> edgeMap : edgesList) {
                String source = (String) edgeMap.get("source");
                String target = (String) edgeMap.get("target");
                int distance = ((Number) edgeMap.get("distance")).intValue();
                String type = (String) edgeMap.get("type");
                boolean accessible = (Boolean) edgeMap.get("accessible");
                boolean outdoor = (Boolean) edgeMap.get("outdoor");

                GraphEdge edge1 = new GraphEdge(source, target, distance, type, accessible, outdoor);
                GraphEdge edge2 = new GraphEdge(target, source, distance, type, accessible, outdoor);

                adjacencyList.get(source).add(edge1);
                adjacencyList.get(target).add(edge2);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getRawGraph() {
        return rawGraphMap;
    }

    public double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // convert to meters
    }

    public RouteResponse findPath(String startNodeId, String endNodeId, boolean requireAccessible) {
        if (!nodes.containsKey(startNodeId) || !nodes.containsKey(endNodeId)) {
            return null;
        }

        Map<String, Double> gScores = new HashMap<>();
        Map<String, Double> fScores = new HashMap<>();
        Map<String, String> cameFrom = new HashMap<>();
        Map<String, GraphEdge> cameFromEdge = new HashMap<>();
        PriorityQueue<String> openSet = new PriorityQueue<>(Comparator.comparingDouble(n -> fScores.getOrDefault(n, Double.MAX_VALUE)));

        for (String id : nodes.keySet()) {
            gScores.put(id, Double.MAX_VALUE);
            fScores.put(id, Double.MAX_VALUE);
        }

        gScores.put(startNodeId, 0.0);
        GraphNode startNode = nodes.get(startNodeId);
        GraphNode endNode = nodes.get(endNodeId);
        fScores.put(startNodeId, haversine(startNode.lat, startNode.lng, endNode.lat, endNode.lng));
        openSet.add(startNodeId);

        while (!openSet.isEmpty()) {
            String current = openSet.poll();

            if (current.equals(endNodeId)) {
                return buildRouteResponse(cameFrom, cameFromEdge, current, startNodeId, requireAccessible);
            }

            for (GraphEdge edge : adjacencyList.get(current)) {
                if (requireAccessible && !edge.accessible) {
                    continue;
                }

                double tentativeGScore = gScores.get(current) + edge.distance;
                if (tentativeGScore < gScores.get(edge.target)) {
                    cameFrom.put(edge.target, current);
                    cameFromEdge.put(edge.target, edge);
                    gScores.put(edge.target, tentativeGScore);
                    GraphNode neighborNode = nodes.get(edge.target);
                    fScores.put(edge.target, tentativeGScore + haversine(neighborNode.lat, neighborNode.lng, endNode.lat, endNode.lng));
                    
                    if (!openSet.contains(edge.target)) {
                        openSet.add(edge.target);
                    } else {
                        openSet.remove(edge.target);
                        openSet.add(edge.target);
                    }
                }
            }
        }
        return null;
    }

    private RouteResponse buildRouteResponse(Map<String, String> cameFrom, Map<String, GraphEdge> cameFromEdge, String current, String startNodeId, boolean accessible) {
        List<String> pathNodes = new ArrayList<>();
        List<GraphEdge> pathEdges = new ArrayList<>();
        pathNodes.add(current);

        while (cameFrom.containsKey(current)) {
            GraphEdge edge = cameFromEdge.get(current);
            pathEdges.add(0, edge);
            current = cameFrom.get(current);
            pathNodes.add(0, current);
        }

        List<double[]> pathCoords = new ArrayList<>();
        int totalDistance = 0;
        for (String nodeId : pathNodes) {
            GraphNode n = nodes.get(nodeId);
            pathCoords.add(new double[]{n.lat, n.lng});
        }
        for (GraphEdge e : pathEdges) {
            totalDistance += e.distance;
        }

        int minutes = (int) Math.ceil(totalDistance / 1.4 / 60.0);
        String estTime = minutes + " min";

        List<DirectionStep> directions = generateDirections(pathEdges, pathNodes);

        RouteResponse resp = new RouteResponse();
        resp.setDistance(totalDistance);
        resp.setEstimatedTime(estTime);
        resp.setIsAccessible(accessible);
        resp.setPath(pathCoords);
        resp.setDirections(directions);
        return resp;
    }

    private List<DirectionStep> generateDirections(List<GraphEdge> edges, List<String> nodesList) {
        List<DirectionStep> steps = new ArrayList<>();
        if (edges.isEmpty()) return steps;

        for (int i = 0; i < edges.size(); i++) {
            GraphEdge edge = edges.get(i);
            String targetNodeId = edge.target;
            GraphNode targetNode = nodes.get(targetNodeId);

            String instruction = "Walk along the " + edge.type;
            if (edge.type.equals("stairs")) {
                instruction = "Take the stairs to floor " + targetNode.floor;
            } else if (edge.type.equals("elevator")) {
                instruction = "Take the elevator to floor " + targetNode.floor;
            } else if (edge.type.equals("ramp")) {
                instruction = "Use the ramp towards " + targetNode.name;
            } else if (targetNode.type.equals("building") || targetNode.type.equals("entrance")) {
                instruction = "Head towards " + targetNode.name;
            } else {
                instruction = "Proceed to " + targetNode.name;
            }

            steps.add(new DirectionStep(instruction, edge.distance));
        }
        return steps;
    }

    private static class GraphNode {
        String id;
        String name;
        double lat;
        double lng;
        int floor;
        String type;

        public GraphNode(String id, String name, double lat, double lng, int floor, String type) {
            this.id = id;
            this.name = name;
            this.lat = lat;
            this.lng = lng;
            this.floor = floor;
            this.type = type;
        }
    }

    private static class GraphEdge {
        @SuppressWarnings("unused")
        String source;
        String target;
        int distance;
        String type;
        boolean accessible;
        boolean outdoor;

        public GraphEdge(String source, String target, int distance, String type, boolean accessible, boolean outdoor) {
            this.source = source;
            this.target = target;
            this.distance = distance;
            this.type = type;
            this.accessible = accessible;
            this.outdoor = outdoor;
        }
    }
}
