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
var reverseKGroup = function(head, k) {
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  const groups = Math.floor(length / k);

  console.log(groups);

  let prev = null; //new ListNode(null, head);
  let current = head;
  // let next = current.next;

  let oldHead = current;

  let currentGroup = 0;
  let counter = 0;

  let result = null;

  while (current) {
    if (counter === k) {
      if (currentGroup === 0) {
        result = prev;
      }
      oldHead.next = current;
      prev = oldHead;
      counter = 0;
      currentGroup++;
      continue;
    }

    if (currentGroup === groups) {
      break;
    }

    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    counter++;
  }

  return result;
};
