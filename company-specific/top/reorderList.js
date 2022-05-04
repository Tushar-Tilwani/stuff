/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  const values = [];
  let node = head;
  while (node !== null) {
    values.push(node.val);
    node = node.next;
  }
  const newValues = [];
  let left = 0;
  let right = values.length - 1;
  while (newValues.length < values.length) {
    if (newValues.length % 2 === 0) {
      newValues.push(values[left]);
      left++;
    } else {
      newValues.push(values[right]);
      right--;
    }
  }

  node = head;
  let i = 0;
  while (node !== null) {
    node.val = newValues[i++];
    node = node.next;
  }
};
