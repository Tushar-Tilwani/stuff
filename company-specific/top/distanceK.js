/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  if (!root) {
    return [];
  }
  // convert tree to graph and do a bfs
  // each node has neighbors parent, left & right
  const edgeList = new Map();
  dfsBuildGraph(root, null, edgeList);
  return bfsOnGraph(target.val, edgeList, k);
};

function dfsBuildGraph(node, parent, edgeList) {
  const neighbors = [];
  parent && neighbors.push(parent.val);

  if (node.left) {
    neighbors.push(node.left.val);
    dfsBuildGraph(node.left, node, edgeList);
  }

  if (node.right) {
    neighbors.push(node.right.val);
    dfsBuildGraph(node.right, node, edgeList);
  }

  edgeList.set(node.val, neighbors);
}

function bfsOnGraph(source, edgeList, k) {
  const visited = new Set();
  const result = [];
  visited.add(source);
  const QUEUE = [[source, 0]];
  while (QUEUE.length > 0) {
    const [node, level] = QUEUE.shift();
    if (level === k) {
      result.push(node);
      continue;
    }
    for (const neighbor of edgeList.get(node)) {
      if (visited.has(neighbor)) {
        continue;
      }
      QUEUE.push([neighbor, level + 1]);
      visited.add(neighbor);
    }
  }

  return result;
}
