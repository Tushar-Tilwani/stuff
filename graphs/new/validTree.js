/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function validTree(n, edges) {
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
    visited[i] = true;
    if (!dfs(i, visited, edgeList, parent)) {
      return false;
    }
    component += 1;
  }
  return true;
}

function dfs(node, visited, edgeList, parent) {
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    if (visited[neighbour]) {
      if (neighbour !== parent[node]) {
        return false;
      }
      continue;
    }
    visited[neighbour] = true;
    parent[neighbour] = node;
    if (!dfs(neighbour, visited, edgeList, parent)) {
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
