function numIslands2(m: number, n: number, positions: number[][]): number[] {
  const getId = (cell: [number, number]) => cell[0] * n + cell[1];
  const result: number[] = [];
  const numOfCells = m * n;
  const parent = new Array(numOfCells).fill(null).map((_, i) => i);
  const size = new Array(numOfCells).fill(1);
  const grid: number[][] = new Array(m).fill(null).map(() => new Array(n).fill(0));
  let components = 0;
  for (const [pRow, pCol] of positions) {
    const pos: [number, number] = [pRow, pCol];
    grid[pRow][pCol] = 1;
    const neighborCells = getNeighbors(pos as [number, number], grid);
    for (const neighborCell of neighborCells) {
      if (union(getId(neighborCell), getId(pos), parent, size)) {
        components--;
      }
    }
    if (neighborCells.length === 0) {
      // new cell added
      components++;
    }

    result.push(components);
  }
  return result;
}

function union(u: number, v: number, parent: number[], size: number[]) {
  const rootU = find(u, parent);
  const rootV = find(v, parent);
  if (rootU === rootV) {
    return false;
  }
  if (size[rootU] < size[rootV]) {
    parent[rootU] = rootV;
    size[rootV] += size[rootU];
  } else {
    parent[rootV] = rootU;
    size[rootU] += size[rootV];
  }
  return true;
}

function find(x: number, parent: number[]): number {
  if (x === parent[x]) {
    return x;
  }
  const rootX = find(parent[x], parent);
  parent[x] = rootX;

  return rootX;
}

function getNeighbors(cell: [number, number], grid: number[][]): [number, number][] {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const [row, col] = cell;
  return directions.reduce((acc, [dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (grid?.[newRow]?.[newCol] === 1) {
      acc.push([newRow, newCol]);
    }
    return acc;
  }, [] as [number, number][]);
}
