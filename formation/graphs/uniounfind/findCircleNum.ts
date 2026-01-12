function findCircleNum(isConnected: number[][]): number {
  const numOfCities = isConnected.length;
  const parent = new Array(numOfCities).fill(null).map((_, i) => i);
  const size = new Array(numOfCities).fill(1);
  let components = numOfCities;
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < isConnected[0].length; j++) {
      if (isConnected[i][j] === 0) {
        continue;
      }
      const rootI = find(i, parent);
      const rootJ = find(j, parent);
      if (rootI === rootJ) {
        continue;
      }
      if (size[rootI] < size[rootJ]) {
        parent[rootI] = rootJ;
        size[rootJ] += size[rootI];
      } else {
        parent[rootJ] = rootI;
        size[rootI] += size[rootJ];
      }
      components -= 1;
    }
  }
  return components;
}

function find(x: number, parent: number[]): number {
  if (x === parent[x]) {
    return x;
  }
  const rootX = find(parent[x], parent);
  parent[x] = rootX;
  return rootX;
}
