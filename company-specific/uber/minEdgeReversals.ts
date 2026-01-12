function minEdgeReversals(n: number, edges: number[][]): number[] {
  const edgeList = edges.reduce((acc, [from, to]) => {
    const froms = acc.get(from) ?? [];
    const tos = acc.get(to) ?? [];
    froms.push([to, true]);
    tos.push([from, false]);
    acc.set(from, froms);
    acc.set(to, tos);
    return acc;
  }, new Map<number, [number, boolean][]>());

  const result: number[] = [];
  result[0] = dfs(0, edgeList, new Set([0]));
  secondDfs(0, edgeList, new Set([0]), result);
  console.log(result);
  return [];
}

function dfs(node: number, edgeList: Map<number, [number, boolean][]>, visited: Set<number>) {
  const neighbors = edgeList.get(node) ?? [];
  let reverseCount = 0;
  for (const [neighbor, isValid] of neighbors) {
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    reverseCount += isValid ? 0 : 1;
    reverseCount += dfs(neighbor, edgeList, visited);
  }
  return reverseCount;
}

function secondDfs(node: number, edgeList: Map<number, [number, boolean][]>, visited: Set<number>, result: number[]) {
  const neighbors = edgeList.get(node) ?? [];
  for (const [neighbor, isForward] of neighbors) {
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    result[neighbor] = result[node] + (isForward ? 1 : -1);
    secondDfs(neighbor, edgeList, visited, result);
  }
}
