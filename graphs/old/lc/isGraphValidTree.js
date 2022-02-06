// https://leetcode.com/problems/graph-valid-tree/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
  const edgeList = getEdgeList(n, edges);
  const visited = new Array(n).fill(false);
  const parent = new Array(n).fill(null);
  let components = 0;
  let isTree = false;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      isTree = dfs(i, edgeList, visited, parent);
      components += 1;
    }

    if (components > 1) {
      return false;
    }
  }
  return isTree;
};

function dfs(node, edgeList, visited, parent) {
  visited[node] = true;
  for (const neighbor of edgeList.get(node)) {
    if (!visited[neighbor]) {
      visited[neighbor] = true;
      parent[neighbor] = node;
      dfs(neighbor, edgeList, visited, parent);
    } else {
      if (parent[node] !== neighbor) {
        return false;
      }
    }
  }
  return true;
}

function getEdgeList(n, edges) {
  const map = new Map();

  for (let i = 0; i < n; i++) {
    map.set(i, []);
  }

  return edges.reduce((map, [node1, node2]) => {
    map.get(node1).push(node2);
    map.get(node2).push(node1);
    return map;
  }, map);
}

let n = 5,
  edges = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4]
  ];

// edges = [
//   [0, 1],
//   [1, 2],
//   [2, 3],
//   [1, 3]
// ];

(n = 2), (edges = [[1, 0]]);

console.log(validTree(n, edges));
