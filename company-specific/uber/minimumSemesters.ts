let departureTime = 1;
function minimumSemesters(n: number, relations: number[][]): number {
  const edgeList = relations.reduce((acc, [src, dest]) => {
    const destArr = acc.get(src) ?? [];
    destArr.push(dest);
    acc.set(src, destArr);
    return acc;
  }, new Map() as Map<number, number[]>);
  const visited: boolean[] = new Array(n).fill(false);
  const depth: (number | null)[] = new Array(n).fill(null);
  const departure: (number | null)[] = new Array(n).fill(null);
  // console.log(edgeList);
  const cycleFound = [false];
  let result = 1;
  for (let i = 1; i <= n; i++) {
    visited[i] = true;
    result = Math.max(result, dfs(i, departure, visited, depth, edgeList, cycleFound, 1));
    if (cycleFound[0]) {
      return -1;
    }
  }

  return Math.max(...(depth as number[]));
}

function dfs(
  node: number,
  departure: (number | null)[],
  visited: boolean[],
  depth: (number | null)[],
  edgeList: Map<number, number[]>,
  cycleFound: boolean[],
  level = 1
) {
  const neighbors = edgeList.get(node) ?? [];
  let max = level;
  let currDepth = 1;
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      currDepth = Math.max(currDepth, (depth[neighbor] ?? 0) + 1);
      if (departure[neighbor] === null) {
        cycleFound[0] = true;
        // cycle found
        return Infinity;
      }
      continue;
    }
    visited[neighbor] = true;
    max = Math.max(max, dfs(neighbor, departure, visited, depth, edgeList, cycleFound, level + 1));
    currDepth = Math.max(currDepth, (depth[neighbor] ?? 0) + 1);
  }
  depth[node] = currDepth;
  departure[node] = departureTime++;
  return max;
}
