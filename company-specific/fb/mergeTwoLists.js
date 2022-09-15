/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const mockHead = new ListNode(null, null);

  let temp1 = list1;
  let temp2 = list2;
  let node = mockHead;

  while (temp1 && temp2) {
    if (temp1.val <= temp2.val) {
      node.next = temp1;
      temp1 = temp1.next;
    } else {
      node.next = temp2;
      temp2 = temp2.next;
    }
    node = node.next;
  }

  while (temp1) {
    node.next = temp1;
    temp1 = temp1.next;
    node = node.next;
  }

  while (temp2) {
    node.next = temp2;
    temp2 = temp2.next;
    node = node.next;
  }

  return mockHead.next;
};
