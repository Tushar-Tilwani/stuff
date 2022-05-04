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
var flatten = function (head) {
  const STACK = helper(head);
  let prevNode = null;
  while (STACK.length > 0) {
    const node = STACK.pop();
    if (prevNode) prevNode.prev = node;
    node.next = prevNode;
    node.child = null;
    prevNode = node;
  }
  return head;
};

function helper(head, STACK = []) {
  let node = head;
  while (node) {
    STACK.push(node);
    if (node.child) helper(node.child, STACK);
    node = node.next;
  }
  return STACK;
}
