let time = 1;
function minimumSemesters(n: number, relations: number[][]): number {
  const departure = new Array(n + 1).fill(null);
  const depth = new Array(n + 1).fill(0);
  const edgeList = relations.reduce((acc, [prevCourse, nextCourse]) => {
    const nodes = acc.get(prevCourse) ?? [];
    nodes.push(nextCourse);
    acc.set(prevCourse, nodes);
    return acc;
  }, new Map<number, number[]>());
  const visited = new Set<number>();
  const hasCycle = [false];
  for (let i = 1; i <= n; i++) {
    if (visited.has(i)) {
      continue;
    }
    visited.add(i);
    dfs(i, edgeList, visited, departure, depth, hasCycle);
    if (hasCycle[0]) {
      // found a cycle
      return -1;
    }
  }
  return Math.max(...depth);
}

function dfs(
  node: number,
  edgeList: Map<number, number[]>,
  visited: Set<number>,
  departure: number[],
  depth: number[],
  hasCycle: boolean[]
): number {
  if (hasCycle[0]) {
    // cycle found no need to go further
    return Infinity;
  }
  let maxDepthUnderCurrentNode = 0;
  const neighbors = edgeList.get(node) ?? [];
  for (const neighbor of neighbors) {
    if (visited.has(neighbor)) {
      maxDepthUnderCurrentNode = Math.max(maxDepthUnderCurrentNode, depth[neighbor]);
      if (departure[neighbor] === null) {
        // found a cycle;
        hasCycle[0] = true;
        return Infinity;
      }
      continue;
    }
    visited.add(neighbor);
    maxDepthUnderCurrentNode = Math.max(
      maxDepthUnderCurrentNode,
      dfs(neighbor, edgeList, visited, departure, depth, hasCycle)
    );
  }
  depth[node] = maxDepthUnderCurrentNode + 1;
  departure[node] = time++;
  return depth[node];
}
