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
  if (!head) {
    return head;
  }
  helper(head);
  return head;
};

function helper(head) {
  let node = head;
  while (node.next || node.child) {
    let next = node.next;
    if (!node.child) {
      node = next;
      continue;
    }
    let child = node.child;
    let tail = helper(child);
    if (next) next.prev = tail;
    if (tail) tail.next = next;
    node.next = child;
    child.prev = node;
    node.child = null;
    node = next;
  }
  return node;
}
