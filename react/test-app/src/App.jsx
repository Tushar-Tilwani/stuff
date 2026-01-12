import React, { useState } from "react";
import "./App.css";

import { useRef } from "react";
import Prompt from "./Prompt.jsx";
import { useCallback } from "react";
import { useEffect } from "react";

const SIZE = 10;
const GRID = Array.from({ length: SIZE }, () => new Array(SIZE).fill(0));

const getRandomCell = () => [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];

function compareCell(cell1, cell2) {
  return cell1[0] === cell2[0] && cell1[1] === cell2[1];
}

function Cell({ destCell, currentUserCell, actualCell }) {
  const isDest = compareCell(destCell, actualCell);
  const isUserSelectd = compareCell(currentUserCell, actualCell);
  const class1 = isDest ? "destActive" : "";
  const class2 = isUserSelectd ? "userActive" : "";
  return <span className={`${class1} ${class2} cell`} />;
}

function Row({ row, destCell, currentUserCell, rowIndex }) {
  return (
    <div className="row">
      {row.map((_, colIndex) => (
        <Cell
          key={[rowIndex, colIndex].join()}
          destCell={destCell}
          currentUserCell={currentUserCell}
          actualCell={[rowIndex, colIndex]}
        />
      ))}
    </div>
  );
}

export default function App() {
  const destCellRef = useRef(getRandomCell());
  const [currentUserCell, setCurrentUserCell] = useState(getRandomCell());
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (compareCell(currentUserCell, destCell)) {
      setScore((score) => score + 1);
      destCellRef.current = getRandomCell();
      return;
    }
  }, [currentUserCell]);

  const handleKeyPress = useCallback(
    (e) => {
      e.stopPropagation();
      switch (e.code) {
        case "ArrowUp": {
          setCurrentUserCell(([row, col]) => {
            return [Math.max(row - 1, 0), col];
          });
          return;
        }
        case "ArrowDown": {
          setCurrentUserCell(([row, col]) => {
            return [Math.min(row + 1, SIZE - 1), col];
          });
          return;
        }

        case "ArrowRight": {
          setCurrentUserCell(([row, col]) => {
            return [row, Math.min(col + 1, SIZE)];
          });
          return;
        }

        case "ArrowLeft": {
          setCurrentUserCell(([row, col]) => {
            return [row, Math.max(col - 1, 0)];
          });
          return;
        }
        default: {
          return;
        }
      }
    },
    [setCurrentUserCell]
  );

  return (
    <div>
      <div>Score: {score}</div>
      <div className="grid" tabIndex={0} onKeyUp={handleKeyPress}>
        {GRID.map((row, rowIndex) => (
          <Row key={rowIndex} row={row} destCell={destCellRef.current} currentUserCell={currentUserCell} rowIndex={rowIndex} />
        ))}
      </div>

      {/* <Prompt /> */}
    </div>
  );
}
