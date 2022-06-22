import { NodeObject } from "../../components/PathfindingVisualizer";

export * from "./astar";
export * from "./dijkstra";

export type Algorithm = (
  grid: NodeObject[][],
  startNode: NodeObject,
  targetNode: NodeObject
) => [NodeObject[], NodeObject[]];
