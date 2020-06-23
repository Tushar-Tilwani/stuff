/**
 * @param {number[][]} logs
 * @param {number} N
 * @return {number}
 */
var earliestAcq = function(logs, N) {
  const parent = new Array(N).fill(null).map((v, i) => i);
  const size = new Array(N).fill(1);
  let component = N;
  for (const [timestamp, node1, node2] of logs) {
    const root1 = find(parent, node1);
    const root2 = find(parent, node2);
    if (root1 !== root2) {
      if (size[root1] > size[root2]) {
        // Make root1 parent of root2
        parent[root2] = root1;
        size[root1] += size[root2];
      } else {
        // Make root2 parent of root1
        parent[root1] = root2;
        size[root2] += size[root1];
      }
      component -= 1;
    }

    if (component === 1) {
      return timestamp;
    }
  }
  return -1;
};

function find(parent, node) {
  if (parent[node] === node) {
    return node;
  }
  return find(parent, parent[node]);
}
