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
    return [];
  }
  const result = [root.val];
  root.left && leftBoundary(root.left, result);
  (root.left || root.right) && leaves(root, result);
  root.right && rightBoundary(root.right, result);
  return result;
};

function leftBoundary(node, result) {
  if (!node.right && !node.left) {
    return;
  }
  result.push(node.val);
  if (node.left) {
    leftBoundary(node.left, result);
  } else {
    leftBoundary(node.right, result);
  }
}

function leaves(node, result) {
  if (!node.left && !node.right) {
    result.push(node.val);
    return;
  }

  if (node.left) {
    leaves(node.left, result);
  }
  if (node.right) {
    leaves(node.right, result);
  }
}

function rightBoundary(node, result) {
  if (!node.right && !node.left) {
    return;
  }
  if (node.right) {
    rightBoundary(node.right, result);
  } else {
    rightBoundary(node.left, result);
  }
  result.push(node.val);
}
