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
 * @return {number[][]}
 */
var verticalOrder = function (root) {
  if (!root) {
    return [];
  }
  const QUEUE = [[root, 0]];
  const result = new Map();
  while (QUEUE.length > 0) {
    const [node, level] = QUEUE.shift();
    if (!result.has(level)) {
      result.set(level, []);
    }
    result.get(level).push(node.val);

    node.left && QUEUE.push([node.left, level - 1]);
    node.right && QUEUE.push([node.right, level + 1]);
  }
  const keys = Array.from(result.keys()).sort((a, b) => a - b);
  const finalResult = [];
  for (const key of keys) {
    finalResult.push(result.get(key));
  }
  return finalResult;
};
