/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const parent = [];
  const size = [];
  let numOfComponents = 0;
  const nodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const id = getId(i, j);
      parent[id] = id;
      size[id] = 1;
      if (grid[i][j] === 1) {
        numOfComponents += 1;
        nodes.push([i, j]);
      }
    }
  }

  for (const node of nodes) {
    const neighbors = getNeighbors(node);
    for (const neighbor of neighbors) {
      if (union(node, neighbor, parent, size)) {
        numOfComponents -= 1;
      }
    }
  }

  return numOfComponents;
};

function union(nodeU, nodeV, parent, size) {
  const idV = getId(nodeV);
  const idU = getId(nodeU);
  const rootU = find(idU, parent);
  const rootV = find(idV, parent);
  if (rootV === rootU) {
    return false;
  }
  // union
  if (size[rootV] < size[rootU]) {
    parent[rootV] = rootU;
    size[rootU] += size[rootV];
  } else {
    parent[rootU] = rootV;
    size[rootV] += size[rootU];
  }
  return true;
}

function find(x, parent) {
  if (x === parent[x]) {
    return x;
  }
  const rootX = find(x, parent);
  parent[x] = rootX;
  return rootX;
}

const getId = (row, col, grid) => row * grid[0].length + col;

function getNeighbors(grid, row, col) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  return directions.reduce((acc, [dRow, dCol]) => {
    const nRow = dRow + row;
    const nCol = dCol + col;
    if (!(nRow < grid.length && nRow >= 0 && nCol < grid[0].length && nCol >= 0)) {
      return acc;
    }
    if (grid[nRow][nCol] === 1) {
      acc.push([nRow, nCol]);
    }

    return acc;
  }, []);
}
