const getId = ([row, col]: [number, number], MAX_CELL: number) => row * MAX_CELL + col;

function numIslands2(m: number, n: number, positions: number[][]): number[] {
  const parent = Array.from({ length: m * n }, (_, i) => i);
  const size = new Array(m * n).fill(0);
  const GRID: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
  let count = 0;
  const result: number[] = [];

  for (const [pRow, pCol] of positions) {
    if (GRID[pRow][pCol] === 1) {
      // There are duplicates
      result.push(count);
      continue;
    }
    const neighbors = getNeighbhors(GRID, [pRow, pCol]);
    GRID[pRow][pCol] = 1;
    count += 1;
    for (const neighbor of neighbors) {
      if (union([pRow, pCol], neighbor, n, parent, size)) {
        count -= 1;
      }
    }
    result.push(count);
  }

  return result;
}

function getNeighbhors(GRID: number[][], cell: [number, number]) {
  const result: [number, number][] = [];
  const [row, col] = cell;
  if (row + 1 < GRID.length && GRID[row + 1][col] === 1) {
    result.push([row + 1, col]);
  }

  if (row - 1 >= 0 && GRID[row - 1][col] === 1) {
    result.push([row - 1, col]);
  }

  if (col + 1 < GRID[0].length && GRID[row][col + 1] === 1) {
    result.push([row, col + 1]);
  }

  if (col - 1 >= 0 && GRID[row][col - 1] === 1) {
    result.push([row, col - 1]);
  }
  return result;
}

function union(cell1: [number, number], cell2: [number, number], MAX_CELL: number, parent: number[], size: number[]) {
  const id1 = getId(cell1, MAX_CELL);
  const id2 = getId(cell2, MAX_CELL);

  const rootId1 = find(parent, id1);
  const rootId2 = find(parent, id2);

  if (rootId1 === rootId2) {
    return false;
  }
  if (size[rootId1] > size[rootId2]) {
    parent[rootId2] = rootId1;
    size[rootId1] += size[rootId2];
  } else {
    parent[rootId1] = rootId2;
    size[rootId2] += size[rootId1];
  }
  return true;
}

function find(parent: number[], x: number): number {
  if (parent[x] === x) {
    return x;
  }
  const rootX = find(parent, parent[x]);
  parent[x] = rootX;
  return rootX;
}
