/**
 * This is the interface for the expression tree Node.
 * You should not remove it, and you can define some classes to implement it.
 */

var Node = function (postfix) {
  this.postfix = postfix;
};

Node.prototype.evaluate = function () {
  const postfix = this.postfix;
  const STACK = [];
  for (const val of postfix) {
    if (isNumber(val)) {
      STACK.push(val);
      continue;
    }
    const op1 = STACK.pop();
    const op2 = STACK.pop();
    switch (val) {
      case "*":
        STACK.push(op1 * op2);
      case "/":
        STACK.push(op2 / op1);
      case "-":
        STACK.push(op2 - op1);
      default:
        STACK.push(op2 + op1);
    }
  }

  return STACK[0];
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
    return new Node(postfix);
  }
}

/**
 * Your TreeBuilder object will be instantiated and called as such:
 * var obj = new TreeBuilder();
 * var expTree = obj.buildTree(postfix);
 * var ans = expTree.evaluate();
 */
function isNumber(val) {
  return !isNaN(parseInt(val));
}
