/**
 * @param {number[][]} edgeList
 * @return {boolean}
 */
function isBipartite(edgeList) {
  const n = edgeList.length;
  const colors = new Array(n).fill(null);
  for (let i = 0; i < n; i++) {
    if (!!colors[i]) {
      continue;
    }
    colors[i] = "r";
    if (!bfs(i, colors, edgeList)) {
      return false;
    }
  }
  return true;
}

function bfs(s, colors, edgeList) {
  const QUEUE = [s];

  while (QUEUE.length > 0) {
    const node = QUEUE.shift();
    const prospectiveNeighborColor = colors[node] === "r" ? "b" : "r";
    const neighbours = edgeList[node];
    for (const neighbour of neighbours) {
    //   console.log(colors, neighbour);
      if (!!colors[neighbour]) {
        // Already colored
        if (colors[neighbour] !== prospectiveNeighborColor) {
          // If any of the neighbors are same color it is fine fail
          return false;
        }
        // If neighbors are different color it is fine
        continue;
      }
      
      colors[neighbour] = prospectiveNeighborColor;
      QUEUE.push(neighbour);
    }
  }

  return true;
}

let graph = [
  [1, 2, 3],
  [0, 2],
  [0, 1, 3],
  [0, 2],
];

// graph = [
//   [1, 3],
//   [0, 2],
//   [1, 3],
//   [0, 2],
// ];

console.log(isBipartite(graph));
