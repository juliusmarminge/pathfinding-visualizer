import React from "react";
import type { NodeObject } from "./PathfindingVisualizer";

export const Node: React.FC<{
  node: NodeObject;
  onMouseEnter?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}> = ({ node, onMouseEnter, onMouseDown }) => {
  let classNames = "w-10 aspect-square border-2 border-zinc-700 transition ";
  if (node.isStart) {
    classNames += "bg-lime-600 duration-75";
  } else if (node.isTarget) {
    classNames += "bg-red-500 duration-75";
  } else if (node.isWall) {
    classNames += "bg-zinc-200 duration-300";
  } else if (node.isShortestPath) {
    classNames += "bg-primary duration-500";
  } else if (node.isVisited) {
    classNames += "bg-amber-200 duration-500";
  }

  if (!onMouseEnter || !onMouseDown) {
    return <div className={classNames} />;
  }

  return (
    <div
      className={classNames}
      onMouseEnter={() => onMouseEnter!()}
      onMouseDown={(e: React.MouseEvent) => onMouseDown!(e)}
    />
  );
};
