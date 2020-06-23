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

  const nodeMap = new Map();

  let node = head;
  // let newNode = new Node(head.val);
  let newPrev = null;
  let newHead = null;

  // First map normal clone link list without any random links
  while (node) {
    const newNode = new Node(node.val);
    nodeMap.set(node, newNode);

    if (newPrev === null) {
      newPrev.next = newNode;
    } else {
      newHead = newNode;
    }

    node = node.next;
    newPrev = newNode;
  }

  node = head;
  while (node) {
    const cloneNode = linkMap.get(node);
    cloneNode.random = linkMap.get(node.random) || null;
    // cloneNode.next = linkMap.get(node.next) || null;
    node = node.next;
  }

  return newHead;
};
