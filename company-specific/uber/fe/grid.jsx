import { useState, useRef } from "react";

const GRID_SIZE = 3;
const CENTER = [[1, 1]];
const MAX_CELLS = GRID_SIZE * GRID_SIZE - CENTER.length;

const getInitialGridState = () => {
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  for (const [row, col] of CENTER) {
    grid[row][col] = -1;
  }

  return grid;
};

const getStateClassName = (cell) => (cell === -1 ? "hidden" : cell === 1 ? "on" : "off");
export default function App() {
  const [grid, setGrid] = useState(getInitialGridState);
  const [isPopping, setPopping] = useState(false);
  const stackRef = useRef([]);
  const updateGrid = (row, col) => {
    setGrid((prevGrid) => {
      const nextGrid = prevGrid.map((r) => [...r]);
      nextGrid[row][col] = 0;
      return nextGrid;
    });
  };

  const handlePop = () => {
    if (stackRef.current.length === 0) {
      setPopping(false);
      return;
    }

    const [row, col] = stackRef.current.pop();
    updateGrid(row, col);

    setTimeout(handlePop, 300);
  };

  const handleClick = (row, col) => {
    if (grid[row][col] === 1 || isPopping) return;
    updateGrid(row, col);

    stackRef.current.push([row, col]);

    if (stackRef.current.length === MAX_CELLS) {
      setPopping(true);
      setTimeout(handlePop, 300);
    }
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <span
              key={`${rowIndex}-${colIndex}`}
              className={`cell ${getStateClassName(cell)}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
