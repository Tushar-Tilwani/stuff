// https://leetcode.com/problems/copy-list-with-random-pointer/
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if (head === null) {
    return null;
  }

  let node = head;
  // let newNode = new Node(head.val);
  let isHead = true;
  let newHead = null;

  // First map normal clone link list without any random links
  while (node) {
    const newNode = new Node(node.val);

    if (isHead) {
      newHead = newNode;
      isHead = false;
    }

    let next = node.next;
    node.next = newNode;
    newNode.next = next;
    node = next;
  }

  node = head;
  while (node) {
    const cloneNode = node.next;
    cloneNode.random = node.random.next;
    cloneNode.next = cloneNode.next.next;
    node = node.next.next;
  }

  return newHead;
};
