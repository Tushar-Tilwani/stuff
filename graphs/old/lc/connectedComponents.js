// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function(n, edges) {
  const edgeList = getEdgeList(n, edges);
  const visited = new Array(n).fill(false);
  let components = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      //   bfs(i, edgeList, visited);
      dfs(i, edgeList, visited);
      components++;
    }
  }
  return components;
};

function bfs(node, edgeList, visited) {
  const QUEUE = [node];
  visited[node] = true;

  while (QUEUE.length) {
    const currentNode = QUEUE.shift();
    for (const neighbor of edgeList.get(currentNode)) {
      if (!visited[neighbor]) {
        QUEUE.push(neighbor);
        visited[neighbor] = true;
      }
    }
  }
}

function dfs(node, edgeList, visited) {
  visited[node] = true;
  for (const neighbor of edgeList.get(node)) {
    if (!visited[neighbor]) {
      dfs(neighbor, edgeList, visited);
    }
  }
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

const n = 5,
  edges = [
    [0, 1],
    [1, 2],
    [3, 4]
  ];

console.log(countComponents(n, edges));
