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
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
  if (!root) {
    return 0;
  }
  const result = [0];
  dfs(root, sum, result);
  return result[0];
};

function dfs(node, target, result) {
  if (node.val === target) {
    result[0] += 1;
  }
  if (!node.left && !node.right) {
    return [node.val];
  }

  const pathSums = [node.val];

  if (node.left) {
    const leftPathSums = dfs(node.left, target, result);
    for (const leftPathSum of leftPathSums) {
      const newSum = leftPathSum + node.val;
      if (newSum === target) {
        result[0] += 1;
      }
      pathSums.push(newSum);
    }
  }

  if (node.right) {
    const rightPathSums = dfs(node.right, target, result);
    for (const rightPathSum of rightPathSums) {
      const newSum = rightPathSum + node.val;
      if (newSum === target) {
        result[0] += 1;
      }
      pathSums.push(newSum);
    }
  }

  return pathSums;
}
