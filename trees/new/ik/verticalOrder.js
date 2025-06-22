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
function verticalOrder(root) {
  if (!root) {
    return [];
  }
  const resultMap = {};
  let minIndex = 0;
  let maxIndex = 0;
  const QUEUE = [[root, 0]];
  while (QUEUE.length !== 0) {
    const [node, level] = QUEUE.shift();

    node.left && QUEUE.push([node.left, level - 1]);
    node.right && QUEUE.push([node.right, level + 1]);

    if (!Array.isArray(resultMap[level])) {
      resultMap[level] = [];
      minIndex = Math.min(level, minIndex);
      maxIndex = Math.max(level, maxIndex);
    }

    resultMap[level].push(node.val);
  }

  const result = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    result.push(resultMap[i]);
  }
  return result;
}
