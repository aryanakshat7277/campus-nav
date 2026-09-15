export interface DirectionStep {
  instruction: string;
  distance: number;
}

export interface RouteResponse {
  distance: number;
  estimatedTime: string;
  isAccessible: boolean;
  path: number[][];
  directions: DirectionStep[];
}
