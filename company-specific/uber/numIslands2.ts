function numIslands2(m: number, n: number, positions: number[][]): number[] {
  const components: (null | number)[] = new Array(m * n).fill(null);
  const grid = new Array(m).fill(null).map(() => new Array(n).fill(0));
  const result = [];
  for (const pos of positions) {
    const newId = getId(pos as [number, number], n);
    // I invented a new religion
    components[newId] = newId;

    const [pRow, pCol] = pos;
    grid[pRow][pCol] = 1;

    // new component
    const neighbors = getNeighbors1(pos as [number, number], grid);
    const neighborReligion = neighbors
      .map((neighbor) => getId(neighbor, n))
      .map((id) => components[id])
      .filter((religion) => religion !== null);

    const uniqueNeighborReligion = Array.from(new Set(neighborReligion).values());

    for (const oldReligon of uniqueNeighborReligion) {
      for (let i = 0; i < components.length; i++) {
        if (components[i] === oldReligon) {
          components[i] = newId;
        }
      }
    }

    result.push(getNumOfComponents(components));
  }
  return result;
}

function getNumOfComponents(components: (null | number)[]) {
  const idComponents = components.filter((c) => c !== null);
  return new Set(idComponents).size;
}

function getId([row, col]: [number, number], n: number) {
  return row * n + col;
}

function getNeighbors1(node: [number, number], grid: number[][]): [number, number][] {
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
  }, [] as [number, number][]);
}
