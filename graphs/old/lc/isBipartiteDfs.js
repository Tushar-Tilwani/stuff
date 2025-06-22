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
  const visited = new Array(n).fill(false);
  const colors = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      if (!dfs(i, "red", colors, visited, graph)) {
        return false;
      }
    }
  }

  return true;
};

function getColor(color) {
  return color === "red" ? "blue" : "red";
}
function dfs(node, currentColor, colors, visited, graph) {
  // console.log(node, currentColor, getColor(currentColor));
  colors[node] = currentColor;
  visited[node] = true;
  const neighbors = graph[node];
  for (const neighbhor of neighbors) {
    if (!visited[neighbhor]) {
      const isBipartiteVal = dfs(
        neighbhor,
        getColor(currentColor),
        colors,
        visited,
        graph
      );

      if (!isBipartiteVal) {
        return false;
      }
    } else {
      if (colors[neighbhor] === currentColor) {
        // Back edge has the same color.
        return false;
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

// graph = [
//   [1, 5, 8],
//   [0, 2, 4],
//   [1, 4, 6, 9],
//   [4],
//   [1, 2, 3, 8],
//   [0],
//   [2, 7],
//   [6],
//   [0, 4],
//   [2]
// ];

graph = [[4], [], [4], [4], [0, 2, 3]];

console.log(isBipartite(graph));
