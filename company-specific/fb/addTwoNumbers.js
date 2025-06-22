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
  const dummyHead = new ListNode(null);
  let node1 = l1;
  let node2 = l2;
  let node3 = dummyHead;
  let remainder = 0;

  while (node1 && node2) {
    const val = node1.val + node2.val + remainder;
    remainder = Math.floor(val / 10);
    node3.next = new ListNode(val % 10);

    node1 = node1.next;
    node2 = node2.next;
    node3 = node3.next;
  }
  while (node1) {
    const val = node1.val + remainder;
    remainder = Math.floor(val / 10);
    node3.next = new ListNode(val % 10);
    node1 = node1.next;
    node3 = node3.next;
  }

  while (node2) {
    const val = node2.val + remainder;
    remainder = Math.floor(val / 10);
    node3.next = new ListNode(val % 10);
    node2 = node2.next;
    node3 = node3.next;
  }

  if (remainder === 1) {
    node3.next = new ListNode(1);
    node3 = node3.next;
  }

  return dummyHead.next;
};
