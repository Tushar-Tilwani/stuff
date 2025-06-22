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

  // First map normal clone link list without any random links
  while (node) {
    const newNode = new Node(node.val);
    nodeMap.set(node, newNode);
    node = node.next;
  }

  node = head;
  while (node) {
    const cloneNode = nodeMap.get(node);
    cloneNode.random = nodeMap.get(node.random) || null;
    cloneNode.next = nodeMap.get(node.next) || null;
    node = node.next;
  }

  return nodeMap.get(head);
};
