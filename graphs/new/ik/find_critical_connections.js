/**
 * @param {int32} number_of_servers
 * @param {list_list_int32} connections
 * @return {list_list_int32}
 */
function find_critical_connections(number_of_servers, connections) {
  const visited = new Array(number_of_servers).fill(true);
  const departure = new Array(number_of_servers).fill(null);
  const edgeList = getEdgeList(number_of_servers, connections);
  for (let i = 0; i < number_of_servers; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    dfs(i, visited, departure, edgeList);
  }
  // Write your code here.
  return [];
}

let time = 0;
function dfs(node, visited, departure, edgeList) {
  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    visited[neighbor] = true;
    
  }
}

function getEdgeList(number_of_servers, connections) {
  const map = new Map();
  for (let i = 0; i < number_of_servers; i++) {
    map.set(i, []);
  }

  for (const [node1, node2] of connections) {
    map.get(node1).push(node2);
    map.get(node2).push(node1);
  }

  return map;
}
