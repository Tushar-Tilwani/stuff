/**
 * This is the interface for the expression tree Node.
 * You should not remove it, and you can define some classes to implement it.
 */

var Node = function (val, left, right) {
  // if (this.constructor === Node) {
  //   throw new Error('Cannot instanciate abstract class');
  // }
  this.val = val;
  this.left = left;
  this.right = right;
};

Node.prototype.evaluate = function () {
  return 2;
  //   throw new Error("Cannot call abstract method");
};

/**
 * This is the TreeBuilder class.
 * You can treat it as the driver code that takes the postinfix input
 * and returns the expression tree represnting it as a Node.
 */

class TreeBuilder {
  /**
   * @param {string[]} s
   * @return {Node}
   */
  buildTree(postfix) {
    const arr = postfix.reverse();
    return new Node();
  }
}

function dfs(postfix, index) {
  if (index < 0) {
    return null;
  }
  const node = new Node(postfix[index]);
  let nextIndex = index - 1;

  if (isNumber(arr[nextIndex])) {
    node.right = arr[nextIndex + 1];
  } else {
    [node.right, nextIndex] = dfs(postfix, index + 1);
  }

  if (isNumber(arr[nextIndex])) {
    node.left = arr[nextIndex + 1];
  } else {
    [node.left, nextIndex] = dfs(postfix, index + 1);
  }

  node.left = isNumber(left) ? dfs(postfix, index - 2) : left;
  node.right = isNumber(right) ? dfs(postfix, index - 1) : right;

  return node;
}

function isNumber(val) {
  return isNaN(parseInt(val));
}

/**
 * Your TreeBuilder object will be instantiated and called as such:
 * var obj = new TreeBuilder();
 * var expTree = obj.buildTree(postfix);
 * var ans = expTree.evaluate();
 */
