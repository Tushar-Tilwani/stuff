// https://leetcode.com/problems/course-schedule/

// Find a cycle in directed graph.
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  const arrival = new Array(numCourses).fill(null);
  const departure = new Array(numCourses).fill(null);
  const visited = new Array(numCourses).fill(false);
  const edgeList = getEdgeList(prerequisites);
  for (let i = 0; i < numCourses; i++) {
    if (!visited[i]) {
      const isPossible = dfs(i, edgeList, visited, arrival, departure, 0);
      if (!isPossible) {
        return false;
      }
    }
  }
  return true;
};

let time = 0;
function dfs(node, edgeList, visited, arrival, departure) {
  arrival[node] = time;
  time += 1;
  visited[node] = true;

  const neighbors = edgeList.get(node) || [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      const isPossible = dfs(neighbor, edgeList, visited, arrival, departure);

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
  return true;
}

function getEdgeList(prerequisites) {
  return prerequisites.reduce((acc, [coreSubject, electiveSubject]) => {
    if (!acc.has(coreSubject)) {
      acc.set(coreSubject, [electiveSubject]);
    } else {
      acc.get(coreSubject).push(electiveSubject);
    }
    return acc;
  }, new Map());
}

let numCourses = 2,
  prerequisites = [
    [1, 0],
    [0, 1]
  ];

console.log(canFinish(numCourses, prerequisites));
