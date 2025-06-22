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
 */
var BSTIterator = function (root) {
  this.traverseArray = dfs(root, []);
  this.index = -1;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return !!this.traverseArray[this.index + 1];
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  this.index = this.index + 1;
  return this.traverseArray[this.index];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasPrev = function () {
  return !!this.traverseArray[this.index - 1];
};

/**
 * @return {number}
 */
BSTIterator.prototype.prev = function () {
  this.index = this.index - 1;
  return this.traverseArray[this.index];
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.hasNext()
 * var param_2 = obj.next()
 * var param_3 = obj.hasPrev()
 * var param_4 = obj.prev()
 */

function dfs(node, result) {
  if (!node) {
    return result;
  }
  dfs(node.left, result);
  result.push(node);
  dfs(node.right, result);
  return result;
}
