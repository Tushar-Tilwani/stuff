/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeElements(head: ListNode | null, val: number): ListNode | null {
  const prevHead = new ListNode(-1, head);
  let prev = prevHead;
  let node = head;

  while (node !== null) {
    if (node.val === val) {
      prev.next = node.next;
      node = node.next;
      continue;
    }
    prev = node;
    node = node.next;
  }
  return prevHead.next;
}
