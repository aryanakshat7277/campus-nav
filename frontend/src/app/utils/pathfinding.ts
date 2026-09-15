import { CampusGraph, GraphNode } from '../models/graph.model';
import { haversine } from './haversine';
import { WALKING_SPEED } from './constants';

class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];
  
  enqueue(element: T, priority: number) {
    this.items.push({ element, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  
  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export function findPath(graph: CampusGraph, startId: string, endId: string, accessibleOnly: boolean): { pathNodeIds: string[], distance: number, estimatedTime: string } | null {
  const nodes = new Map<string, GraphNode>();
  graph.nodes.forEach(n => nodes.set(n.id, n));
  
  const endNode = nodes.get(endId);
  if (!endNode || !nodes.has(startId)) return null;

  const adjacencyList = new Map<string, { target: string, distance: number, accessible: boolean }[]>();
  graph.nodes.forEach(n => adjacencyList.set(n.id, []));
  
  graph.edges.forEach(e => {
    if (accessibleOnly && !e.accessible) return;
    adjacencyList.get(e.source)?.push({ target: e.target, distance: e.distance, accessible: e.accessible });
    adjacencyList.get(e.target)?.push({ target: e.source, distance: e.distance, accessible: e.accessible }); // undirected
  });

  const distances = new Map<string, number>();
  const previous = new Map<string, string>();
  const pq = new PriorityQueue<string>();
  
  graph.nodes.forEach(n => distances.set(n.id, Infinity));
  distances.set(startId, 0);
  pq.enqueue(startId, 0);
  
  while (!pq.isEmpty()) {
    const currentId = pq.dequeue()!;
    if (currentId === endId) break;
    
    const currentNode = nodes.get(currentId)!;
    const neighbors = adjacencyList.get(currentId) || [];
    
    for (const neighbor of neighbors) {
      const neighborNode = nodes.get(neighbor.target)!;
      const h = haversine(currentNode.lat, currentNode.lng, neighborNode.lat, neighborNode.lng);
      const alt = distances.get(currentId)! + neighbor.distance;
      
      if (alt < distances.get(neighbor.target)!) {
        distances.set(neighbor.target, alt);
        previous.set(neighbor.target, currentId);
        pq.enqueue(neighbor.target, alt + h);
      }
    }
  }
  
  const path: string[] = [];
  let curr: string | undefined = endId;
  if (distances.get(endId) === Infinity) return null;
  
  while (curr) {
    path.unshift(curr);
    curr = previous.get(curr);
  }
  
  const totalDist = distances.get(endId)!;
  const timeSecs = totalDist / WALKING_SPEED;
  const mins = Math.ceil(timeSecs / 60);
  
  return { pathNodeIds: path, distance: totalDist, estimatedTime: `${mins} min` };
}
