import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Node } from "./Node";
import { Symbols } from "./Symbols";

import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";
import {
  generateGrid,
  clearWalls,
  resetVisited,
  updateWalls,
  updateStartTarget,
} from "../utils/grid-utils";

export type NodeObject = {
  row: number;
  col: number;
  isStart: boolean;
  isTarget: boolean;
  isWall: boolean;
  isVisited: boolean;
  isShortestPath: boolean;
};

export const App = () => {
  const [grid, setGrid] = useState(() => generateGrid());
  const [start, setStart] = useState(config.startPos);
  const [target, setTarget] = useState(config.targetPos);

  const [isShifted, setIsShifted] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startNodeSelected, setStartNodeSelected] = useState(false);
  const [targetNodeSelected, setTargetNodeSelected] = useState(false);

  const [speed, setSpeed] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noShortestPath, setNoShortestPath] = useState(false);

  const startVisualization = (algorithm: Algorithm) => {
    setGrid((prev) => resetVisited(prev));
    setNoShortestPath(false);
    const startNode = grid[start[0]][start[1]];
    const targetNode = grid[target[0]][target[1]];
    const [path, visitsInOrder] = algorithm(grid, startNode, targetNode);
    startAnimating(visitsInOrder, path);
  };

  const startAnimating = (visitsInOrder: NodeObject[], path: NodeObject[]) => {
    if (path.length === 0) {
      setNoShortestPath(true);
      return;
    }
    visitsInOrder.forEach((node, i) => {
      if (i === visitsInOrder.length - 1) {
        setTimeout(() => animatePath(path), speed * i);
        return;
      }
      setTimeout(() => {
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[node.row][node.col] = {
            ...node,
            isVisited: true,
          };
          return newGrid;
        });
      }, speed * i);
    });
  };

  const animatePath = (path: NodeObject[]) => {
    path.forEach((node, i) => {
      setTimeout(() => {
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[node.row][node.col] = {
            ...node,
            isShortestPath: true,
          };
          return newGrid;
        });
      }, speed * i);
    });
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    const node = grid[row][col];
    if (node.isStart) {
      resetVisited(grid);
      setStartNodeSelected(true);
      setTargetNodeSelected(false);
    } else if (node.isTarget) {
      resetVisited(grid);
      setStartNodeSelected(false);
      setTargetNodeSelected(true);
    } else {
      setStartNodeSelected(false);
      setTargetNodeSelected(false);
      setGrid((prev) => updateWalls(prev, [row, col], isShifted));
    }
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isMouseDown) return;
    if (startNodeSelected) {
      setGrid((prev) => updateStartTarget(prev, start, [row, col], "isStart"));
      setStart([row, col]);
    } else if (targetNodeSelected) {
      setGrid((prev) =>
        updateStartTarget(prev, target, [row, col], "isTarget")
      );
      setTarget([row, col]);
    } else {
      setGrid((prev) => updateWalls(prev, [row, col], isShifted));
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setStartNodeSelected(false);
    setTargetNodeSelected(false);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsShifted(true);
    }
  };

  const handleKeyup = () => {
    setIsShifted(false);
  };

  React.useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return (
    <div>
      <Navbar
        startVisualization={startVisualization}
        isAnimating={isAnimating}
        speed={speed}
        setSpeed={setSpeed}
        clearWalls={() => setGrid((prev) => clearWalls(prev))}
      />
      <div className="flex flex-col items-center height=[90vh]">
        <Symbols />
        <p>
          Click and Drag to place walls. Selecting start- or targetnode will
          move that node. Hold shift to remove walls.
        </p>
        {noShortestPath && (
          <p className="text-red-400">
            No available path between start- and targetnode.
          </p>
        )}
      </div>
      {/** GRID */}
      <div className="flex justify-center mt-8">
        <div className="select-none flex flex-col">
          {grid.map((row, rowIndex) => {
            return (
              <div className="flex" key={`row${rowIndex}`}>
                {row.map((node, colIndex) => {
                  return (
                    <Node
                      key={`r${rowIndex}c${colIndex}`}
                      node={node}
                      onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                      onMouseDown={() => handleMouseDown(node.row, node.col)}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
