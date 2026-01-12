function earliestAcq(logs: number[][], n: number): number {
  const sortedLogs = logs.sort((a, b) => a[0] - b[0]);
  const parent = new Array(n).fill(null).map((v, i) => i);
  const size = new Array(n).fill(1);
  let components = n;
  for (const [t, nodeU, nodeV] of sortedLogs) {
    const rootU = find(nodeU, parent);
    const rootV = find(nodeV, parent);
    if (rootU === rootV) {
      continue;
    }
    if (size[rootU] < size[rootV]) {
      parent[rootU] = rootV;
      size[rootV] += size[rootU];
    } else {
      parent[rootV] = rootU;
      size[rootU] += size[rootV];
    }
    components -= 1;
    if (components === 1) {
      return t;
    }
  }
  return -1;
}

function find(x: number, parent: number[]): number {
  if (parent[x] === x) {
    return x;
  }
  const rootX = find(parent[x], parent);
  // path compression
  parent[x] = rootX;
  return rootX;
}
