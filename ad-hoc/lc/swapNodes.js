/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  let node = head;
  let counter = 0;
  while (node !== null) {
    counter += 1;
    node = node.next;
  }

  const len = counter;
  const leftCheck = k;
  const rightCheck = len - k;

  let leftNode = null;
  let rightNode = null;
  node = head;
  counter = 0;
  while (node !== null) {
    if (counter === leftCheck) {
      leftNode = node;
    }
    if (counter === rightCheck) {
      rightNode = node;
    }
    counter += 1;
    node = node.next;
  }

  if (leftNode && rightNode) {
    const temp = leftNode.val;
    leftNode.val = rightNode.val;
    rightNode.val = temp;
  }

  return head;
};
