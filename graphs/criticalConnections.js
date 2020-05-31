/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
  const edgeMap = connections.reduce((acc, [from, to]) => {
    if (acc.has(from)) {
      acc.get(from).push(to);
    } else {
      acc.set(from, [to]);
    }

    if (acc.has(to)) {
      acc.get(to).push(from);
    } else {
      acc.set(to, [from]);
    }
    return acc;
  }, new Map());

  const parent = new Array(n).fill(null).map(() => []);
  const visited = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      dfs(i, edgeMap, visited, parent);
    }
  }

  const result = [];
  for (let i = 0; i < n; i++) {
    if (parent[i].length === 1) {
      result.push([parent[i][0], i]);
    }
  }
  return [edgeMap,parent];
};

function dfs(start, edgeMap, visited, parent) {
  const neighbors = edgeMap.get(start) || [];
  // console.log(neighbors,visited);
  for (let neighbor of neighbors) {
    if (!visited[neighbor]) {
      visited[neighbor] = true;
      dfs(neighbor, edgeMap, visited, parent);
    }
    parent[start].push(neighbor);
  }
}

// console.log(
//   criticalConnections(4, [
//     [0, 1],
//     [1, 2],
//     [2, 0],
//     [1, 3]
//   ])
// );

let n = 6;
let connections = [[0,1],[1,2],[2,0],[1,3],[3,4],[4,5],[5,3]];


console.log(
    criticalConnections(n, connections)
  );
  
