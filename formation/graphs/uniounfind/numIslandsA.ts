function numIslands(grid: string[][]): number {
  const numOfValidCells = grid.reduce((acc, row) => {
    return acc + row.filter((val) => val === "1").length;
  }, 0);
  const parent = getParent(grid);
  const size = new Array(grid.length).fill(null).map(() => new Array(grid[0].length).fill(1));
  let components = numOfValidCells;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== "1") {
        continue;
      }
      const currentCell: [number, number] = [i, j];
      const currentRoot = find(currentCell, parent);
      const neighborCells = getNeighbors(currentCell, grid);
      for (const neighborCell of neighborCells) {
        const neighborRoot = find(neighborCell, parent);
        if (isEqual(neighborRoot, currentRoot)) {
          continue;
        }
        components--;
      }
    }
    return components;
  }

  return 0;
}

function setParentCell(cell: [number, number], root: [number, number], parent: [number, number][][]) {
  parent[cell[0]][cell[1]] = root;
}

function getParent(grid: string[][]) {
  const parent: [number, number][][] = [];
  for (let i = 0; i < grid.length; i++) {
    parent[i] = [];
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        const parentCell: [number, number] = [i, j];
        parent[i][j] = parentCell;
        continue;
      }
      parent[i][j] = [-1, -1];
    }
  }

  return parent;
}

function isEqual([aRow, aCol]: [number, number], [bRow, bCol]: [number, number]) {
  return aRow === bRow && aCol === bCol;
}

function find(cell: [number, number], parent: [number, number][][]): [number, number] {
  const [row, col] = cell;
  if (isEqual(cell, parent[row][col])) {
    return cell;
  }
  const rootCell = find(parent[row][col], parent);
  parent[row][col] = rootCell;
  return rootCell;
}

function getNeighbors(cell: [number, number], grid: string[][]) {
  const [row, col] = cell;
  const neighbors: [number, number][] = [];
  if (row + 1 < grid.length && col + 1 < grid[0].length) {
    neighbors.push([row + 1, col + 1]);
  }
  if (row + 1 < grid.length && col - 1 >= 0) {
    neighbors.push([row + 1, col - 1]);
  }
  if (row - 1 >= 0 && col + 1 < grid[0].length) {
    neighbors.push([row - 1, col + 1]);
  }

  if (row - 1 >= 0 && col - 1 >= 0) {
    neighbors.push([row - 1, col - 1]);
  }
  return neighbors;
}
