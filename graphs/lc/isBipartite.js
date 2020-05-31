// https://leetcode.com/problems/is-graph-bipartite/
/**
 * Check for odd length cycle if there is a odd length cycle that
 * means the graph cannot be bipartite. To check for odd cycle we need
 * to check for cross edges at the same level.
 */
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
  const n = graph.length;
  const distance = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    if (distance[i] === null) {
      if (!bfs(i, graph, distance)) {
        return false;
      }
    }
  }
  return true;
};

function bfs(startNode, edgeList, distance) {
  const QUEUE = [{ node: startNode, level: 0 }];
  distance[startNode] = 0;
  while (QUEUE.length > 0) {
    const { node, level } = QUEUE.shift();
    const childLevel = level + 1;
    const neighbhors = edgeList[node];

    for (const neighbhor of neighbhors) {
      if (distance[neighbhor] === null) {
        QUEUE.push({ node: neighbhor, level: childLevel });
        distance[neighbhor] = childLevel;
      } else {
        if (distance[neighbhor] === level) {
          // Check for cross edges on same level
          return false;
        }
      }
    }
  }
  return true;
}

let graph = [
  [1, 3],
  [0, 2],
  [1, 3],
  [0, 2]
];

// graph = [
//   [1, 2, 3],
//   [0, 2],
//   [0, 1, 3],
//   [0, 2]
// ];

graph = [
  [1, 5, 8],
  [0, 2, 4],
  [1, 4, 6, 9],
  [4],
  [1, 2, 3, 8],
  [0],
  [2, 7],
  [6],
  [0, 4],
  [2]
];

// graph = [[4], [], [4], [4], [0, 2, 3]];

console.log(isBipartite(graph));
