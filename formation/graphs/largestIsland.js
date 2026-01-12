function largestIsland(matrix) {
  const MAX_ROWS = matrix.length;
  const MAX_COLS = matrix[0].length;
  const visited = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(false));
  const parent = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(null));
  let result = 0;
  for (let i = 0; i < MAX_ROWS; i++) {
    for (let j = 0; j < MAX_COLS; j++) {
      if (matrix[i][j] === 1) {
        result = Math.max(result, bfs([i, j], matrix, visited, parent));
      }
    }
  }
  return result;
}

function bfs(start, matrix, visited, parent) {
  const QUEUE = [start];
  const [sRow, sCol] = start;
  visited[sRow][sCol] = true;
  let size = 0;
  while (QUEUE.length > 0) {
    const cNode = QUEUE.pop();
    size += 1;
    const neighbors = getNeighbors(matrix, cNode);
    for (const [nRow, nCol] of neighbors) {
      if (visited[nRow][nCol]) {
        continue;
      }
      visited[nRow][nCol] = true;
      parent[nRow][nCol] = cNode;
      QUEUE.push([nRow, nCol]);
    }
  }
  return size;
}

function getNeighbors(matrix, node) {
  const MAX_ROWS = matrix.length;
  const MAX_COLS = matrix[0].length;
  const [row, col] = node;
  const neighbors = [];

  row + 1 < MAX_ROWS && matrix[row + 1][col] === 1 && neighbors.push([row + 1, col]);
  row - 1 >= 0 && matrix[row - 1][col] === 1 && neighbors.push([row - 1, col]);

  col + 1 < MAX_COLS && matrix[row][col + 1] === 1 && neighbors.push([row, col + 1]);
  col - 1 >= 0 && matrix[row][col - 1] === 1 && neighbors.push([row, col - 1]);

  return neighbors;
}

console.log(
  largestIsland([
    [0, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
  ])
);
