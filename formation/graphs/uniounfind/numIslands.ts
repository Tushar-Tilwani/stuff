function numIslands(grid: string[][]): number {
  const validCells = grid.reduce((acc, row, i) => {
    return row.reduce((acc, cell, j) => {
      if (cell === "1") {
        acc.push([i, j]);
      }
      return acc;
    }, acc);
  }, [] as [number, number][]);
  const egdes = validCells.reduce((acc, validCell) => {
    const currentId = getIdFromCell(validCell, grid);
    const neighborIds = getNeighbors(validCell, grid).map((cell) => getIdFromCell(cell, grid));
    for (const neighborId of neighborIds) {
      acc.push([currentId, neighborId]);
    }
    return acc;
  }, [] as [number, number][]);

  const NUM_OF_CELLS = grid.length * grid[0].length;
  const parent = new Array(NUM_OF_CELLS).fill(null).map((v, i) => i);
  const size = new Array(NUM_OF_CELLS).fill(1);
  let components = validCells.length;

  for (const [currentId, neighborId] of egdes) {
    // RootId can change keep it inside the loop
    const rootCurrentId = find(currentId, parent);
    const rootNeigborId = find(neighborId, parent);
    if (rootCurrentId === rootNeigborId) {
      continue;
    }
    //   console.log(parent);
    if (size[rootCurrentId] < size[rootNeigborId]) {
      parent[rootCurrentId] = rootNeigborId;
      size[rootNeigborId] += size[rootCurrentId];
    } else {
      parent[rootNeigborId] = rootCurrentId;
      size[rootCurrentId] += size[rootNeigborId];
    }
    components -= 1;
  }

  return components;
}

function find(id: number, parent: number[]): number {
  if (parent[id] === id) {
    return id;
  }
  const rootId = find(parent[id], parent);
  parent[id] = rootId;
  return rootId;
}

function getCellFromId(id: number, grid: string[][]): [number, number] {
  const MAX_COLS = grid[0].length;
  return [Math.floor(id / MAX_COLS), id % MAX_COLS];
}

function getIdFromCell(cell: [number, number], grid: string[][]) {
  const MAX_COLS = grid[0].length;
  const [row, col] = cell;
  return row * MAX_COLS + col;
}

function getNeighbors(cell: [number, number], grid: string[][]) {
  const [row, col] = cell;
  if (grid[row][col] !== "1") {
    return [];
  }
  const states = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  return states.reduce((acc, [r, c]) => {
    const newRow = row + r;
    const newCol = col + c;
    if (grid?.[newRow]?.[newCol] === "1") {
      acc.push([newRow, newCol]);
    }
    return acc;
  }, [] as [number, number][]);
}
