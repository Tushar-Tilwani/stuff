function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const edgeList = new Map<string, Map<string, number>>();
  for (let i = 0; i < equations.length; i++) {
    const value = values[i];
    const [left, right] = equations[i];

    const leftMap = edgeList.get(left) ?? new Map<string, number>();
    leftMap.set(right, value);
    edgeList.set(left, leftMap);

    const rightMap = edgeList.get(right) ?? new Map<string, number>();
    rightMap.set(left, 1 / value);
    edgeList.set(right, rightMap);
  }
  const results: number[] = [];
  for (const [left, right] of queries) {
    const result = [-1];
    if (edgeList.has(left)) {
      const visited = new Set<string>([left]);
      dfs(left, right, visited, edgeList, 1, result);
    }
    results.push(result[0]);
  }
  return results;
}

function dfs(
  node: string,
  dest: string,
  visited: Set<string>,
  edgeList: Map<string, Map<string, number>>,
  valueSoFar: number,
  result: number[]
) {
  if (node === dest) {
    result[0] = valueSoFar;
    return;
  }
  const neighborMap = edgeList.get(node);
  if (!(neighborMap?.size && neighborMap.size > 0)) {
    return;
  }
  const neighbors = Array.from(neighborMap.entries());
  for (const [neighbor, value] of neighbors) {
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(neighbor);
    dfs(neighbor, dest, visited, edgeList, valueSoFar * value, result);
  }
}
