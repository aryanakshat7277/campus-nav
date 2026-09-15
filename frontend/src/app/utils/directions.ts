import { CampusGraph, GraphNode } from '../models/graph.model';
import { DirectionStep } from '../models/route.model';

function getBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
            Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
  const brng = Math.atan2(y, x) * 180 / Math.PI;
  return (brng + 360) % 360;
}

export function generateDirections(pathNodeIds: string[], graph: CampusGraph): DirectionStep[] {
  if (pathNodeIds.length < 2) return [];
  
  const nodes = new Map<string, GraphNode>();
  graph.nodes.forEach(n => nodes.set(n.id, n));
  
  const steps: DirectionStep[] = [];
  
  for (let i = 0; i < pathNodeIds.length - 1; i++) {
    const curr = nodes.get(pathNodeIds[i])!;
    const next = nodes.get(pathNodeIds[i+1])!;
    
    // find edge distance
    const edge = graph.edges.find(e => (e.source === curr.id && e.target === next.id) || (e.target === curr.id && e.source === next.id));
    const dist = edge ? edge.distance : 0;
    
    if (curr.floor !== next.floor) {
       steps.push({ instruction: `Take the elevator/stairs to Floor ${next.floor}`, distance: dist });
       continue;
    }
    
    if (i === 0) {
      steps.push({ instruction: `Head towards ${next.name}`, distance: dist });
    } else {
      const prev = nodes.get(pathNodeIds[i-1])!;
      const bearing1 = getBearing(prev.lat, prev.lng, curr.lat, curr.lng);
      const bearing2 = getBearing(curr.lat, curr.lng, next.lat, next.lng);
      const turn = bearing2 - bearing1;
      let turnInstruction = 'Walk straight';
      if (turn > 20 && turn < 160) turnInstruction = 'Turn right';
      else if (turn < -20 && turn > -160) turnInstruction = 'Turn left';
      
      if (curr.type === 'door') turnInstruction = 'Enter building';
      if (curr.type === 'corridor') turnInstruction = 'Walk along the corridor';
      
      steps.push({ instruction: turnInstruction + ` towards ${next.name}`, distance: dist });
    }
  }
  
  steps.push({ instruction: `Arrive at destination`, distance: 0 });
  return steps;
}
