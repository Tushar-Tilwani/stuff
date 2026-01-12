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

function nextLargerNodes(head: ListNode | null): number[] {
  if (!head) {
    return [];
  }
  let node = head;
  const STACK: [number, number][] = [];
  const result: number[] = [];
  let index = 0;
  while (node) {
    const val = node.val;
    while (STACK.length > 0 && STACK[STACK.length - 1][0] < val) {
      const [, rIndex] = STACK.pop()!;
      result[rIndex] = val;
    }
    STACK.push([node.val, index]);
    node = node.next;
    index += 1;
  }
  while (STACK.length > 0) {
    const [, rIndex] = STACK.pop()!;
    result[rIndex] = 0;
  }
  return result;
}
