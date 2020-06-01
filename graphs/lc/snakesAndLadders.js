// https://leetcode.com/problems/snakes-and-ladders/

/**
 * @param {number[][]} board
 * @return {number}
 */
var snakesAndLadders = function(board) {
  const NUM_OF_NODES = board.length * board[0].length;
  const start = 0;
  const end = NUM_OF_NODES - 1;
  // Mapping is from 0 to NUM_OF_NODES - 1
  const nodeMapping = getNodeMapping(board);
  const visited = new Array(NUM_OF_NODES).fill(false);
  return bfs(start, end, board, nodeMapping, visited);
};

function bfs(start, end, board, nodeMapping, visited) {
  const QUEUE = [{ node: start, level: 0 }];
  visited[start] = true;
  while (QUEUE.length > 0) {
    const { node, level } = QUEUE.shift();
    if (node === end) {
      return level + 1;
    }
    const neighbors = getNeighbors(board, nodeMapping, node);
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        QUEUE.push({ node: neighbor, level: level + 1 });
        visited[neighbor] = true;
      }
    }
  }
  return -1;
}

function getNodeMapping(board) {
  const result = [];
  const MAX_COL = board[0].length - 1;
  let isRight = true;
  let inc = isRight ? 1 : -1;
  let row = board.length - 1;
  let col = 0;

  while (row >= 0) {
    result.push([row, col]);
    col += inc;
    if (col > MAX_COL || col < 0) {
      isRight = !isRight;
      col = isRight ? 0 : MAX_COL;
      inc = isRight ? 1 : -1;
      row -= 1;
    }
  }

  return result;
}

function getNeighbors(board, nodeMapping, start) {
  const result = [];
  for (let i = 1; i <= 6; i++) {
    const neighbor = start + i;
    if (neighbor >= nodeMapping.length) {
      break;
    }
    const [row, col] = nodeMapping[neighbor];
    const val = board[row][col];
    // Mapping is from 0 to NUM_OF_NODES - 1
    val === -1 ? result.push(neighbor) : result.push(val - 1);
  }
  return result;
}

let board = [
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 35, -1, -1, 13, -1],
  [-1, -1, -1, -1, -1, -1],
  [-1, 15, -1, -1, -1, -1]
];

//console.log(getNeighbors(board, getNodeMapping(board), 0));
console.log(snakesAndLadders(board));
// console.log(getNodeList(board), board.length * board[0].length);
