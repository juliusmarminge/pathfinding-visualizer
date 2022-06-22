import React from "react";
import type { NodeObject } from "./PathfindingVisualizer";

export const Node: React.FC<{
  node: NodeObject;
  onMouseEnter?: () => void;
  onMouseDown?: () => void;
}> = ({ node, onMouseEnter, onMouseDown }) => {
  let classNames = "w-6 aspect-square border-2 border-primary/50 ";
  if (node.isStart) {
    classNames += "bg-success";
  } else if (node.isTarget) {
    classNames += "bg-error";
  } else if (node.isWall) {
    classNames += "bg-gray-700";
  } else if (node.isShortestPath) {
    classNames += "bg-green-500";
  } else if (node.isVisited) {
    classNames += "bg-gray-300";
  }

  if (!onMouseEnter || !onMouseDown) {
    return <div className={classNames} />;
  }

  return (
    <div
      className={classNames}
      onMouseEnter={() => onMouseEnter!()}
      onMouseDown={() => onMouseDown!()}
    />
  );
};
