import React, { useState, Dispatch, SetStateAction } from "react";
import { config } from "../utils/config";
import type { Algorithm } from "../utils/algorithms";

const { algorithms } = config;

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const Navbar: React.FC<{
  startVisualization: (algorithm: Algorithm) => void;
  isAnimating: boolean;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
  clearWalls: () => void;
}> = ({ startVisualization, isAnimating, speed, setSpeed, clearWalls }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  const selectAlgorithm = (name: string) => {
    const entry = algorithms.find((alg) => alg.displayName === name);
    if (entry) setSelectedAlgorithm(entry);
  };

  const visualize = () => {
    const { algorithm } = selectedAlgorithm;
    startVisualization(algorithm);
  };

  return (
    <div className="navbar bg-base-300">
      <div className="w-4/5 mx-auto flex gap-16 justify-evenly">
        {/** ALGORITHM SELECTOR */}
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 w-max btn-primary">
            {selectedAlgorithm.displayName || "Select Algorithm"}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52"
          >
            {algorithms.map((algorithm, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => selectAlgorithm(algorithm.displayName)}
                >
                  <a>{algorithm.displayName}</a>
                </li>
              );
            })}
          </ul>
        </div>

        {/** SPEED SLIDER */}
        <div className="form-control flex-1">
          <label className="label" htmlFor="animation-speed-slider">
            <span className="label-text">Animation Delay</span>
          </label>
          <input
            name="animation-speed-slider"
            className="range range-xs range-primary direction-rtl"
            type="range"
            min={1}
            max={100}
            value={speed}
            onChange={(e) => setSpeed(e.target.valueAsNumber)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-primary gap-1"
            onClick={() => clearWalls()}
            disabled={isAnimating}
          >
            <TrashIcon />
            Reset Walls
          </button>
          <button
            className="btn btn-primary gap-1"
            onClick={() => visualize()}
            disabled={isAnimating}
          >
            <PlayIcon />
            Visualize!
          </button>
        </div>
      </div>
    </div>
  );
};
