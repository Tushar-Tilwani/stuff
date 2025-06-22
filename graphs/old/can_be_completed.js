/**
 * @param {int32} n
 * @param {list_int32} a
 * @param {list_int32} b
 * @return {bool}
 */
function can_be_completed(n, a, b) {
  // Write your code here.
  const edgeList = getEdgeList(n, a, b);
  const visited = new Array(n).fill(false);
  const departure = new Array(n).fill(null);

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    if (!dfs(i, edgeList, visited, departure)) {
      return false;
    }
  }
  return true;
}

let time = 0;
function dfs(node, edgeList, visited, departure) {
  const neighbours = edgeList.get(node);
  for (const neighbour of neighbours) {
    if (visited[neighbour]) {
      if (departure[neighbour] === null) {
        return false;
      }
      continue;
    }
    if (!dfs(neighbour, edgeList, visited, departure)) {
      return false;
    }
  }
  departure[node] = time++;
  return true;
}

function getEdgeList(n, a, b) {
  const map = new Map();

  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }

  for (let i = 0; i < a.length; i++) {
    map.get(a[i]).push(b[i]);
  }

  return map;
}
