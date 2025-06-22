/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  const n = graph.length;
  const edgeList = getEdgeList(graph);
  const colors = new Array(n).fill(null);
  let currentColor = 1;
  for (let i = 0; i < n; i++) {
    if (colors[i] !== null) {
      continue;
    }
    colors[i] = currentColor;
    if (!dfs(i, colors, edgeList)) {
      return false;
    }
    currentColor = currentColor * -1;
  }
  return true;
};

function dfs(node, colors, edgeList) {
  const neighbors = edgeList.get(node);
  const neighborColor = -1 * colors[node];
  for (const neighbor of neighbors) {
    if (colors[neighbor] !== null) {
      // neighbor has  been visited

      if (colors[neighbor] === colors[node]) {
        return false;
      }
      continue;
    }
    // neighbor has not been visited
    colors[neighbor] = neighborColor;
    if (!dfs(neighbor, colors, edgeList)) {
      return false;
    }
  }
  return true;
}

function getEdgeList(graph) {
  const map = new Map();
  const n = graph.length;
  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }

  for (let i = 0; i < n; i++) {
    for (const node of graph[i]) {
      map.get(node).push(i);
      map.get(i).push(node);
    }
  }

  return map;
}
