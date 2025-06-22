/**
 * @param {list_str} zombies
 * @return {int32}
 */
function zombie_cluster(zombies) {
  const n = zombies.length;
  const visited = new Array(n).fill(false);
  let components = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    dfs(i, zombies, visited);
    components++;
  }
  // Write your code here.
  return components;
}

function dfs(node, zombies, visited) {
  const neighbors = getNeighbors(zombies, node);
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      continue;
    }
    visited[neighbor] = true;
    dfs(neighbor, zombies, visited);
  }
}

function getNeighbors(zombies, node) {
  const result = [];
  const n = zombies.length;
  for (let i = 0; i < n; i++) {
    if (zombies[node][i] == 1) {
      result.push(i);
    }
  }
  return result;
}
