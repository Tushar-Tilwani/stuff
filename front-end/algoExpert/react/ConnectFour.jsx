import React, { useCallback, useState } from "react";

const ROWS = 6;
const COLS = 7;

function checkWin(board, row, col) {
  const minRow = Math.min(0, row - 4);
  const maxRow = Math.max(ROWS - 1, row + 4);

  let count = board[col][minRow] === null ? 0 : 1;
  for (let i = minRow + 1; i <= maxRow; i++) {
    if (board[col][i] === null) {
      count = 0;
      continue;
    }
    if (board[col][i] !== board[col][i - 1]) {
      count = 1;
      continue;
    }
    count++;
    if (count === 4) {
      return board[col][i];
    }
  }

  const minCol = Math.min(0, col - 4);
  const maxCol = Math.max(COLS - 1, col + 4);

  count = board[minCol][row] === null ? 0 : 1;
  for (let i = minCol + 1; i <= maxCol; i++) {
    if (board[i][row] === null) {
      count = 0;
      continue;
    }
    if (board[i][row] !== board[i - 1][row]) {
      count = 1;
      continue;
    }
    count++;
    if (count === 4) {
      return board[i][row];
    }
  }

  return null;
}

const Cell = ({ player }) => (
  <div className="tile">
    {player && <div className={`player player-${player}`}></div>}
  </div>
);

const Column = ({ row, index: colIndex, onClick }) => (
  <div
    className="column"
    data-index={colIndex}
    onClick={() => onClick(colIndex)}
  >
    {row.map((player, rowIndex) => {
      return <Cell key={`${rowIndex}${colIndex}`} player={player} />;
    })}
  </div>
);

export default function ConnectFour() {
  // Write your code here.
  const [board, setBoard] = useState(
    new Array(COLS).fill().map(() => new Array(ROWS).fill(null))
  );
  const [lastCols, setLastCols] = useState(new Array(COLS).fill(ROWS - 1));
  const [player, setPlayer] = useState(1);
  const [won, setWon] = useState(null);

  const handleClick = (col) => {
    if (won !== null) {
      return;
    }
    const row = lastCols[col];
    if (row < 0) {
      return;
    }
    board[col][row] = player;
    lastCols[col] -= 1;
    setBoard([...board]);
    setLastCols([...lastCols]);
    setPlayer(player === 1 ? 2 : 1);
    setWon(checkWin(board, row, col));
  };

  const handleRestart = useCallback(() => {
    setBoard(new Array(COLS).fill().map(() => new Array(ROWS).fill(null)));
    setLastCols(new Array(COLS).fill(ROWS - 1));
    setPlayer(1);
    setWon(null);
  }, [setLastCols, setPlayer, setWon, setBoard]);

  return (
    <>
      {won && <h1>Player {won} won!</h1>}
      <div class="board">
        {board.map((row, index) => (
          <Column row={row} index={index} onClick={handleClick} />
        ))}
      </div>
      {won && <button onClick={handleRestart}>Restart</button>}
    </>
  );
}
