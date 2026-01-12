function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(isConnected.length).fill(1);
  console.log(parent);
  let components = n;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j] === 1 && union(i, j, parent, size)) {
        components--;
      }
    }
  }
  return components;
}

function union(u: number, v: number, parent: number[], size: number[]) {
  const rootU = find(u, parent);
  const rootV = find(v, parent);
  if (rootU === rootV) {
    return false;
  }
  if (size[rootU] > size[rootV]) {
    parent[rootV] = rootU;
    size[rootU] += size[rootV];
  } else {
    parent[rootU] = rootV;
    size[rootV] += size[rootU];
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
