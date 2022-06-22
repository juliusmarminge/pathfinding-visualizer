import { type NodeObject } from "../../components/PathfindingVisualizer";
import { type Algorithm } from ".";

export const aStar: Algorithm = (
  grid: NodeObject[][],
  startNode: NodeObject,
  targetNode: NodeObject
) => {
  let openSet = new Set<NodeObject>();
  openSet.add(startNode);

  let closedSet = new Set<NodeObject>();

  let cameFrom = new Map<NodeObject, NodeObject>();
  let visitsInOrder: NodeObject[] = [];

  let gScore = new Map<NodeObject, number>();
  gScore.set(startNode, 0);

  let fScore = new Map<NodeObject, number>();
  fScore.set(
    startNode,
    Math.sqrt(
      (startNode.col - targetNode.col) ** 2 +
        (startNode.row - targetNode.row) ** 2
    )
  );

  while (openSet.size) {
    // Find node with lowest fCost to start with
    const currentNode = findCheapestFScore(openSet, fScore);

    if (
      currentNode.col === targetNode.col &&
      currentNode.row === targetNode.row
    ) {
      // visitsInOrder is returned alongside the path for visualization purposes.
      return [reconstructPath(cameFrom, currentNode), visitsInOrder];
    }

    openSet.delete(currentNode);
    visitsInOrder.push(currentNode);
    closedSet.add(currentNode);

    const neighbors = establishNeighbors(grid, currentNode);
    for (const neighbor of neighbors) {
      const neighborX = neighbor.col;
      const neighborY = neighbor.row;
      // If a node is wall or it has already been evaluated we skip it.
      if (grid[neighborY][neighborX].isWall || closedSet.has(neighbor)) {
        continue;
      }

      const neighborH = Math.sqrt(
        (neighborX - targetNode.col) ** 2 + (neighborY - targetNode.row) ** 2
      );
      const tentativeScore = gScore.get(currentNode)! + 1;
      const neighborTentativeScore = gScore.get(neighbor) || Infinity;
      if (tentativeScore < neighborTentativeScore || !openSet.has(neighbor)) {
        // Update node if it has better path through current node than before.
        cameFrom.set(neighbor, currentNode);
        gScore.set(neighbor, tentativeScore);
        fScore.set(neighbor, gScore.get(neighbor)! + neighborH);
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }

  return [[], []];
};

const findCheapestFScore = (
  openSet: Set<NodeObject>,
  fScore: Map<NodeObject, number>
) => {
  let [currentNode] = openSet;
  for (const node of openSet) {
    if (fScore.get(node)! < fScore.get(currentNode)!) {
      currentNode = node;
    }
  }
  return currentNode;
};

const establishNeighbors = (grid: NodeObject[][], currentNode: NodeObject) => {
  let neighbors = [];
  const row = currentNode.row;
  const col = currentNode.col;
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  // Checks if node is along the edge before it generates each neighbor-node.
  if (col !== 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (row !== 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (col !== gridWidth - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  if (row !== gridHeight - 1) {
    neighbors.push(grid[row + 1][col]);
  }

  return neighbors;
};

const reconstructPath = (
  cameFrom: Map<NodeObject, NodeObject>,
  currentNode: NodeObject
) => {
  const totalPath = [currentNode];

  const keys = new Set(cameFrom.keys());

  while (keys.has(currentNode)) {
    // Backtrack using map with previous nodes to get path
    currentNode = cameFrom.get(currentNode)!;
    totalPath.unshift(currentNode);
  }
  return totalPath;
};
