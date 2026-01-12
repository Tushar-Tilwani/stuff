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

function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) {
    return head;
  }

  let node = head;
  while (node.next) {
    node = node.next;
  }
  let last = node;
  node = head;
  while (node) {
    const even = node.next;
    node.next = node.next?.next;
    last.next = even;
    even.next = null;
    last = even;
  }

  return head;
}
