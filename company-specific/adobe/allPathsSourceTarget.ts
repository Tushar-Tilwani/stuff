function allPathsSourceTarget(graph: number[][]): number[][] {
  const src = 0;
  const dest = graph.length - 1;

  const visited = new Set<number>();
  const paths = new Map<number, number[][]>();
  const result: number[][] = [];
  function dfs(node: number) {
    if (node === dest) {
      paths.set(node, [[3]]);
      return true;
    }
    let result = false;
    const neighbors = graph[node] ?? [];
    const myPaths = [];
    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) {
        if (paths.has(neighbor)) {
          result = true;
          for (const nPath of paths.get(neighbor) ?? []) {
            myPaths.push([node, ...nPath]);
          }
        }
        continue;
      }
      visited.add(neighbor);
      if (dfs(neighbor)) {
        result = true;
        for (const nPath of paths.get(neighbor) ?? []) {
          myPaths.push([node, ...nPath]);
        }
      }
    }
    paths.set(node, myPaths);
    return result;
  }

  dfs(src);
  console.log(paths);
  return paths.get(src) ?? [];
}
