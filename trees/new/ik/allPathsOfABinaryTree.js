/*
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left_ptr = null;
            this.right_ptr = null;
        }
    }
*/

/*
 *  Complete the function below.
    Input: root of the input tree
    Output: A list of integer lists denoting the node values of the paths of the tree
 */

function allPathsOfABinaryTree(root) {
  if (!root) {
    return [];
  }
  const result = [];
  dfs(root, [], result);
  return result;
}

function dfs(node, slate, result) {
  if (!node.left_ptr && !node.right_ptr) {
    result.push([...slate, node.val].join());
    return;
  }
  slate.push(node.val);
  node.left_ptr && dfs(node.left_ptr, slate, result);
  node.right_ptr && dfs(node.right_ptr, slate, result);
  slate.pop();
}

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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  if (!root) {
    return [];
  }
  const result = [];
  dfs(root, [], result);
  return result;
};

function dfs(node, slate, result) {
  if (!node.left && !node.right) {
    result.push([...slate, node.val]);
    return;
  }
  slate.push(node.val);
  node.left && dfs(node.left, slate, result);
  node.right && dfs(node.right, slate, result);
  slate.pop();
}
