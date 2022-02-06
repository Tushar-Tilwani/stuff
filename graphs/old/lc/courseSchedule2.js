// https://leetcode.com/problems/course-schedule-ii/

// Find a cycle in directed graph.
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var findOrder = function(numCourses, prerequisites) {
  const arrival = new Array(numCourses).fill(null);
  const departure = new Array(numCourses).fill(null);
  const visited = new Array(numCourses).fill(false);
  const edgeList = getEdgeList(prerequisites);
  const result = [];
  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      const isPossible = dfs(i, edgeList, visited, arrival, departure, result);
      if (!isPossible) {
        return [];
      }
    }
  }
  return result.reverse();
};

let time = 0;
function dfs(node, edgeList, visited, arrival, departure, result) {
  arrival[node] = time;
  time += 1;
  visited[node] = true;

  const neighbors = edgeList.get(node) || [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      const isPossible = dfs(
        neighbor,
        edgeList,
        visited,
        arrival,
        departure,
        result
      );

      if (!isPossible) {
        return false;
      }
    } else {
      if (departure[neighbor] === null) {
        return false;
      }
    }
  }

  departure[node] = time;
  time += 1;
  result.push(node);
  return true;
}

function getEdgeList(prerequisites) {
  return prerequisites.reduce((acc, [electiveSubject, coreSubject]) => {
    if (!acc.has(coreSubject)) {
      acc.set(coreSubject, [electiveSubject]);
    } else {
      acc.get(coreSubject).push(electiveSubject);
    }
    return acc;
  }, new Map());
}

let numCourses = 2,
  prerequisites = [[1, 0]];

numCourses = 4;
prerequisites = [
  [1, 0],
  [2, 0],
  [3, 1],
  [3, 2]
];
console.log(findOrder(numCourses, prerequisites));
