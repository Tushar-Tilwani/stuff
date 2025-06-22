/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
  const STACK = [];
  let node = head;

  while (node !== null) {
    if (node.child && node.next) {
      STACK.push(node.next);
    }
    if (node.child) {
      node.next = node.child;
      node.child.prev = node;
      node.child = null;
      node = node.next;

      continue;
    }
    if (node.next === null && STACK.length > 0) {
      const stackNode = STACK.pop();
      node.next = stackNode;
      stackNode.prev = node;
      node = node.next;
      continue;
    }
    node = node.next;
  }
  return head;
};
