/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let dummyHead = new ListNode(null, head);
  let prev = dummyHead;
  let node = head;
  let next = head.next;

  while (next) {
    if (node.val !== next.val) {
      prev = node;
      node = next;
      next = next.next;
      continue;
    }
    while (node.val === next.val) {
      next = next.next;
    }
    prev.next = next;
    node = next;
    next = next.next;
  }

  return dummyHead.next;
};
