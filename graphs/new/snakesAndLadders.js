/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  const n = board.length;
  const edgeList = getEdgeList(board.reverse(), n, n);
  const source = 1;
  const dest = n * n;
  const visited = new Array(dest + 1).fill(false);
  console.log(edgeList);
  return bfs(source, dest, edgeList, visited);
};

function bfs(source, dest, edgeList, visited) {
  const QUEUE = [[source, 0]];
  while (QUEUE.length > 0) {
    console.log(QUEUE);
    const [node, level] = QUEUE.shift();
    if (node === dest) {
      return level;
    }
    // console.log(node, edgeList.get(node));
    const neighbors = edgeList.get(node);

    if (neighbors.length === 1) {
      const neighbor = neighbors[0];
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        QUEUE.push([neighbor, level]);
      }
    } else {
      for (const neighbor of neighbors) {
        if (visited[neighbor]) {
          continue;
        }
        visited[neighbor] = true;
        QUEUE.push([neighbor, level + 1]);
      }
    }
  }
  return -1;
}

function getEdgeList(board, MAX_COLS, MAX_ROWS) {
  let node = 1;
  const edgeList = new Map();
  let isRight = false;
  let inc = 1;
  let row = 0;
  let col = 0;
  while (row < MAX_ROWS) {
    const pos = [];
    if (board[row][col] === -1) {
      for (let k = 1; k <= 6; k++) {
        if (node + k <= MAX_ROWS * MAX_ROWS) {
          pos.push(node + k);
        }
      }
    } else {
      pos.push(board[row][col]);
    }
    edgeList.set(node, pos);
    col += inc;
    node += 1;
    if (col === -1 || col === MAX_COLS) {
      isRight = !isRight;
      col = isRight ? MAX_COLS - 1 : 0;
      inc = isRight ? -1 : 1;
      row += 1;
    }
  }

  return edgeList;
}

let board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1],
];

board = [
  [-1, -1],
  [-1, 3],
];

board = [
  [-1, 1, 2, -1],
  [2, 13, 15, -1],
  [-1, 10, -1, -1],
  [-1, 6, 2, 8],
];

console.log(snakesAndLadders(board));
