import { aStar, dijkstra } from "./algorithms";

export const config = {
  gridSize: 20,
  startPos: [10, 5] as [number, number],
  targetPos: [5, 15] as [number, number],
  algorithms: [
    { displayName: "A Star", algorithm: aStar },
    { displayName: "Dijkstra", algorithm: dijkstra },
  ],
};
