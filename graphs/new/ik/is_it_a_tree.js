/**
 * @param {int32} node_count
 * @param {list_int32} edge_start
 * @param {list_int32} edge_end
 * @return {bool}
 */
function is_it_a_tree(node_count, edge_start, edge_end) {
  const visited = new Array(node_count).fill(false);
  const parent = new Array(node_count).fill(null);
  const edgeList = getEdgeList(node_count, edge_start, edge_end);
  let components = 0;
  // Write your code here.
  for (let i = 0; i < node_count; i++) {
    if (visited[i]) {
      continue;
    }
    if (components > 0) {
      return false;
    }
    visited[i] = true;
    if (!dfs(i, parent, visited, edgeList)) {
      return false;
    }
    components++;
  }
  return true;
}

function dfs(node, parent, visited, edgeList) {
  const neighbours = edgeList.get(node);
  for (const neighbor of neighbours) {
    if (visited[neighbor]) {
      if (parent[node] !== neighbor) {
        return false;
      }
      continue;
    }

    visited[neighbor] = true;
    parent[neighbor] = node;
    if (!dfs(neighbor, parent, visited, edgeList)) {
      return false;
    }
  }
  return true;
}

function getEdgeList(node_count, edge_start, edge_end) {
  const map = new Map();
  for (let i = 0; i < node_count; i++) {
    map.set(i, []);
  }

  for (let i = 0; i < edge_start.length; i++) {
    map.get(edge_start[i]).push(edge_end[i]);
    map.get(edge_end[i]).push(edge_start[i]);
  }

  return map;
}
