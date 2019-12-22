/*
 * Complete the function below.
 */
function numPhoneNumbers(startdigit, phonenumberlength) {
  const destinationMap = getDestinations(createBoard());
  const result = [];
  helper(startdigit, phonenumberlength, [], destinationMap, result);
  return result.length;
}

function helper(digit, len, slate, destinationMap, result) {
  if (slate.length === len - 1) {
    result.push([...slate, digit].join(""));
    return;
  }

  slate.push(digit);
  for (const value of destinationMap.get(digit)) {
    helper(value, len, slate, destinationMap, result);
  }
  slate.pop();
}

// If we only want count
function countHelper(digit, len, destinationMap) {
  let count = 0;
  if (len === 1) {
    return 1;
  }

  const values = destinationMap.get(digit);
  for (const value of values) {
    count += helper(value, len - 1, destinationMap);
  }
  return count;
}

function createBoard() {
  const squareSize = Math.floor(Math.sqrt(10));
  const board = [];
  let c = 1;

  for (let i = 0; i < squareSize; i++) {
    board[i] = [];
    for (let j = 0; j < squareSize; j++) {
      board[i][j] = c;
      c += 1;
    }
  }
  board[board.length] = [null, 0, null];
  return board;
}

function getDestinations(board) {
  const destinationMap = new Map();
  const maxRows = board.length;
  const maxCols = board[0].length;

  for (let row = 0; row < maxRows; row++) {
    for (let col = 0; col < maxCols; col++) {
      if (board[row][col] === null) {
        continue;
      }

      const destinations = [];

      if (row + 2 < maxRows) {
        if (col - 1 >= 0) {
          pushIfNotNull(destinations, board[row + 2][col - 1]);
        }

        if (col + 1 < maxCols) {
          pushIfNotNull(destinations, board[row + 2][col + 1]);
        }
      }

      if (row - 2 >= 0) {
        if (col - 1 >= 0) {
          pushIfNotNull(destinations, board[row - 2][col - 1]);
        }

        if (col + 1 < maxCols) {
          pushIfNotNull(destinations, board[row - 2][col + 1]);
        }
      }

      if (col + 2 < maxCols) {
        if (row - 1 >= 0) {
          pushIfNotNull(destinations, board[row - 1][col + 2]);
        }
        if (row + 1 < maxRows) {
          pushIfNotNull(destinations, board[row + 1][col + 2]);
        }
      }

      if (col - 2 >= 0) {
        if (row - 1 >= 0) {
          pushIfNotNull(destinations, board[row - 1][col - 2]);
        }
        if (row + 1 < maxCols) {
          pushIfNotNull(destinations, board[row + 1][col - 2]);
        }
      }

      destinationMap.set(board[row][col], destinations);
    }
  }
  return destinationMap;
}

function pushIfNotNull(arr, value) {
  if (value !== null) {
    arr.push(value);
  }
}

const startdigit = 1;
const phonenumberlength = 3;

console.log(numPhoneNumbers(startdigit, phonenumberlength));
