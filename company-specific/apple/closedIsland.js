/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function (grid) {
  const visitedGrid = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill(false));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      visitedGrid[i][j] = grid[i][j] === 1;
    }
  }

  const components = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!visitedGrid[i][j]) {
        visitedGrid[i][j] = true;
        components.push(false);
        dfs(grid, i, j, visitedGrid, components);
      }
    }
  }
  return components.filter((component) => !component).length;
};

function dfs(grid, row, col, visitedGrid, components) {
  const neighbors = getNeighbors(grid, row, col);
  components[components.length - 1] = isEdge(grid, row, col);
  for (const [nRow, nCol] of neighbors) {
    components[components.length - 1] = isEdge(grid, row, col);
    if (!visitedGrid[nRow][nCol]) {
      visitedGrid[nRow][nCol] = true;
      dfs(grid, nRow, nCol, visitedGrid, components);
    }
  }
}

function isEdge(grid, row, col) {
  return (
    row === 0 ||
    row === grid.length - 1 ||
    col === 0 ||
    col === grid[0].length - 1
  );
}

function getNeighbors(grid, row, col) {
  const neighbors = [];

  row + 1 < grid.length &&
    grid[row + 1][col] === 1 &&
    neighbors.push([row + 1, col]);

  row - 1 >= 0 && grid[row - 1][col] === 1 && neighbors.push([row - 1, col]);

  col + 1 < grid[0].length &&
    grid[row][col + 1] === 1 &&
    neighbors.push([row, col + 1]);

  col - 1 >= 0 && grid[row][col - 1] === 1 && neighbors.push([row, col - 1]);

  return neighbors;
}
