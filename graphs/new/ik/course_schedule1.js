/**
 * @param {int32} n
 * @param {list_list_int32} prerequisites
 * @return {list_int32}
 */
function course_schedule(n, prerequisites) {
  const edgeList = getEdgeList(n, prerequisites);
  const visited = new Array(n).fill(false);
  const departure = new Array(n).fill(null);
  const result = [];

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    if (!dfs(node, edgeList, visited, departure, result)) {
      return [-1];
    }
  }

  // Write your code here.
  return result.reverse();
}

let time = 0;
function dfs(node, edgeList, visited, departure, result) {
  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (departure[neighbor] === null) {
        return false;
      }
      continue;
    }
    visited[neighbor] = true;
    if (!dfs(neighbor, edgeList, visited, departure, result)) {
      return false;
    }
  }
  departure[node] = time++;
  // Looks weird but postorder gives us the subject in reverse order
  result.push(node);
  return true;
}

function getEdgeList(n, prerequisites) {
  const map = new Map();

  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }

  for (const [subject, preq] of prerequisites) {
    map.get(preq).push(subject);
  }

  return map;
}
