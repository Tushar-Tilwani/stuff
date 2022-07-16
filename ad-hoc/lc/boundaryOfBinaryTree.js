/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var boundaryOfBinaryTree = function (root) {
  if (!root) {
    return root;
  }
//   let node = root;

 
  const result = [root.val];
  const allowSet = new Set(getAllowedSet(root));
  // root.left && dfs(root.left, result, true);
  root.right && dfs(root.right, result, false);
  return result.filter((node) => allowSet.has(node));
};

function dfs(node, result, isPre) {
  if (!node.left && !node.rigt) {
    result.push(node.val);
    return;
  }
  isPre && result.push(node.val);

  node.left && dfs(node.left, result, isPre);
  node.right && dfs(node.right, result, isPre);

  !isPre && result.push(node.val);
}

function getAllowedSet(root) {
  if (!root) {
    return [];
  }
  const result = [];
  const QUEUE = [root];
  while (QUEUE.length > 0) {
    const len = QUEUE.length;
    for (let i = 0; i < len; i++) {
      const node = QUEUE.shift();
      node.left && QUEUE.push(node.left);
      node.right && QUEUE.push(node.right);
      if (i == 0 || i === len - 1 || (!node.right && !node.left)) {
        result.push(node.val);
      }
    }
  }
  return result;
}
