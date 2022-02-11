/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const edgeList = getEdgeList(n, edges);
  const visited = new Array(n).fill(false);
  let components = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      dfs(i, visited, edgeList);
      components += 1;
    }
  }
  return components;
};

function dfs(node, visited, edgeList) {
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    if (!visited[neighbour]) {
      visited[neighbour] = true;
      dfs(neighbour, visited, edgeList);
    }
  }
}

function getEdgeList(n, edges) {
  const map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }
  for (const [x, y] of edges) {
    map.get(x).push(y);
    map.get(y).push(x);
  }
  return map;
}
