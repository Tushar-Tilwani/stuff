let time = 0;
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = function (numCourses, prerequisites) {
  const adjList = getEdgeList(prerequisites);
  const visited = new Array(numCourses).fill(false);
  const departure = new Array(numCourses).fill(null);

  for (let i = 0; i < numCourses; i++) {
    if (visited[i]) {
      continue;
    }
    if (hasCycleDfs(i, adjList, visited, departure)) {
      return false;
    }
  }
  return true;
};

function hasCycleDfs(src, adjList, visited, departure) {
  visited[src] = true;
  const neighbors = adjList.get(src) ?? [];
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (departure[neighbor] === null) {
        // Back edge to a current
        return true;
      }
      continue;
    }
    if (hasCycleDfs(neighbor, adjList, visited, departure)) {
      return true;
    }
  }
  departure[src] = time++;
  return false;
}

function getEdgeList(prerequisites) {
  const adjList = new Map();
  for (const [src, dest] of prerequisites) {
    const list = adjList.get(dest) ?? [];
    list.push(src);
    adjList.set(dest, list);
  }

  return adjList;
}
