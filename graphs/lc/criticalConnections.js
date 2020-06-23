// https://leetcode.com/problems/critical-connections-in-a-network/

/* We are going to identify bridge edges. Every nodes returns the minimum arrival time in it
DFS tree. If that minimum arrival time is lower than or equal to current node's arrival time
it means it is not a bridge node. Bride nodes are the nodes which if disconnected will make
extra components.
*/ 
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function(n, connections) {
  const edgeList = getEdgeList(n, connections);
  const visited = new Array(n).fill(false);
  const parent = new Array(n).fill(null);
  const arrival = new Array(n).fill(null);
  const departure = new Array(n).fill(null);
  const result = [];

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i, visited, parent, edgeList, arrival, departure, result);
    }
  }
  return result;
};

let time = 0;
function dfs(node, visited, parent, edgeList, arrival, departure, result) {
  visited[node] = true;
  arrival[node] = time++;
  let minArrivalTime = arrival[node];
  const neighbors = edgeList.get(node);
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      parent[neighbor] = node;
      let childTime = dfs(
        neighbor,
        visited,
        parent,
        edgeList,
        arrival,
        departure,
        result
      );
      //   console.log("pre", [node, neighbor], arrival[node], childTime);
      if (arrival[node] < childTime) {
        result.push([node, neighbor]);
      }

      minArrivalTime = Math.min(minArrivalTime, childTime);
    } else {
      if (parent[node] !== neighbor) {
        minArrivalTime = Math.min(minArrivalTime, arrival[neighbor]);
      }
    }

    // console.log("post", [node, neighbor], arrival[node]);
  }
  departure[node] = time++;
  return minArrivalTime;
}

/*
 * @param {number} n
 * @param {number[][]} connections
 * @return {Map}
 */
function getEdgeList(n, connections) {
  const edgeList = new Map();

  for (let i = 0; i < n; i++) {
    edgeList.set(i, []);
  }

  return connections.reduce((map, [node1, node2]) => {
    map.get(node1).push(node2);
    map.get(node2).push(node1);
    return map;
  }, edgeList);
}

let n = 4,
  connections = [
    [0, 1],
    [1, 2],
    [2, 0],
    [1, 3]
  ];

console.log(criticalConnections(n, connections));
