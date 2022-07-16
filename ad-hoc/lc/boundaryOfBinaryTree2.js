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
  const result = [];
  let node = root;
  while(node){

  }
  root.left && dfsLeft(root.left, result);
  root.left && root.right && dfsLeaves(root, result);
  root.right && dfsRight(root.right, result);
  return result;
};

function dfsLeft(node, result) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right) {
    return;
  }
  result.push(node.val);
  if (node.left) {
    dfsLeft(node.left, result);
  } else {
    dfsLeft(node.right, result);
  }
}

function dfsRight(node, result) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right) {
    return;
  }
 
  if (node.right) {
    dfsRight(node.right, result);
  } else {
    dfsRight(node.left, result);
  }
result.push(node.val);
}

function dfsLeaves(node, result) {
  if (!node.left && !node.rigt) {
    result.push(node.val);
    return;
  }
  node.left && dfsLeaves(node.left, result);
  node.right && dfsLeaves(node.right, result);
}
