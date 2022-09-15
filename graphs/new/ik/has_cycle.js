/**
 * @param {int32} number_of_vertices
 * @param {int32} number_of_edges
 * @param {list_list_int32} edges
 * @return {bool}
 */
function has_cycle(number_of_vertices, number_of_edges, edges) {
  // Write your code here.
  const edgeList = getEdgeList(edges);
  const visited = new Array(number_of_vertices).fill(false);
  const departure = new Array(number_of_vertices).fill(null);

  for (let i = 0; i < number_of_vertices; i++) {
    if (visited[i]) {
      continue;
    }
    if (dfs(i, edgeList, visited, departure)) {
      return true;
    }
  }

  return false;
}

let count = 0;
function dfs(node, edgeList, visited, departure) {
  visited[node] = true;
  const neighbours = edgeList.get(node) ?? [];

  let res = false;
  for (const neighbour of neighbours) {
    if (!visited[neighbour]) {
      res = res || dfs(neighbour, edgeList, visited, departure);
    } else {
      if (departure[neighbour] === null) {
        return true;
      }
    }
  }
  departure[node] = count++;
  return res;
}

function getEdgeList(edges) {
  return edges.reduce((acc, [src, dest]) => {
    if (!acc.has(acc)) {
      acc.set(src, []);
    }
    acc.get(src).push(dest);
    return acc;
  }, new Map());
}
