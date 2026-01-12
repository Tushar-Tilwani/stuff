function minimumSemesters(n: number, relations: number[][]): number {
  const edgeList = relations.reduce((acc, [from, to]) => {
    const tos = acc.get(from) ?? [];
    tos.push(to);
    acc.set(from, tos);
    return acc;
  }, new Map<number, number[]>());

  const reverseEdgeList = relations.reduce((acc, [to, from]) => {
    const tos = acc.get(from) ?? [];
    tos.push(to);
    acc.set(from, tos);
    return acc;
  }, new Map<number, number[]>());

  const visited = Array.from({ length: n + 1 }, () => false);
  const captured = Array.from({ length: n + 1 }, () => false);
  const depths = Array.from({ length: n + 1 }, () => 0);

  const sourceNodes = [];
  for (let i = 1; i <= n; i++) {
    if (!reverseEdgeList.has(i)) {
      sourceNodes.push(i);
    }
  }

  for (const i of sourceNodes) {
    visited[i] = true;
    if (dfsCycleCheck(i, 1, edgeList, visited, captured, depths)) {
      return -1;
    }
  }
  //   console.log(depths);
  return Math.max(...depths);
}

function dfsCycleCheck(
  node: number,
  level: number,
  edgeList: Map<number, number[]>,
  visited: boolean[],
  captured: boolean[],
  depths: number[]
) {
  const neighbors = edgeList.get(node) ?? [];
  visited[node] = true;
  depths[node] = level;
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (captured[neighbor] === false) {
        return true;
      }
      continue;
    }
    visited[neighbor] = true;
    if (dfsCycleCheck(neighbor, level + 1, edgeList, visited, captured, depths)) {
      return true;
    }
  }
  captured[node] = true;
  return false;
}
