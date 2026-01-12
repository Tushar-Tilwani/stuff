function sumNodes(vertexList, edgeList, startNode) {
  const adjList = vertexList.reduce((acc, vertex) => {
    acc.set(vertex, []);
    return acc;
  }, new Map());

  for (const [src, dest] of edgeList) {
    adjList.get(src).push(dest);
  }
  const visited = new Set();
  return dfs(node, adjList, visited);
}

function dfs(node, adjList, visited) {
  const neighbors = adjList.get(node);
  let sum = 0;
  for (const neighbor of neighbors) {
    if (visited.has(neighbor)) {
      continue;
    }
    visited.add(node);
    sum += dfs(node, adjList, visited);
  }
  return sum;
}
