/**
 * @param {int32} n
 * @param {list_list_int32} edges
 * @return {int32}
 */
function number_of_connected_components(n, edges) {
  const visited = new Array(n).fill(false);
  const edgeList = getEdgeList(n, edges);
  let components = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    dfs(i, edgeList, visited);
    components++;
  }

  // Write your code here.
  return components;
}

function dfs(node, edgeList, visited) {
  const neighbours = edgeList.get(node);
  for (const neighbor of neighbours) {
    if (visited[neighbor]) {
      continue;
    }
    visited[neighbor] = true;
    dfs(neighbor, edgeList, visited);
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
