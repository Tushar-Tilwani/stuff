import React, { useCallback, useMemo, useRef, useState } from "react";

const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  const [openColors, setOpenColors] = useState([]);
  const colors = useMemo(() => {
    const col1 = shuffle(TILE_COLORS);
    const col2 = shuffle(TILE_COLORS);
    return col1.reduce((acc, c, index) => {
      return [...acc, col1[index], col2[index]];
    }, []);
  }, []);

  const timoutIdRef = useRef(null);
  const handleBoardClick = (index) => {
    if (timoutIdRef.current != null) {
      return;
    }
    const removedOpenColors = openColors.slice(0, -1);
    const indices = [...openColors, index];
    setOpenColors(indices);

    if (
      indices.length % 2 === 0 &&
      colors[indices[indices.length - 1]] !==
        colors[indices[indices.length - 2]]
    ) {
      timoutIdRef.current = setTimeout(() => {
        setOpenColors(removedOpenColors);
        timoutIdRef.current = null;
      }, 1000);
    }
  };

  const getClassName = useCallback(
    (color, index) => {
      if (!openColors.includes(index)) {
        return "tile";
      }

      return `tile ${color}`;
    },
    [openColors]
  );

  const isDone = openColors.length === colors.length;
  const handleRestart = () => {
    setOpenColors([]);
  };

  return (
    <div id="root">
      <h1>{isDone ? "You Won!" : "Memory"}</h1>
      <div className="board">
        {colors.map((color, index) => (
          <div
            className={getClassName(color, index)}
            key={index}
            onClick={() => handleBoardClick(index)}
          ></div>
        ))}
      </div>
      {!!isDone && <button onClick={handleRestart}>Restart</button>}
    </div>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
