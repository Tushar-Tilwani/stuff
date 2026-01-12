function earliestAcq(logs: number[][], n: number): number {
  const parent = new Array(n).fill(null).map((_, i) => i);
  const size = new Array(n).fill(1);
  let components = n;
  const sortedLogs = logs.sort((a, b) => a[0] - b[0]);

  for (const [time, u, v] of sortedLogs) {
    if (union(u, v, parent, size)) {
      components--;
    }
    if (components === 1) {
      return time;
    }
  }

  return -1;
}

function union(u: number, v: number, parent: number[], size: number[]): boolean {
  const rootU = find(u, parent);
  const rootV = find(v, parent);
  if (rootU === rootV) {
    return false;
  }
  if (size[rootV] > size[rootU]) {
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
  const parentX = find(parent[x], parent);
  parent[x] = parentX;
  return parentX;
}
