import React, { useCallback, useReducer } from "react";

const ROWS = 6;
const COLS = 7;
const WIN_COUNT = 4;

const getInitialState = () => {
  return {
    board: new Array(COLS).fill().map(() => new Array(ROWS).fill(null)),
    didWin: false,
    currentPlayer: 2,
    colIndicies: new Array(COLS).fill(ROWS),
    noOfMoves: 0,
  };
};

const checkDidWin = ({ board, currentPlayer, colIndex, rowIndex }) => {
  let count = 0;

  // Column Check
  for (let i = 0; i < COLS; i++) {
    if (board[i][rowIndex] === currentPlayer) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }

  // Row Check
  count = 0;
  for (let i = 0; i < ROWS; i++) {
    if (board[colIndex][i] === currentPlayer) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
  }

  // Diagonal Check
  count = 0;
  const dist = Math.min(colIndex, rowIndex);
  let rowDaig = rowIndex - dist;
  let colDaig = colIndex - dist;
  // console.log("-------------", colIndex, rowIndex);
  while (rowDaig < ROWS && colDaig < COLS) {
    // console.log([rowDaig, colDaig], board[rowDaig][colDaig]);
    if (board[colDaig][rowDaig] === currentPlayer) {
      count++;
    } else {
      count = 0;
    }
    if (count === WIN_COUNT) {
      return true;
    }
    rowDaig++;
    colDaig++;
  }

  // Anti Diagonal Check
  count = 0;
  const sum = rowIndex + colIndex;
  let rowAdaig = 0;
  let colAdaig = sum;
  while (rowAdaig <= sum && colAdaig >= 0) {
    if (colAdaig < COLS && board[colAdaig][rowAdaig] === currentPlayer) {
      count++;
    }

    if (count === WIN_COUNT) {
      return true;
    }

    colAdaig--;
    rowAdaig++;
  }

  return false;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "MOVE":
      const { colIndex } = action;
      const {
        board,
        currentPlayer: previousPlayer,
        colIndicies,
        didWin,
        noOfMoves,
      } = state;
      const currentPlayer = previousPlayer === 1 ? 2 : 1;
      if (colIndicies[colIndex] <= 0 || didWin || noOfMoves === COLS * ROWS) {
        return state;
      }
      colIndicies[colIndex] -= 1;
      board[colIndex][colIndicies[colIndex]] = currentPlayer;
      return {
        board: [...board],
        colIndicies: [...colIndicies],
        currentPlayer,
        noOfMoves: noOfMoves + 1,
        didWin: checkDidWin({
          currentPlayer,
          board,
          colIndex,
          rowIndex: colIndicies[colIndex],
        }),
      };
    case "RESET":
      return getInitialState();
    default:
      return state;
  }
};

const Tile = (props) => {
  const { tile } = props;
  if (!tile) {
    return <div className="tile" />;
  }
  return (
    <div className="tile">
      <div className={`player player-${tile}`}></div>
    </div>
  );
};

const Column = (props) => {
  const { cols, colIndex, handleClick } = props;
  return (
    <div className="column" onClick={() => handleClick({ colIndex })}>
      {cols.map((tile, rowIndex) => (
        <Tile tile={tile} key={`${colIndex}:${rowIndex}`} />
      ))}
    </div>
  );
};

export default function ConnectFour() {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const { board, didWin, currentPlayer, noOfMoves } = state;
  const handleMove = useCallback(
    ({ colIndex }) => {
      dispatch({ type: "MOVE", colIndex });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);
  return (
    <>
      {didWin && <h1>Player {currentPlayer} Wins</h1>}
      <div className="board">
        {board.map((cols, colIndex) => (
          <Column
            cols={cols}
            colIndex={colIndex}
            key={`${colIndex}`}
            handleClick={handleMove}
          />
        ))}
      </div>
      {(didWin || noOfMoves === COLS * ROWS) && (
        <button onClick={handleReset}>Restart</button>
      )}
    </>
  );
}
