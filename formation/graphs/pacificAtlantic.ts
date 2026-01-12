const getKey = (cell: [number, number]) => cell.join(",");

function pacificAtlantic(heights: number[][]): number[][] {
  const result = new Set<string>();

  const memo = new Map<string, [boolean, boolean]>();
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
      const visited = new Set<string>();
      const key = getKey([i, j]);
      visited.add(key);
      const [nPacific, nAtlantic] = memo.get(key) ?? [false, false];
      if (nPacific && nAtlantic) {
        continue;
      }
      dfs([i, j], heights, visited, memo, result);
    }
  }
  return Array.from(result.values()).map((str) => str.split(",").map(parseInt));
}

function dfs(
  node: [number, number],
  heights: number[][],
  visited: Set<string>,
  memo: Map<string, [boolean, boolean]>,
  result: Set<string>
): [boolean, boolean] {
  let isPacific = isPacificCell(node);
  let isAtlantic = isAtlanticCell(node, heights);

  const neighbors = getNeighbors(node, heights);
  for (const neighbor of neighbors) {
    const nKey = getKey(neighbor);
    if (visited.has(nKey)) {
      const [nPacific, nAtlantic] = memo.get(nKey) ?? [false, false];
      isPacific = isPacific || nPacific;
      isAtlantic = isAtlantic || nAtlantic;
      continue;
    }
    visited.add(nKey);
    const [nPacific, nAtlantic] = dfs(neighbor, heights, visited, memo, result);
    isPacific = isPacific || nPacific;
    isAtlantic = isAtlantic || nAtlantic;
  }
  //   console.log(node, [isPacific, isAtlantic]);
  const both = isPacific && isAtlantic;
  if (both) {
    result.add(getKey(node));
  }
  memo.set(getKey(node), [isPacific, isAtlantic]);

  return [isPacific, isAtlantic];
}

function isPacificCell([row, col]: [number, number]) {
  return row === 0 || col === 0;
}

function isAtlanticCell([row, col]: [number, number], heights: number[][]) {
  return col === heights[0].length - 1 || row === heights.length - 1;
}

function getNeighbors([row, col]: [number, number], heights: number[][]) {
  const val = heights[row][col];
  const states = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  return states.reduce((acc, [rDir, cDir]) => {
    const newRow = row + rDir;
    const newCol = col + cDir;
    if (!(newRow >= 0 && newRow < heights.length && newCol >= 0 && newCol < heights.length)) {
      return acc;
    }
    const nVal = heights[newRow][newCol];
    if (nVal <= val) {
      acc.push([newRow, newCol]);
    }

    return acc;
  }, [] as [number, number][]);
}
