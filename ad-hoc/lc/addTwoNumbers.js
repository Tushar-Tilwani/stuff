/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummyHead = new ListNode();

  let node1 = l1;
  let node2 = l2;
  let resultNode = dummyHead;

  let remainder = 0;
  while (node1 !== null && node2 !== null) {
    const val = node1.val + node2.val;
    remainder = Math.floor(val / 10);
    resultNode.next = new ListNode(val % 10);

    node1 = node1.next;
    node2 = node2.next;
    resultNode = resultNode.next;
  }

  while (node1 !== null) {
    const val = node1.val + remainder;
    remainder = Math.floor(val / 10);
    resultNode.next = new ListNode(val % 10);

    node1 = node1.next;
    resultNode = resultNode.next;
  }

  while (node2 !== null) {
    const val = node2.val + remainder;
    remainder = Math.floor(val / 10);
    resultNode.next = new ListNode(val % 10);

    node2 = node2.next;
    resultNode = resultNode.next;
  }

  if (remainder > 0) {
    resultNode.next = new ListNode(remainder);
  }

  return dummyHead.next;
};
