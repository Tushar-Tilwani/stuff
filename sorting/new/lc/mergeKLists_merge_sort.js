/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKLists(lists, start = 0, end = lists.length - 1) {
  if (end < start) {
    return null;
  }
  if (end === start) {
    return lists[start];
  }

  const mid = start + Math.floor((end - start) / 2);

  const list1 = mergeKLists(lists, start, mid);
  const list2 = mergeKLists(lists, mid + 1, end);

  return mergeTwoList(list1, list2);
}

function mergeTwoList(list1, list2) {
  const result = new ListNode();
  let current = result;
  let head1 = list1;
  let head2 = list2;

  while (!!head1 && !!head2) {
    if (head1.val <= head2.val) {
      current.next = head1;
      head1 = head1.next;
    } else {
      current.next = head2;
      head2 = head2.next;
    }
    current = current.next;
  }

  while (!!head1) {
    current.next = head1;
    head1 = head1.next;
    current = current.next;
  }

  while (!!head2) {
    current.next = head2;
    head2 = head2.next;
    current = current.next;
  }

  return result.next;
}
