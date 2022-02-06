// BFS

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countComponents = function (n, edges) {
  const visited = new Array(n).fill(false);
  const edgeList = new Map();
  let components = 0;
  for (const [x, y] of edges) {
    const list1 = edgeList.get(x) ?? [];
    list1.push(y);
    edgeList.set(x, list1);

    const list2 = edgeList.get(y) ?? [];
    list2.push(x);
    edgeList.set(y, list2);
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) {
      continue;
    }
    visited[i] = true;
    bfs(i, visited, edgeList);
    components += 1;
  }

  return components;
};

function bfs(s, visited, edgeList) {
  const QUEUE = [s];
  while (QUEUE.length > 0) {
    const node = QUEUE.shift();
    const neighbours = edgeList.get(node) ?? [];
    for (const neighbour of neighbours) {
      if (visited[neighbour]) {
        continue;
      }
      visited[neighbour] = true;
      QUEUE.push(neighbour);
    }
  }
}

let n = 5,
  edges = [
    [0, 1],

    [2, 3],
    [3, 4],
  ];

console.log(countComponents(n, edges));
