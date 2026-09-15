export interface GraphNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  floor: string;
  type: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  distance: number;
  type: string;
  accessible: boolean;
  outdoor: boolean;
}

export interface CampusGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
