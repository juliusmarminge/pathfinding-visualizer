import React from "react";
import { Node } from "./Node";

export const Symbols: React.FC = () => {
  const defaultNode = {
    row: 0,
    col: 0,
    isStart: false,
    isTarget: false,
    isWall: false,
    isVisited: false,
    isShortestPath: false,
  };

  const classNames = "flex items-center p-4 gap-2";
  return (
    <div className="flex justify-around">
      <div className={classNames}>
        <Node node={{ ...defaultNode, isStart: true }} />
        <p>Start Node</p>
      </div>
      <div className={classNames}>
        <Node node={{ ...defaultNode, isTarget: true }} />
        <p>Target Node</p>
      </div>
      <div className={classNames}>
        <Node node={{ ...defaultNode, isWall: true }} />
        <p>Wall Node</p>
      </div>
      <div className={classNames}>
        <Node node={{ ...defaultNode, isShortestPath: true }} />
        <p>Shortest Path</p>
      </div>
      <div className={classNames}>
        <Node node={{ ...defaultNode, isVisited: true }} />
        <p>Visited Nodes</p>
      </div>
    </div>
  );
};
