/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  const edgeList = getEdgeList(n, edges);
  const visited = new Array(n).fill(false);
  const parent = new Array(n).fill(null);
  let component = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }

    if (component > 0) {
      return false;
    }

    if (!dfs(i, visited, parent, edgeList)) {
      return false;
    }
  }

  return true;
};

function dfs(node, visited, parent, edgeList) {
  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (parent[neighbor] !== node) {
        return false;
      }
      continue;
    }

    parent[neighbor] = node;
    visited[neighbor] = true;

    if (!dfs(neighbor, visited, parent, edgeList)) {
      return false;
    }
  }
  return true;
}

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function getEdgeList(n, edges) {
  const edgeList = new Map();
  for (let i = 0; i < n; i++) {
    edgeList.set(i, []);
  }

  return edges.reduce((map, [x, y]) => {
    map.get(x).push(y);
    map.get(y).push(x);
    return map;
  }, edgeList);
}
