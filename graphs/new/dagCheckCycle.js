let time = 0;
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const edgeList = getEdgeList(prerequisites);
  const visited = new Array(numCourses).fill(false);
  const departure = new Array(numCourses).fill(null);

  for (let i = 0; i < numCourses; i++) {
    if (visited[i]) {
      continue;
    }
    if (!dfs(i, edgeList, visited, departure)) {
      return false;
    }
  }

  return true;
};

function dfs(node, edgeList, visited, departure) {
  const neighbors = edgeList.get(node) ?? [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      visited[neighbor] = true;
      if (!dfs(neighbor, edgeList, visited, departure)) {
        return false;
      }
    } else {
      if (departure[neighbor] === null) {
        return false;
      }
    }
  }
  departure[node] = time++;
  return true;
}

function getEdgeList(prerequisites) {
  return prerequisites.reduce((acc, [src, dest]) => {
    if (!acc.has(src)) {
      acc.set(src, []);
    }
    acc.get(src).push(dest);
    return acc;
  }, new Map());
}
