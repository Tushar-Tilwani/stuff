/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function (grid) {
  let maxResult = 0;
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const visited = new Array(MAX_ROW).fill(null).map(() => new Array(MAX_COL).fill(false));
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 1 && !visited[i][j]) {
        const result = [0];
        visited[i][j] = true;
        dfs([i, j], grid, visited, result);
        maxResult = Math.max(maxResult, result[0]);
      }
    }
  }
  return maxResult;
};

function dfs(node, grid, visited, result) {
  result[0] += 1;
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    const [nRow, nCol] = neighbor;
    if (visited[nRow][nCol]) {
      continue;
    }

    visited[nRow][nCol] = true;
    dfs(neighbor, grid, visited, result);
  }
}

function getNeighbors(node, grid) {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const [row, col] = node;
  const states = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  return states.reduce((acc, state) => {
    const [rowChange, colChange] = state;
    const nRow = row + rowChange;
    const nCol = col + colChange;
    if (nRow >= 0 && nRow < MAX_ROW && nCol >= 0 && nCol < MAX_COL) {
      if (grid[nRow][nCol] === 1) {
        acc.push([nRow, nCol]);
      }
    }
    return acc;
  }, []);
}
