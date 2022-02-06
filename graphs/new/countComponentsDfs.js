/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
  const edgeList = getEdgeList(n, edges);
  const visited = new Array(n).fill(false);
  let numOfComponents = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    dfs(i, visited, edgeList);
    numOfComponents += 1;
  }

  return numOfComponents;
}

function dfs(node, visited, edgeList) {
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    if (visited[neighbour]) {
      continue;
    }
    visited[neighbour] = true;
    dfs(neighbour, visited, edgeList);
  }
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
