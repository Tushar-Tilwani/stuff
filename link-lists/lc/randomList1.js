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

  const unseenMap = new Map();
  const seenMap = new Map();

  let node = head;
  // let newNode = new Node(head.val);
  let newPrev = null;
  let newHead = null;

  while (node) {
    const newNode = new Node(node.val);
    const random = node.random;
    seenMap.set(node, newNode);

    if (newPrev !== null) {
      newPrev.next = newNode;
    } else {
      newHead = newNode;
    }

    if (random) {
      if (seenMap.has(random)) {
        newNode.random = seenMap.get(random);
      } else {
        // Register node for future random pointers
        if (!unseenMap.has(random)) {
          unseenMap.set(random, []);
        }
        unseenMap.get(random).push(newNode);
      }
    }
    if (unseenMap.has(node)) {
      // If newNode is in unseen map
      const nodesToRegister = unseenMap.get(node);
      for (const rNode of nodesToRegister) {
        rNode.random = newNode;
      }
      unseenMap.delete(node);
    }
    newPrev = newNode;
    node = node.next;
  }
  return newHead;
};
