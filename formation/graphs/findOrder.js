let time = 0;
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const adjList = getEdgeList(prerequisites);
  console.log("adjList", adjList);
  const visited = new Array(numCourses).fill(false);
  const departure = new Array(numCourses).fill(null);
  const order = [];
  for (let i = 0; i < numCourses; i++) {
    if (visited[i]) {
      continue;
    }
    if (findDfsOrder(i, adjList, visited, departure, order)) {
      return [];
    }
  }

  return order.reverse();
};

// Return true if a cycle is found in graph
function findDfsOrder(src, adjList, visited, departure, order) {
  visited[src] = true;
  const neighbors = adjList.get(src) ?? [];
  for (const neighbor of neighbors) {
    if (visited[neighbor]) {
      if (departure[neighbor] === null) {
        // There is back edge to a parent still not departed
        return true;
      }
      continue;
    }

    if (findDfsOrder(neighbor, adjList, visited, departure, order)) {
      return true;
    }
  }
  departure[src] = time++;
  order.push(src);
  return false;
}

function getEdgeList(prerequisites) {
  return prerequisites.reduce((acc, [dest, src]) => {
    const list = acc.get(src) ?? [];
    list.push(dest);
    acc.set(src, list);
    return acc;
  }, new Map());
}
