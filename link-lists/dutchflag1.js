/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function dutchNationalFlag(head, x) {
  let left = { next: head };
  let middle = { next: head };
  let right = head;

  while (right !== null) {
    if (right.val < x) {
      middle = middle.next;
      swap(middle, right);

      left = left.next;
      swap(left, middle);
    } else if (right.val === x) {
      middle = middle.next;
      swap(middle, right);
    }
    right = right.next;
  }
  return head;
}

function swap(node1, node2) {
  const temp = node1.val;
  node1.val = node2.val;
  node2.val = temp;
}

/********/
const arr = [3, 1, 6, 1, 1, 1, 1, 6, 3, 6];

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function getLinkList(arr) {
  const head = new ListNode(arr[0]);
  let node = head;
  for (let i = 1; i < arr.length; i++) {
    node.next = new ListNode(arr[i]);
    node = node.next;
  }
  return head;
}

function getArray(head) {
  const arr = [];
  let node = head;
  while (node) {
    arr.push(node.val);
    node = node.next;
  }
  return arr;
}

const head = getLinkList(arr);
const newHead = dutchNationalFlag(head, 3);

console.log(getArray(newHead));
