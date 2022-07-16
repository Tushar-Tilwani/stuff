/**
 * @param {list_list_int32} matrix
 * @return {list_int32}
 */
function find_basins(matrix) {
  // Write your code here.
  const visitedMap = new Map();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      dfs(matrix, [i, j], visitedMap);
    }
  }
  console.log(visitedMap);
  const countMap = Array.from(visitedMap.values()).reduce((countMap, val) => {
    countMap.set(val, (countMap.get(val) ?? 0) + 1);
    return countMap;
  }, new Map());
  return Array.from(countMap.values()).sort((a, b) => a - b);
}

let numOfComponents = 0;
function dfs(matrix, cords, visitedMap) {
  const key = cords.join();
  if (visitedMap.has(key)) {
    return visitedMap.get(key);
  }
  const minNeigbor = getMinNeighbor(matrix, cords);
  if (minNeigbor === null) {
    numOfComponents++;
    visitedMap.set(key, numOfComponents);
    return numOfComponents;
  }
  const parent = dfs(matrix, minNeigbor, visitedMap);
  visitedMap.set(key, parent);
  return parent;
}

function getMinNeighbor(matrix, [row, col]) {
  const neighbors = [
    [row, col + 1],
    [row, col - 1],
    [row + 1, col],
    [row - 1, col],
  ];
  let min = get(matrix, [row, col]);
  let result = null;
  for (const neighbor of neighbors) {
    const val = get(matrix, neighbor);
    if (val < min) {
      min = val;
      result = neighbor;
    }
  }
  return result;
}
function get(matrix, [row, col]) {
  if (matrix[row] && isFinite(matrix[row][col])) {
    return matrix[row][col];
  }
  return Infinity;
}

let matrix = [
  [1, 5, 2],
  [2, 4, 7],
  [3, 6, 9],
];

matrix = [
  [0, 2, 1, 3],
  [2, 1, 0, 4],
  [3, 3, 3, 3],
  [5, 5, 2, 1],
];

console.log(find_basins(matrix));
