import type { NodeObject } from "../components/PathfindingVisualizer";
import { config } from "./config";

export const createNode = (row: number, col: number): NodeObject => {
  const defaultNode: NodeObject = {
    row,
    col,
    isStart: false,
    isTarget: false,
    isWall: false,
    isVisited: false,
    isShortestPath: false,
  };
  if (row === config.startPos[0] && col === config.startPos[1]) {
    return { ...defaultNode, isStart: true };
  }
  if (row === config.targetPos[0] && col === config.targetPos[1]) {
    return { ...defaultNode, isTarget: true };
  }
  return defaultNode;
};

export const generateGrid = () => {
  const { gridSize } = config;

  const grid: NodeObject[][] = [];
  for (let row = 0; row < gridSize; row++) {
    const currentRow: NodeObject[] = [];
    for (let col = 0; col < gridSize; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const clearWalls = (grid: NodeObject[][]) => {
  let newGrid = [...grid];
  newGrid.forEach((row) => {
    row.forEach((node) => {
      node.isWall = false;
    });
  });
  return newGrid;
};

export const resetVisited = (grid: NodeObject[][]) => {
  let newGrid = [...grid];
  newGrid.forEach((row) => {
    row.forEach((node) => {
      node.isVisited = false;
      node.isShortestPath = false;
    });
  });
  return newGrid;
};

export const updateWalls = (
  oldGrid: NodeObject[][],
  newPos: [number, number]
) => {
  const newNode = {
    ...oldGrid[newPos[0]][newPos[1]],
    isWall: true,
  };

  const newGrid = [...oldGrid];
  newGrid[newPos[0]][newPos[1]] = newNode;
  return newGrid;
};

export const updateStartTarget = (
  oldGrid: NodeObject[][],
  oldPos: [number, number],
  newPos: [number, number],
  type: "isStart" | "isTarget"
) => {
  const newNode = {
    ...oldGrid[newPos[0]][newPos[1]],
    [type]: true,
  };
  const oldNode = {
    ...oldGrid[oldPos[0]][oldPos[1]],
    [type]: false,
  };
  const newGrid = [...oldGrid];
  newGrid[newPos[0]][newPos[1]] = newNode;
  newGrid[oldPos[0]][oldPos[1]] = oldNode;
  return newGrid;
};
