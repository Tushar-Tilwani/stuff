let time = 0;

function solution(adjacency) {
  const adjList = getAdjList(adjacency);
  const nodeLength = adjacency.length;
  const visited = new Array(nodeLength).fill(false);
  const departure = new Array(nodeLength).fill(null);

  for (let i = 0; i < nodeLength; i++) {
    if (visited[i]) {
      continue;
    }
    if (dfs(adjList, node, visited, departure)) {
      return true;
    }
  }

  return false;
}

function dfs(adjList, node, visited, departure) {
  visited[node] = true;
  const neighbors = adjList.get(node);
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (departure[neighbor] === null) {
        // Has cycle
        return true;
      }
    }
    // visited[neighbor] = true;
    if (dfs(adjList, neighbor, visited, departure)) {
      return true;
    }
  }
  departure[node] = time++;
  return false;
}

function getAdjList(adjacency) {
  const adjList = new Map();
  for (let i = 0; i < adjacency.length; i++) {
    const neighbors = [];
    for (let j = 0; j < adjacency[0].length; j++) {
      if (adjacency[i][j]) {
        neighbors.push(j);
      }
    }
    adjList.set(i, neighbors);
  }
  return adjList;
}
