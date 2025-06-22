/*
 * Complete the function below.

 equation: f(len, i) = sum(f(len-1, knight neighbours of i))
 */
const NUMBER = 10;

function numPhoneNumbers(startdigit, phonenumberlength) {
  const destinationMap = getDestinations(createBoard());
  const DPTable = [];
  for (let l = 0; l <= phonenumberlength; l++) {
    DPTable[l] = [];
    for (let n = 0; n < NUMBER; n++) {
      DPTable[l].push(0);
    }
  }

  for (let n = 0; n < NUMBER; n++) {
    DPTable[1][n] = 1;
  }

  for (let l = 2; l <= phonenumberlength; l++) {
    for (let n = 0; n < NUMBER; n++) {
      const destinations = destinationMap.get(n);
      for (const dest of destinations) {
        DPTable[l][n] += DPTable[l - 1][dest];
      }
    }
  }

  // console.log(DPTable);

  return DPTable[phonenumberlength][startdigit];
}

function createBoard() {
  const squareSize = Math.floor(Math.sqrt(NUMBER));
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
