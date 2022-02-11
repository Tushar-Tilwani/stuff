/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function (board) {
  const n = board.length;
  const edgeList = getEdgeList(board.reverse(), n, n);
  const source = 1;
  const dest = n * n;
  const visited = new Array(dest + 1).fill(null);
  // console.log(edgeList);
  const r = bfs(board, source, dest, edgeList, visited);
  // console.log(visited);
  return r;
};

function bfs(board, source, dest, edgeList, visited) {
  const QUEUE = [[source, 0]];
  while (QUEUE.length > 0) {
    const [node, level] = QUEUE.shift();
    if (node === dest) {
      return level;
    }
    const [row, col] = edgeList.get(node);
    const neighbors = getNeighbours(board, dest, node, edgeList);
    console.log(node, neighbors);

    for (const neighbor of neighbors) {
      if (visited[neighbor]) {
        continue;
      }
      visited[neighbor] = node;
      QUEUE.push([neighbor, level + 1]);
    }
  }
  return -1;
}

function getNeighbours(board, dest, node, edgeList) {
  const neighbours = [];
  for (let i = 1; i <= 6; i++) {
    if (node + i > dest) {
      continue;
    }
    const neighbhor = node + i;
    const [row, col] = edgeList.get(neighbhor);
    if (board[row][col] === -1) {
      neighbours.push(neighbhor);
    } else {
      neighbours.push(board[row][col]);
    }
  }
  return neighbours;
}

function getEdgeList(board) {
  const edgeList = new Map();
  const n = board.length;
  let inc = 1;
  let row = 0;
  let col = 0;
  let node = 1;
  while (row < n) {
    edgeList.set(node, [row, col]);
    col = col + inc;
    node += 1;
    if (col === n || col === -1) {
      inc = -1 * inc;
      col = col === n ? n - 1 : 0;
      row = row + 1;
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

// board = [
//   [-1, -1],
//   [-1, 3],
// ];

board = [
  [-1, 1, 2, -1],
  [2, 13, 15, -1],
  [-1, 10, -1, -1],
  [-1, 6, 2, 8],
];

console.log(snakesAndLadders(board));
